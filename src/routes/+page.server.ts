import type { PageServerLoad } from './$types';
import { SAAS } from '$config';
import { getFirstUser } from '$lib/auth';
import { redirect } from '@sveltejs/kit';
export const load = (async () => {
	if (SAAS) throw redirect(307, "/admin") 
	if (!SAAS) {
		return {
			user: JSON.parse(JSON.stringify(await getFirstUser()))
		};
	}
}) satisfies PageServerLoad;
