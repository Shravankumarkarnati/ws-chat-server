import { timeStamp } from "console";
import Mongoose, { Document, Schema } from "mongoose";

export interface IChat {
  message: string;
  time: string;
  sender: Boolean;
}

export interface IChatSchema extends Document {
  messages: IChat[];
}

const chatSchema = new Schema<IChat>({
  message: String,
  time: timeStamp,
  sender: String,
});

const chatCollectionSchema = new Schema<IChatSchema>({
  messages: [chatSchema],
});

const ChatsModel = Mongoose.model<IChatSchema>("Chats", chatCollectionSchema);

export default ChatsModel;
