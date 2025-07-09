import { Model, Schema, model } from "mongoose";
import mongoose from "mongoose";
import { IUser } from "../types/user";


const UserSchema = new Schema<IUser>({
    name:{type:String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['user', 'moderator', 'admin'], default: "user"},
    skills: [String],
    createdAt: {type: Date, default: Date.now}
})

const User: Model<IUser> = model("User", UserSchema);

export default User;