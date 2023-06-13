import { type Cookies, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getUserFromJWT } from '$lib/auth';

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
		throw redirect(303, '/auth');
	}
	return {
		user: JSON.parse(JSON.stringify(user))
	};
};
