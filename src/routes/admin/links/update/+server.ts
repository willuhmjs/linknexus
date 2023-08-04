import { json } from '@sveltejs/kit';
import * as validator from '$lib/validation';
import type { IUser } from '$lib/types';

export async function POST({ request, locals }) {
	const user = locals.user as IUser;
	const { ref, links } = await request.json();
	try {
		for (let i = 0; i < links.length; i++) {
			if (ref === 'links') {
				links[i].image = links[i].image || undefined;
				validator.link.parse(links[i]);
			} else if (ref === 'specials') {
				validator.special.parse(links[i]);
			}
		}
		if (ref === 'links') {
			await user.updateOne({ links: links });
		} else if (ref === 'specials') {
			await user.updateOne({ specials: links });
		}
		return json({}, { status: 201 });
	} catch (e) {
		console.error(e);
		return json({ message: e.errors?.[0].message || 'Malformed input!' }, { status: 200 });
	}
}
