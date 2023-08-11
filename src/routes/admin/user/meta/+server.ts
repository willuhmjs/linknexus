import { json } from '@sveltejs/kit';
import * as validator from '$lib/validation';
import type { IUser } from '$lib/types';

export async function POST({ request, locals }) {
	const user = locals.user;
	const data = await request.json();
	const { metaTitle, metaDescription, metaColor } = data;

	const meta = {
		title: metaTitle,
		description: metaDescription,
		color: metaColor
	};
	const validUser = user as IUser;
	try {
		validator.meta.parse(meta);
		validUser.meta = meta;

		await validUser.save();
		return json({ error: false, user: validUser }, { status: 201 });
	} catch (e) {
		return json(
			{
				error: true,
				message: e?.errors?.[0]?.message || 'Requested username is unavailable.',
				user: validUser
			},
			{ status: 200 }
		);
	}
}
