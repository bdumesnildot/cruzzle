import { createServer } from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";
import app from "./src/app";
import database from "./src/config/database";
import {
  listenerNotificationByInterval,
  stoplistenerNotificationByInterval,
} from "./src/handlers/notifications.handler.ts";
import UserIdDict from "./src/interfaces/users";

dotenv.config();
const port: number = parseInt(process.env.SOCKET_PORT ?? "6002", 10);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

let isNotificationIntervalRunning = false;
const usersIdDict: UserIdDict = {};

io.on("connection", (socket) => {
  console.info("A user connected", socket.id);
  if (!isNotificationIntervalRunning) {
    listenerNotificationByInterval((tuple) => {
      const [boolValue, notification] = tuple;
      if (boolValue) {
        const { idea_author_id: ideaAuthorId } = notification;
        io.to(usersIdDict[ideaAuthorId]).emit("new-notification", notification);
      }
    });
    isNotificationIntervalRunning = true;
  }

  socket.on("disconnect", () => {
    console.info("A user disconnected", socket.id);
    for (const userId in usersIdDict) {
      if (usersIdDict[userId] === socket.id) {
        delete usersIdDict[userId];
      }
    }
    if (io.sockets.sockets.size === 0) {
      stoplistenerNotificationByInterval();
      isNotificationIntervalRunning = false;
    }
  });

  socket.on("addUserId", (value) => {
    usersIdDict[parseInt(value, 10)] = socket.id;
  });

  socket.on("deleteUserId", (value) => {
    delete usersIdDict[parseInt(value, 10)];
  });
});

httpServer.listen(port, () => {
  console.info(
    `⚡️[socket]: Socket server is running at http://localhost:${port}`
  );
});

database
  .getConnection()
  .then(() => {
    console.info(`⚡️[database]: Socket server can reach database`);
  })
  .catch((err: Error) => {
    console.error(err);
  });
