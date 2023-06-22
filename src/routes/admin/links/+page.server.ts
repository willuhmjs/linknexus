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
	},

	update: async ({ cookies, request }) => {
		const user = await checkAuth(cookies);
		if (!user) {
			return fail(403, { ref: 'links', error: true, message: 'Not authorized!' });
		}

		const raw = await request.formData();
		try {
			const { ref, data } = JSON.parse(raw.get('request')?.toString() || '{}');
			const links = data;
			for (let i = 0; i < links.length; i++) {
				if (ref === 'links') {
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
		} catch (e) {
			return fail(403, {
				ref: 'links',
				error: true,
				message: e.errors?.[0].message || 'Malformed input!'
			});
		}
	}
};
