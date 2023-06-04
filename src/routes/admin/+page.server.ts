import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { getUserFromJWT } from '$lib/auth';

export const load: PageServerLoad = async ({ cookies }) => {
  console.log("this loads whenever GLOBAL")
  const token = cookies.get("session");
  
  if (!token) {
    throw redirect(303, '/admin/login');
  }

  const { success, user } = await getUserFromJWT(token);
  if (!success) {
    throw redirect(303, '/admin/login');
  }
  
  return {
    user: JSON.parse(JSON.stringify(user))
  };
};


export const actions = {
    default: async (event) => {
        console.log("this loads whenever ACTION")
        // TODO log the user in
    }
} satisfies Actions;