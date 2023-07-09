import { fail } from '@sveltejs/kit';
import * as validator from '$lib/validation';
import type { IUser } from '$lib/types';

export const actions = {
	bio: async ({ request, locals }) => {
		const user = locals.user;

		const data = await request.formData();
		const bio = data.get('bio')?.toString();

		try {
			validator.bio.parse(bio);
		} catch (e) {
			return fail(403, { ref: 'bio', error: true, message: e.errors[0].message });
		}

		const validUser = user as IUser;
		validUser.bio = bio;
		await validUser.save();

		return { ref: 'bio', error: false, message: 'Bio updated!' };
	}
};
