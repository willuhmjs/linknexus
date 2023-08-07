import { json } from '@sveltejs/kit';
import * as validator from '$lib/validation';
import type { IUser } from '$lib/types';

export async function POST({ request, locals }) {
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
        // update the JWT cookie so the user isnt logged out
        // when they change their username

        
		return json({ error: false, user: validUser }, { status: 201 });
	} catch (e) {
		return json({ error: true, message: e.errors[0].message, user: validUser }, { status: 200 });
	}
}
