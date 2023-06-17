import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_KEY } from '$config';
import { User } from '$lib/mongo';
import type { IUser } from '$lib/types';
import type { ProjectionType } from 'mongoose';
import type { Cookies } from '@sveltejs/kit';

type Projection = ProjectionType<IUser>;

export const login = async (
	username: string,
	password: string
): Promise<{ success: boolean; token?: string }> => {
	const userInDB = await getUserFromUsername(username);
	if (!userInDB) return { success: false };

	const passwordMatch = bcrypt.compareSync(password, userInDB.password);
	if (passwordMatch) {
		const token = jwt.sign({ username }, JWT_KEY, { expiresIn: '7d' });
		return { success: true, token };
	}

	return { success: false };
};

export const getUserFromJWT = async (
	token: string,
	projection?: Projection
): Promise<IUser | null> => {
	try {
		const { username } = jwt.verify(token, JWT_KEY) as { username: string };
		const user = await getUserFromUsername(username, projection);
		return user;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const getUserFromUsername = async (
	username: string,
	projection?: Projection
): Promise<IUser | null> => {
	const user = await User.findOne({ username }, projection);
	return user;
};

export const getFirstUser = async (): Promise<IUser | null> => {
	return User.findOne({}, { password: 0, email: 0 });
};

export const register = async (
	email: string,
	username: string,
	password: string
): Promise<{ success: boolean; token?: string }> => {
	try {
		const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
		await User.create({
			email,
			username,
			password: hashedPassword
		});

		const token = jwt.sign({ username }, JWT_KEY, { expiresIn: '7d' });
		return { success: true, token };
	} catch (error) {
		console.error(error);
		return { success: false };
	}
};

export const checkAuth = async (cookies: Cookies) => {
	const token = cookies.get('session');

	if (!token) {
		return null;
	}

	const user = await getUserFromJWT(token, { password: 0 });
	return user;
};
