import { fail, type Cookies } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { getUserFromJWT, login, register } from '$lib/auth';

const checkAuth = async (cookies: Cookies) => {
  const token = cookies.get("session");
  
  if (!token) {
    return {
      authorized: false
    }
  }

  const { success, user } = await getUserFromJWT(token);
  if (!success) {
    return {
      authorized: false
    }
  } else {
    return {
      user: JSON.parse(JSON.stringify(user)),
      authorized: true
    }
  }
}
  

export const load: PageServerLoad = async ({ cookies }) => {
  console.log("this loads whenever GLOBAL")
  return checkAuth(cookies);
};


export const actions = {
    register: async ({ cookies, request }) => {
      const data = await request.formData();
      const username = data.get('username')?.toString();
      const password = data.get('password')?.toString();
      const email = data.get('email')?.toString();
      if (!username || !password || !email) {
          return fail(403, { success: false })
      }
      const { success, token } = await register(email, username, password);
      
      if (token) {
          cookies.set('session', token, {
              httpOnly: true,
              maxAge: 60 * 60 * 24 * 7 // 1 week
          });
      } else {
          return fail(403, { success })
      }
    },

    login: async ({ cookies, request }) => {
      const data = await request.formData();
      const username = data.get('username')?.toString();
      const password = data.get('password')?.toString();
      if (!username || !password) {
          return fail(403, { success: false })
      }
  
      const { success, token } = await login(username, password);
      
      if (token) {
          cookies.set('session', token, {
              httpOnly: true,
              maxAge: 60 * 60 * 24 * 7 // 1 week
          });
          // redirect to admin page
      } else {
          return fail(403, { success })
      }


    },

    special: async ({ cookies, request }) => {
      console.log("this loads whenever SPECIAL")
      // this gives me headaches. idk how to make auth checking work
      const { authorized } = await checkAuth(cookies);
      if (!authorized) return fail(403, { success: false });
    }

} satisfies Actions;