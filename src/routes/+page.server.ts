import type { PageServerLoad } from './$types';
import { SAAS } from '$config';
import { getFirstUser } from '$lib/auth';
import { redirect } from '@sveltejs/kit';
export const load = (async () => {
	const user = await getFirstUser();
	if (SAAS || !user) throw redirect(307, '/admin');
	if (!SAAS && user) {
		return {
			user: JSON.parse(JSON.stringify(user))
		};
	}
}) satisfies PageServerLoad;
