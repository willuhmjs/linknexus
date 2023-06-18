import { fail } from '@sveltejs/kit';
import { checkAuth } from '$lib/auth';
import * as validator from '$lib/validation';
import type { IUser } from '$lib/types';
export const actions = {
	link: async ({ cookies, request }) => {
		const user = await checkAuth(cookies);
		if (!user) {
			return fail(403, { ref: 'link', error: true, message: 'Not authorized!' });
		}

		const data = await request.formData();
		const title = data.get('title')?.toString();
		const url = data.get('url')?.toString();

		try {
			validator.link.parse({ title, url });
		} catch (e) {
			return fail(403, {
				ref: 'link',
				error: true,
				message: e.errors[0].message,
				title,
				url
			});
		}

		const validUser = user as IUser;

		if (validUser.links.find((link) => link.title === title)) {
			return fail(403, {
				ref: 'link',
				error: true,
				message: 'Link with same title already exists!',
				title,
				url
			});
		}

		if (!title || !url) {
			return;
		}

		validUser.links.push({ title, url });
		await validUser.save();

		return { ref: 'link', error: false, message: 'Link added!' };
	},

	update: async ({ cookies, request }) => {
		const user = await checkAuth(cookies);
		if (!user) {
			return fail(403, { ref: 'links', error: true, message: 'Not authorized!' });
		}

		const data = await request.formData();
		try {
			const links = JSON.parse(data.get('links')?.toString());
			for (let i = 0; i < links.length; i++) {
				if (links[i].title) {
					validator.link.parse(links[i]);
				} else if (links[i].username) {
					validator.special.parse(links[i]);
				}
			}
			if (links.some((link) => link.title)) {
				await user.updateOne({ links: links });
				}
				
			if (links.some((link) => link.username)) {
			await user.updateOne({ specials: links });
			}
		} catch (e) {
			return fail(403, {
				ref: 'links',
				error: true,
				message: e.errors?.[0].message || 'Malformed input!'
			});
		}
	},

	special: async ({ cookies, request }) => {
		const user = await checkAuth(cookies);
		if (!user) {
			return fail(403, { ref: 'special', error: true, message: 'Not authorized!' });
		}

		const data = await request.formData();
		const type = parseInt(data.get('type')?.toString());
		const username = data.get('username')?.toString();

		try {
			validator.special.parse({ type, username });
		} catch (e) {
			return fail(403, {
				ref: 'special',
				error: true,
				message: e.errors[0].message,
				type,
				username
			});
		}

		const validUser = user as IUser;

		if (!username) return;

		const existingSpecial = validUser.specials.find((special) => special.type === type);
		if (existingSpecial) {
			existingSpecial.username = username;
		} else {
			validUser.specials.push({ type, username });
		}
		await validUser.save();

		return { ref: 'special', error: false, message: 'Special link added!' };
	}
};
