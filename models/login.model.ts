import mongoose from "mongoose";

export type LoginInfos = {
    login: string;
    password: string;
    words: number;
}

export const loginSchema = new mongoose.Schema(
    {
        login: { type: String, required: true },
        password: { type: String, required: true },
        words: { type: Number, required: true},
    },
);

if (mongoose.models.users_words === undefined) {
    mongoose.model("users_words", loginSchema);
}

export const UsersModel = mongoose.models.users_words!;