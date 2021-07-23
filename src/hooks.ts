import type { Handle, GetSession } from "@sveltejs/kit";
import type { CookieSerializeOptions } from 'cookie';
import { serialize, parse } from 'cookie';
import { validate } from '$lib/jwt';

const options: CookieSerializeOptions = {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
};

export const handle: Handle = async function ({ request, resolve }) {
    // Parse the cookie w/ user & token
    const cookies = parse(request.headers.cookie || '');

    // Then append token cookie
    request.locals.token = cookies['token'];
    request.locals.authenticated = validate(request);

    // Call endpoint
    const response = await resolve(request);

    // After endpoint, append cookies to res
    // Could use bearer authorization but then we would have to set the token to local storage
    // and pass that along with each and every request. It's too much work compared to set and forget lol
    response.headers['set-cookie'] = `${serialize('token', request.locals.token, options)}`;

    return response;
}

// This getSession returns a `session` object that is accessible on the client
// Keep in mind that cookies are stored on server
export const getSession: GetSession = async (request) => ({ user: request.locals.user, authenticated: request.locals.authenticated })
// Deciding to not make the token accessible in session