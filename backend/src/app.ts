import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import * as fs from "fs";
import * as path from "path";

import routes from "./routes/index";

// create express app
const app: Application = express();

// use some application-level middlewares
const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
    "Authorization",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: process.env.FRONTEND_URL,
  preflightContinue: false,
};
app.use(cors(options));
app.use(helmet());
app.use(express.json());

// import and mount the API routes
app.use("/", routes);

// serve the `backend/public` folder for public resources
app.use(express.static(path.join(__dirname, "../public")));

// serve REACT APP
const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html"
);

if (fs.existsSync(reactIndexFile)) {
  // serve REACT resources
  app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));
  // redirect all requests to the REACT index file
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(reactIndexFile);
  });
}

export default app;
