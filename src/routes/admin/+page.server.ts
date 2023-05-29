import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getUser } from '$lib/auth';

export const load: PageServerLoad = async ({ cookies }) => {
  const token = cookies.get("session");

  if (!token) {
    throw redirect(303, '/admin/login');
  }

  const { success, user } = getUser(token);
  if (!success) {
    throw redirect(303, '/admin/login');
  }

  return {
    user
  };
};
