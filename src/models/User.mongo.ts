import mongoose, { Schema, Document } from 'mongoose';

export interface IUserDoc extends Document {
  name: string;
  email: string;
  password: string;
  created: Date;
}

const UserSchema = new Schema<IUserDoc>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created: { type: Date, default: Date.now }
});

export default mongoose.model<IUserDoc>('User', UserSchema);