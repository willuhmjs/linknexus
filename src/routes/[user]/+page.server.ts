import type { PageServerLoad } from './$types';
import { redirect } from "@sveltejs/kit";
import { getUserFromUsername } from '$lib/auth';
import { SAAS } from "$env/static/private";

export const load = (async ({ params }) => {
    if (!JSON.parse((SAAS))) throw redirect(303, `/`);
    const user = await getUserFromUsername(params.user);
    if (!user) throw redirect(303, `/`);
    return {
        user: JSON.parse(JSON.stringify(user))
    };
}) satisfies PageServerLoad;