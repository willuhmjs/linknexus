import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import jwt from 'jsonwebtoken';

const secretKey = "42a776ef57fb74c8fae307413a68503c5df93a5b3a66278689c8afbf158b1fb0f0a893b82c7ff5da195511c693cb1ff53d975044c3e5631c7077cc888d6bd759";

export const load: PageServerLoad = async ({ cookies }) => {
  const token = cookies.get("session"); // Assuming the session cookie is named 'session'

  if (!token) {
    throw redirect(303, '/admin/login');
  }

  try {
    const { username } = jwt.verify(token, secretKey);
    return {
      username
    };
  } catch (e) {
    console.error('Token verification failed:', e);
    throw redirect(303, '/admin/login');
  }
};
