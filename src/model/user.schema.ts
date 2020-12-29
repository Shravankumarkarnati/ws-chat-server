import mongoose, { Document, Schema } from "mongoose";

export interface IUserDetails extends Document {
  username: string;
  password: string;
}

const userSchema: Schema = new Schema<IUserDetails>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const userModel = mongoose.model<IUserDetails>("User", userSchema);

export default userModel;
