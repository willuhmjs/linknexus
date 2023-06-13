import { fail, type Cookies } from '@sveltejs/kit';
import { getUserFromJWT } from '$lib/auth';
import * as validator from '$lib/validation';
import type { IUser } from '$lib/mongo';

const checkAuth = async (cookies: Cookies) => {
	const token = cookies.get('session');

	if (!token) {
		return null;
	}

	const user = await getUserFromJWT(token, { password: 0 });
	return user;
};

export const actions = {
	bio: async ({ cookies, request }) => {
		const user = await checkAuth(cookies);
		if (!user) {
			return fail(403, { ref: 'bio', error: true, message: 'Not authorized!' });
		}

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
