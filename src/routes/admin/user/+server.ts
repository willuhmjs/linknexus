import { json } from '@sveltejs/kit';
import * as validator from '$lib/validation';
import type { IUser } from '$lib/types';
import jwt from 'jsonwebtoken';
import { JWT_KEY } from '$config';

export async function POST({ cookies, request, locals }) {
	const user = locals.user;
	const data = await request.json();
	const { username, bio } = data;

	const validUser = user as IUser;
	try {
		validator.username.parse(username);
        validator.bio.parse(bio)
        validUser.username = username;
        validUser.bio = bio;
		await validUser.save();
		const token = jwt.sign({ username }, JWT_KEY, { expiresIn: '7d' });
        cookies.set('session', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7 // 1 week
        });        
		return json({ error: false, user: validUser }, { status: 201 });
	} catch (e) {
		return json({ error: true, message: e?.errors?.[0]?.message || "Requested username is unavailable.", user: validUser }, { status: 200 });
	}
}
