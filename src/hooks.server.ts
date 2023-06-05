import { connect } from '$lib/mongo';
await connect();

export async function handle({ event, resolve }) {
	return await resolve(event);
}
