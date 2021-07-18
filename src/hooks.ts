import type { Handle, GetSession } from "@sveltejs/kit";

export const handle: Handle = async function ({ request, resolve }) {
    let user = '';
    // If cookie exists
    if (request.headers.cookie) {
        // Parse the cookie w/ user
        const find = request.headers.cookie
            .split(';')
            .map(el => el.split('='))
            .find(el => el[0] == 'user');
        if (find) {
            user = find[1];
        }
    }

    // Then append user cookie
    request.locals.user = user;

    // Call endpoint
    const response = await resolve(request);
    // After endpoint, append cookies to res?????????????????

    // Set response to user?
    response.headers['set-cookie'] = `user=${request.locals.user || ''}; Path=/; HttpOnly; SameSite=Lax`;

    return response;
}

// This getSession returns a `session` object that is accessible on the client
// Keep in mind that cookies are stored on server
export const getSession: GetSession = async (request) => {
    return { user: request.locals.user }
}