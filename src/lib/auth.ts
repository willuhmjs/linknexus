import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { JWT_KEY } from '$env/static/private';
import { User, type IUser } from '$lib/mongo';

export const login = async (username: string, password: string): Promise<{ success: boolean, token?: string }> => {
    const userInDB = await User.findOne({ username })
    if (!userInDB || false) return { success: false };   
    return bcrypt.compareSync(password, userInDB.password) ? { success: true, token: jwt.sign({ username }, JWT_KEY) } : { success: false };
}

export const getUserFromJWT = async (token: string): Promise<{ success: boolean; user?: IUser; }> => {
    try {
        const { username } = jwt.verify(token, JWT_KEY);
        const user = await getUserFromUsername(username);
        return { user, success: true };
    } catch {
        return { success: false };
    }
}

export const getUserFromUsername = async (username: string): Promise<{ success: boolean; user?: IUser; }> => {
    const user = await User.findOne({ username });
    if (!user) return { success: false };
    return { user, success: true };
}

export const register = async (email: string, username: string, password: string): Promise<{ success: boolean; token?: string; }> => {
    try {
        await User.create({ email, username, password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)) });
        return { success: true, token: jwt.sign({ username }, JWT_KEY) };
    } catch (e) {
        console.error(e);
        return { success: false };
    }
}