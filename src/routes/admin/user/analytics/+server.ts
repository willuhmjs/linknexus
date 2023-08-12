import { json } from '@sveltejs/kit';
import * as validator from '$lib/validation';
import type { IUser } from '$lib/types';

export async function POST({ request, locals }) {
	const user = locals.user;
	const data = await request.json();
	const { measurementId } = data;
	const validUser = user as IUser;
	try {
		validUser.measurement_id = measurementId;
		await validUser.save();
		return json({ error: false, user: validUser }, { status: 201 });
	} catch (e) {
		console.error(e);
		return json(
			{
				error: true,
				message: e?.errors?.[0]?.message,
				user: validUser
			},
			{ status: 200 }
		);
	}
}
