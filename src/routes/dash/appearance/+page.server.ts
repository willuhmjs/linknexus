import { fail, type Cookies } from '@sveltejs/kit';
import { checkAuth } from '$lib/auth';
import * as validator from '$lib/validation';
import type { IUser } from '$lib/mongo';

export const actions = {
	theme: async ({ cookies, request }) => {
		const user = await checkAuth(cookies);
		if (!user) {
			return fail(403, { ref: 'theme', error: true, message: 'Not authorized!' });
		}

		const data = await request.formData();
		const theme = parseInt(data.get('theme')?.toString() || '');

		try {
			validator.theme.parse(theme);
		} catch (e) {
			return fail(403, { ref: 'theme', error: true, message: e.errors[0].message });
		}

		const validUser = user as IUser;
		validUser.theme = theme;
		await validUser.save();
	}
};
