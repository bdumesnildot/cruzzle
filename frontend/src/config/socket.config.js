import { io } from "socket.io-client";

const socketURL = import.meta.env.VITE_SOCKET_URL;

const socket = io(socketURL, {
  autoConnect: false,
  transports: ["websocket", "polling", "flashsocket"],
});

export default socket;
