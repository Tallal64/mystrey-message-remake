import { Model, model, models, Schema } from "mongoose";

export type TMessage = {
  message: string;
  createdAt: Date;
};

export type TUser = {
  username: string;
  email: string;
  password: string;
  isAcceptingMessage: boolean;
  isVerified: boolean;
  verifyCode: string;
  verifyCodeExpiry: Date;
  messages: TMessage[];
};

const MessageSchema = new Schema<TMessage>({
  message: {
    type: String,
    required: [true, "message is required"],
  },
  createdAt: {
    type: Date,
    required: [true, "createdAt is required"],
    default: Date.now,
  },
});

const UserSchema = new Schema<TUser>({
  username: {
    type: String,
    required: [true, "username is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  isAcceptingMessage: {
    type: Boolean,
    required: [true, "isAccepting message is required"],
    default: true,
  },
  isVerified: {
    type: Boolean,
    required: [true, "isVerified is required"],
    default: false,
  },
  verifyCode: {
    type: String,
    required: [true, "verifyCode is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "verifyCode is required"],
  },
  messages: [MessageSchema],
});

const UserModel = (models.User as Model<TUser>) || model<TUser>("User", UserSchema);

export default UserModel;
