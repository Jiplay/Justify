import { loginRepository } from "../queries/login.repository";
import bcrypt from 'bcrypt';
import { LoginInfos } from "../models/login.model";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

function isPswStrong(password: string): boolean {
    // Vérifier la longueur du mot de passe
    if (password.length < 8) {
        return false;
    }

    // Vérifier s'il y a au moins une majuscule
    const hasUppercase = /[A-Z]/.test(password);
    if (!hasUppercase) {
        return false;
    }

    // Vérifier s'il y a au moins un chiffre
    const hasDigit = /\d/.test(password);
    if (!hasDigit) {
        return false;
    }

    return true;
}


export async function accountCreationCheck(user: LoginInfos): Promise<boolean> {
    if (isPswStrong(user.password) === true) {
        const resp = await loginRepository.findUser(user.login) 
        if (resp !== true) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return await loginRepository.saveUser({ login: user.login, password: hashedPassword, words: user.words });
        }
    }
    return false;
}

export async function loginCheck(user: LoginInfos) {
    const truthUser = await loginRepository.getUser(user.login) 
    if (truthUser !== undefined && (await bcrypt.compare(user.password, truthUser.password)) && process.env.KEY) {
        const token = jwt.sign({ login: user.login, words: truthUser.words }, process.env.KEY, { expiresIn: '24h' });
        return token
    }
    return "KO"
}