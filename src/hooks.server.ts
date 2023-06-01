import "$lib/mongo";

export async function handle({ event, resolve }) {
    return await resolve(event);
}