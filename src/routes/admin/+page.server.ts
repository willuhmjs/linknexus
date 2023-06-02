import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getUserFromJWT } from '$lib/auth';

export const load: PageServerLoad = async ({ cookies }) => {
  const token = cookies.get("session");

  if (!token) {
    throw redirect(303, '/admin/login');
  }

  const { success, user } = await getUserFromJWT(token);
  if (!success) {
    throw redirect(303, '/admin/login');
  }
  console.log(user);
  return {
    undefined
  };
};
