import { Server } from "http";

export const SocketInit = (server: Server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  console.log("Socket IO Service Initiated");
  return io;
};
