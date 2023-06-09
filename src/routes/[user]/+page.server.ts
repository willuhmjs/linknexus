import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { getUserFromUsername } from '$lib/auth';
import { SAAS } from '$config';

export const load = (async ({ params }) => {
	if (!JSON.parse(SAAS)) throw redirect(303, `/`);
	const user = await getUserFromUsername(params.user, { password: 0, email: 0 });
	if (!user) throw redirect(303, `/`);
	return {
		user: JSON.parse(JSON.stringify(user))
	};
}) satisfies PageServerLoad;
