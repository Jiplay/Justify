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
            return !!user  // Si un utilisateur est trouvé, renvoie true, sinon false
        } catch (error) {
            console.error("Something went wrong", error);
            return false;
        }
    },

    async getUser(username: string ): Promise<LoginInfos> {
        const user = await UsersModel.findOne({ login: username })
        return user as LoginInfos
    },
}
