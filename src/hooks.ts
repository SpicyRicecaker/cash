import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async function ({ request, resolve }) {
    const response = await resolve(request);

    return response;
}