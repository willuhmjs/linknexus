import { json } from '@sveltejs/kit';
import * as validator from '$lib/validation';
import type { IUser } from '$lib/types';

export async function POST({ request, locals }) {
	const user = locals.user;
	const data = await request.json();
	const validUser = user as IUser;
	data.image = data.image || undefined;
	try {
		validator.link.parse(data);
		const existingLink = validUser.links.find((link) => link.title === data.title);
		if (existingLink) {
			existingLink.url = data.url;
		} else {
			validUser.links.push(data);
		}
		await validUser.save();
		return json(
			{ error: false, message: 'Link added!', ...data, user: validUser },
			{ status: 201 }
		);
	} catch (e) {
		return json(
			{ error: true, message: e.errors?.[0]?.message || "Invalid input!", ...data, user: validUser },
			{ status: 200 }
		);
	}
}
