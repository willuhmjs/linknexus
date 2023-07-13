import { json } from '@sveltejs/kit';
import * as validator from '$lib/validation';
import type { IUser } from '$lib/types';

export async function POST({ request, locals }) {
    const user = locals.user;
    const data = await request.json();
    const bio = data.bio

    const validUser = user as IUser;
    try {
        validator.bio.parse(bio);
        validUser.bio = bio;
        await validUser.save();   
        return json({ error: false, message: "Bio updated!", user: validUser }, { status: 201 })
    } catch (e) {
        return json({ error: true, message: e.errors[0].message, user: validUser }, { status: 200 })
    }
}
