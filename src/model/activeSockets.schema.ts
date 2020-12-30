import Mongoose, { Document, Schema } from "mongoose";

export interface IActiveSocket extends Document {
  user_id: string | null;
  socket_id: string;
}

const activeSocketSchema = new Schema<IActiveSocket>({
  user_id: { type: String, unique: true },
  socket_id: { type: String, unique: true },
});

const activeSocketsModel = Mongoose.model<IActiveSocket>(
  "ActiveSockets",
  activeSocketSchema
);

export default activeSocketsModel;
