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
			validator.link.parse(url);
			validator.title.parse(title);
		} catch (e) {
			return fail(403, {
				ref: 'link',
				error: true,
				message: e.errors[0].message,
				title,
				url,
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
			});
		}

		if (!title || !url) {
			return;
		}

		validUser.links.push({ title, url });
		await validUser.save();

		return { ref: 'link', error: false, message: 'Link added!' };
	},

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
			}
			await user.updateOne({ links: links });
		} catch (e) {
			return fail(403, {
				ref: 'links',
				error: true,
				message: e.errors?.[0].message || 'Malformed input!'
			});
		}
	},
};
