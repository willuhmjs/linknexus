import type { PageServerLoad } from './$types';

// @ts-expect-error idk where the locals def is lol
export const load: PageServerLoad = async ({ locals }) => {
	return {
		user: JSON.parse(JSON.stringify(locals.user))
	};
};
