import type { PageServerLoad } from './$types';
import { SAAS } from "$env/static/private";
import { getFirstUser } from "$lib/auth";
export const load = (async () => {
    return {
        saas: JSON.parse(SAAS),
        user: JSON.parse(SAAS) ? null : JSON.parse(JSON.stringify(await getFirstUser()))
    };
}) satisfies PageServerLoad;