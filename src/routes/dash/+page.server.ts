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
