import { checkAuth } from '$lib/auth';
import { connect } from '$lib/mongo';
import { redirect, type Handle, error } from '@sveltejs/kit';
await connect();

const requestCounter = new Map();
const maxReqs = 100;

setInterval(() => {
	requestCounter.clear();
}, 60 * 1000);

export const handle: Handle = async ({ event, resolve }) => {
	const request = event.request;
	// todo make this better
	const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for') || event.getClientAddress();
	if (!ip) {
		throw error(400, 'Invalid request. IP address is missing.')
	}

	const count = requestCounter.set(ip, (requestCounter.get(ip) || 0) + 1).get(ip);
	if (count > maxReqs) {
		throw error(429, 'Too many requests.');
	}

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
