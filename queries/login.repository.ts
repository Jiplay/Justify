import { LoginInfos, UsersModel } from "../models/login.model";

export const loginRepository = {
    async saveUser(user: LoginInfos): Promise<boolean> {
        try {
            const newUser = new UsersModel(user) 
            await newUser.save();
            return true
        } catch (error) {
            console.error("Something went wrong", error);
            return false;
        }
    },

    async findUser(username: string ): Promise<boolean> {
        try {
            const user = await UsersModel.findOne({ login: username })
            return !!user
        } catch (error) {
            console.error("Something went wrong", error);
            return false;
        }
    },

    async updateUserLogin(username: string, words: number): Promise<boolean> {
        try {
            const updatedUser = await UsersModel.findOneAndUpdate(
                { login: username },
                { $inc: { words: -words } },
                { new: true }
            );
            if (updatedUser) {
                return true;
            } else {
                console.error("User not found");
                return false;
            }
        } catch (error) {
            console.error("Something went wrong", error);
            return false;
        }
    },

    async getUser(username: string): Promise<LoginInfos> {
        const user = await UsersModel.findOne({ login: username })
        return user as LoginInfos
    },
}
