import { redirect, type Actions } from '@sveltejs/kit';
import { login } from '$lib/auth';

export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();
        const username = data.get('username')?.toString();
        const password = data.get('password')?.toString();
        if (!username || !password) {
            return { success: false };
        }
    
        const { success, token } = login(username, password);
        
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