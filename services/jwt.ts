import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from "dotenv";
dotenv.config();

export type Auth = {
    login: string;
    words: number
    iat: number;
    exp: number
}

export interface AuthenticatedRequest extends Request {
    info?: Auth;
  }

export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    if (process.env.KEY !== undefined) {
        jwt.verify(token, process.env.KEY, (err: Error | null, user: any) => {
            if (err) return res.status(403).json({ message: 'Forbidden' });
            req.info = user as Auth;
            console.log(req.info)
            next();
        });
    }
}

