import type { PageServerLoad } from './$types';
import { SAAS } from "$env/static/private";

export const load = (() => {
    return {
        saas: JSON.parse((SAAS))
    };
}) satisfies PageServerLoad;