import mongoose from "mongoose";

export type LoginInfos = {
    login: string;
    password: string;
}

export const loginSchema = new mongoose.Schema(
    {
        login: { type: String, required: true },
        password: { type: String, required: true },
    },
);

if (mongoose.models.users === undefined) {
    mongoose.model("users", loginSchema);
}

export const UsersModel = mongoose.models.users!;