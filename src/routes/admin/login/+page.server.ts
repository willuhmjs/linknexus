import { redirect } from '@sveltejs/kit';
import type { Actions } from '../../$types';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

const database = {
    users: [
        { username: 'admin', password: bcrypt.hashSync('admin', bcrypt.genSaltSync(10)) },
        { username: 'user', password: bcrypt.hashSync('user', bcrypt.genSaltSync(10))}
    ]
}

const secretKey = "42a776ef57fb74c8fae307413a68503c5df93a5b3a66278689c8afbf158b1fb0f0a893b82c7ff5da195511c693cb1ff53d975044c3e5631c7077cc888d6bd759";
export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();
        const username = data.get('username');
        const password = data.get('password');
        if (!username || !password) {
            return { success: false };
        }
        const userInDB = database.users.find(user => user.username === username);
        if (!userInDB) {
            return { success: false };
        }
        
        const correctPassword = bcrypt.compareSync(password, userInDB.password);
        
        if (correctPassword) {
            const token = jwt.sign({ username }, secretKey);
            cookies.set('session', token, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7 // 1 week
            });
            // redirect to admin page
            throw redirect(303, '/admin');
        }


    }
} satisfies Actions;