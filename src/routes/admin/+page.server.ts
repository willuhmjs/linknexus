import { fail, type Cookies } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getUserFromJWT, login, register } from '$lib/auth';
import * as validator from '$lib/validation';
import { type IUser, User } from '$lib/mongo';
import { SAAS } from '$config';

const checkAuth = async (cookies: Cookies) => {
	const token = cookies.get('session');

	if (!token) {
		return null;
	}

	const user = await getUserFromJWT(token, { password: 0 });
	return user;
};

export const load: PageServerLoad = async ({ cookies }) => {
	const user = await checkAuth(cookies);
	if (!user) {
		cookies.delete('session');
		return { user };
	}
	return {
		user: JSON.parse(JSON.stringify(user))
	};
};

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
		} else {
			return fail(403, { success, message: 'Invalid username or password!', username });
		}
	},

	logout: ({ cookies }) => {
		cookies.delete('session');
	},

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
	},

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
	},

	link: async ({ cookies, request }) => {
		const user = await checkAuth(cookies);
		if (!user) {
			return fail(403, { ref: 'link', error: true, message: 'Not authorized!' });
		}

		const data = await request.formData();
		const title = data.get('title')?.toString();
		const url = data.get('url')?.toString();
		const icon = data.get('icon')?.toString();

		try {
			validator.link.parse(url);
			validator.title.parse(title);
			validator.icon.parse(icon);
		} catch (e) {
			return fail(403, {
				ref: 'link',
				error: true,
				message: e.errors[0].message,
				title,
				url,
				icon
			});
		}

		const validUser = user as IUser;

		if (validUser.links.find((link) => link.title === title)) {
			return fail(403, {
				ref: 'link',
				error: true,
				message: 'Link with same title already exists!',
				title,
				url,
				icon
			});
		}

		if (!title || !url || !icon) {
			return;
		}

		validUser.links.push({ title, url, icon });
		await validUser.save();

		return { ref: 'link', error: false, message: 'Link added!' };
	},

	// code to update linsk
	links: async ({ cookies, request }) => {
		const user = await checkAuth(cookies);
		if (!user) {
			return fail(403, { ref: 'links', error: true, message: 'Not authorized!' });
		}

		const data = await request.formData();
		try {
			const links = JSON.parse(data.get('links')?.toString());

			for (let i = 0; i < links.length; i++) {
				validator.link.parse(links[i].url);
				validator.title.parse(links[i].title);
				validator.icon.parse(links[i].icon);
			}
			await user.updateOne({ links: links });
		} catch (e) {
			return fail(403, {
				ref: 'links',
				error: true,
				message: e.errors?.[0].message || 'Malformed input!'
			});
		}
	}
};
