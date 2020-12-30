import activeSocketsModel from "../model/activeSockets.schema";

export const socketOnLogin = async (socket: any) => {
  const { id: socket_id } = socket;
  socket.on("login", async (message: any) => {
    const { id } = message;
    const activeSocket = await activeSocketsModel.findOne({ user_id: id });
    if (!activeSocket) {
      const newActiveSocket = new activeSocketsModel({
        user_id: id,
        socket_id,
      });
      newActiveSocket.save();
    } else {
      activeSocket.socket_id = socket_id;
      await activeSocket.save();
    }
  });
};
