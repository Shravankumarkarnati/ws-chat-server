import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface ICRSchema extends Document {
  sender: ObjectId;
  receiver: ObjectId;
  chatId: ObjectId;
}

const crSchema: Schema = new Schema<ICRSchema>({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  chatId: { type: String, required: true },
});

const CRModel = mongoose.model<ICRSchema>("crU2U", crSchema);

export default CRModel;
