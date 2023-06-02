import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { JWT_KEY } from '$env/static/private';
import { User } from '$lib/mongo';

const database = {
    users: [
        { username: 'admin', password: bcrypt.hashSync('admin', bcrypt.genSaltSync(10)) },
    ]
}

export const login = (username: string, password: string): { success: boolean, token?: string } => {
    const userInDB = database.users.find(user => user.username === username);
    if (!userInDB) return { success: false };   
    return bcrypt.compareSync(password, userInDB.password) ? { success: true, token: jwt.sign({ username }, JWT_KEY) } : { success: false };
}

export const getUserFromJWT = async (token: string): { success: boolean, user?: string } => {
    try {
        const { username } = jwt.verify(token, JWT_KEY);
        const user = await User.findOne({ username });
        if (!user) return { success: false };
        return { user, success: true };
    } catch (e) {
        return { success: false };
    }
}