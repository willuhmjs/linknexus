import { config } from 'dotenv';
import "$lib/mongo";
config();

export async function handle({ event, resolve }) {
    return await resolve(event);
}