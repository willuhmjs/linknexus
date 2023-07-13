import { checkAuth } from '$lib/auth';
import { connect } from '$lib/mongo';
import { redirect } from '@sveltejs/kit';
await connect();

export async function handle({ event, resolve }) {
	if (event.url.pathname.startsWith('/admin')) {
		const user = await checkAuth(event.cookies);
		if (!user) {
			event.cookies.delete('session');
			throw redirect(303, '/auth');
		}
		event.locals.user = user;
	}
	return await resolve(event);
}
