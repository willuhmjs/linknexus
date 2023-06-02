import { redirect, type Actions } from '@sveltejs/kit';
import { register } from '$lib/auth';

export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();
        const username = data.get('username')?.toString();
        const password = data.get('password')?.toString();
        const email = data.get('email')?.toString();
        if (!username || !password || !email) {
            return { success: false };
        }
        console.log({ username, password, email });
        const { success, token } = await register(email, username, password);
        
        if (token) {
            cookies.set('session', token, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7 // 1 week
            });
            // redirect to admin page
            throw redirect(303, '/admin');
        } else {
            return { success };
        }


    }
} satisfies Actions;