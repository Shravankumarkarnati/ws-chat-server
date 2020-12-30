import { io } from "../app";

export const initMiddlewares = () => {
  io.use((socket: any, next: any) => {
    console.log("once middleware", socket.id);
    next();
  });
};
