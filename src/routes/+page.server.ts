import type { PageServerLoad } from './$types';
import { SAAS } from '$config';
import { getFirstUser } from '$lib/auth';
export const load = (async () => {
	return {
		saas: SAAS,
		user: SAAS ? null : JSON.parse(JSON.stringify(await getFirstUser()))
	};
}) satisfies PageServerLoad;
