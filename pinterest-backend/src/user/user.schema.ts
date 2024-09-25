import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
  username: String,
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export interface User extends Document {
  username: string;
  following: string[];
  followers: string[];
}
