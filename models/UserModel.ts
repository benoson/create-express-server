import { Schema, model } from "mongoose";

export interface IUser {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IUserRegistration extends IUser {
  confirmPassword: string;
}

export interface IUserSignIn {
  email: IUser["email"];
  password: IUser["password"];
}

export interface IUserResponse {
  email: IUser["email"];
  firstName: string;
  lastName: string;
}

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, index: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const User = model<IUser>("User", userSchema);
export default User;
