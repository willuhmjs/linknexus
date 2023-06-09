import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_KEY } from '$config';
import { User, type IUser } from '$lib/mongo';
import type { ProjectionType } from 'mongoose';
 
type Projection = ProjectionType<IUser>;

export const login = async (
	username: string,
	password: string
): Promise<{ success: boolean; token?: string }> => {
	const userInDB = await getUserFromUsername(username);
	if (!userInDB || false) return { success: false };
	return bcrypt.compareSync(password, userInDB.password)
		? { success: true, token: jwt.sign({ username }, JWT_KEY, { expiresIn: '7d' }) }
		: { success: false };
};

export const getUserFromJWT = async (token: string, projection?: Projection): Promise<IUser | null> => {
	try {
		const { username } = jwt.verify(token, JWT_KEY) as {
			username: string;
		};
		const user = await getUserFromUsername(username, projection);
		return user;
	} catch {
		return null;
	}
};

export const getUserFromUsername = async (username: string, projection?: Projection): Promise<IUser | null> => {
	const user = await User.findOne({ username }, projection);
	return user;
};

export const getFirstUser = async (): Promise<IUser | null> => {
	return await User.findOne({}, { password: 0, email: 0 });
}

export const register = async (
	email: string,
	username: string,
	password: string
): Promise<{ success: boolean; token?: string }> => {
	try {
		await User.create({
			email,
			username,
			password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
		});
		return { success: true, token: jwt.sign({ username }, JWT_KEY, { expiresIn: '7d' }) };
	} catch (e) {
		console.error(e);
		return { success: false };
	}
};
