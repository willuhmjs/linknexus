import { json } from '@sveltejs/kit';
import * as validator from '$lib/validation';
import type { IUser } from '$lib/types';

export async function POST({ request, locals }) {
    const user = locals.user;
    const data = await request.json();
    const validUser = user as IUser;
    data.type = parseInt(data.type);
    try {
        validator.special.parse(data);
        const existingSpecial = validUser.specials.find((special) => special.type === data.type);
		if (existingSpecial) {
			existingSpecial.username = data.username;
		} else {
			validUser.specials.push(data);
		}
        await validUser.save();
        return json({ error: false, message: 'Social link added!', user: validUser }, { status: 201 });
    } catch (e) {
        console.error(e);
        return json({ error: true, message: e.errors[0].message, ...data, user: validUser }, { status: 200 });
    }
}
