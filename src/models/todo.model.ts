import mongoose, { Number } from "mongoose";
import { UserDocument } from "./user.model";

export interface ToDoDocument extends mongoose.Document {
    user: UserDocument["_id"],
    status: string, 
    todo: string,
}

const todoSchema = new mongoose.Schema(
    {
        todo: { type: String, require: true },
        status: { type: String, require: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    {
        timestamps: true,
    }
);

const ToDoModel = mongoose.model<ToDoDocument>("todo", todoSchema)

export default ToDoModel;