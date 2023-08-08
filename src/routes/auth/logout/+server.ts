import { redirect } from '@sveltejs/kit';

export async function POST({ cookies }) {
	cookies.delete('session', { path: '/' });
	throw redirect(303, '/admin/');
}
