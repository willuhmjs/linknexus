import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { checkAuth } from '$lib/auth';

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
