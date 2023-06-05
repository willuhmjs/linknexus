import { fail, type Cookies } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { getUserFromJWT, login, register } from '$lib/auth';
import * as validator from "$lib/validation"; 
import type { IUser } from '$lib/mongo';


const checkAuth = async (cookies: Cookies) => {
  const token = cookies.get("session");
  
  if (!token) {
    return {
      user: null
    }
  }

  const user = await getUserFromJWT(token);
  return user;
}
  

export const load: PageServerLoad = async ({ cookies }) => {
  const user = await checkAuth(cookies);
  if (!user) return { user };
  return {
    user: JSON.parse(JSON.stringify(user))
  }
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
      } else {
          return fail(403, { success })
      }
    },

     bio: async ({ cookies, request }) => {
      const user = await checkAuth(cookies);
      if (!user) return fail(403, { ref: "bio", error: true, message: "Not authorized!" });

      const data = await request.formData();
      const bio = data.get('bio')?.toString();

      // validate bio
      const d = validator.bio.safeParse(bio);
      if (!d.success) return fail(403, { ref: "bio", error: true, message: d.error.errors[0].message });

      const validUser = user as IUser;
      validUser.bio = bio;
      await validUser.save();
      
      return { ref: "bio", error: false, message: "Bio updated!" };
    }

} satisfies Actions;