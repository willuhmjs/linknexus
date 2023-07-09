import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { login, register, checkAuth } from '$lib/auth';
import * as validator from '$lib/validation';
import { User } from '$lib/mongo';
import { SAAS } from '$config';

export const actions = {
	register: async ({ cookies, request }) => {
		if (!SAAS) {
			const numUsers = await User.countDocuments();
			if (numUsers > 0) {
				return fail(401, { success: false, message: 'Registration is disabled!' });
			}
		}
		const data = await request.formData();
		const username = data.get('username')?.toString();
		const password = data.get('password')?.toString();
		const email = data.get('email')?.toString();

		try {
			validator.email.parse(email);
			validator.username.parse(username);
			validator.password.parse(password);
		} catch (e) {
			return fail(403, { success: false, message: e.errors[0].message, username, email });
		}

		if (!username || !password || !email) {
			return;
		}

		const { success, token } = await register(email, username, password);

		if (token) {
			cookies.set('session', token, {
				httpOnly: true,
				maxAge: 60 * 60 * 24 * 7 // 1 week
			});
			throw redirect(303, '/admin/');
		} else {
			return fail(403, { success, message: 'User already exists!', username, email });
		}
	},

	login: async ({ cookies, request }) => {
		const data = await request.formData();
		const username = data.get('username')?.toString();
		const password = data.get('password')?.toString();

		if (!username || !password) {
			return fail(403, { success: false, message: 'Invalid username or password!' });
		}

		const { success, token } = await login(username, password);

		if (token) {
			cookies.set('session', token, {
				httpOnly: true,
				maxAge: 60 * 60 * 24 * 7 // 1 week
			});
			throw redirect(303, '/admin/');
		} else {
			return fail(403, { success, message: 'Invalid username or password!', username });
		}
	},

	logout: ({ cookies }) => {
		cookies.delete('session');
	}
};
