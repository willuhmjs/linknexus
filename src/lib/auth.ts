import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { JWTKEY as secretKey} from '$env/static/private';


const database = {
    users: [
        { username: 'admin', password: bcrypt.hashSync('admin', bcrypt.genSaltSync(10)) },
        { username: 'user', password: bcrypt.hashSync('user', bcrypt.genSaltSync(10))}
    ]
}

export const login = (username: string, password: string): { success: boolean, token?: string } => {
    const userInDB = database.users.find(user => user.username === username);
    if (!userInDB) return { success: false };   
    return bcrypt.compareSync(password, userInDB.password) ? { success: true, token: jwt.sign({ username }, secretKey) } : { success: false };
}

export const getUser = (token: string): { success: boolean, user?: string } => {
    try {
        const { username } = jwt.verify(token, secretKey);
        return { user: username, success: true };
    } catch (e) {
        return { success: false };
    }
}