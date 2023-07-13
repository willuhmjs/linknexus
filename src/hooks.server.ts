import { checkAuth } from '$lib/auth';
import { connect } from '$lib/mongo';
import { redirect, type Handle, type RequestEvent } from '@sveltejs/kit';
await connect();

const requestCounter = new Map();
const maxReqs = 5;

setInterval(() => requestCounter.clear(), 60 * 1000);

export const handle: Handle = async ({ event, resolve }) => {
	const request = event.request;
	// todo make this better
	const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for') || event.getClientAddress();
	if (!ip) {
		return new Response("Invalid request. IP address is missing", { status: 400 })
	}

	const count = requestCounter.set(ip, (requestCounter.get(ip) || 0) + 1).get(ip);
	if (count > maxReqs) {
		return new Response("Too many requests. Please try again later.", { status: 429 })
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
