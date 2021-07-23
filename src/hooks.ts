import type { Handle, GetSession } from "@sveltejs/kit";
import { serialize, parse } from 'cookie';
import type { CookieSerializeOptions } from 'cookie';

const options: CookieSerializeOptions = {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
}

export const handle: Handle = async function ({ request, resolve }) {
    // Parse the cookie w/ user & token
    const cookies = parse(request.headers.cookie || '');

    // Then append user & token cookies
    request.locals.user = cookies['user'];
    request.locals.token = cookies['token'];

    // Call endpoint
    const response = await resolve(request);

    // After endpoint, append cookies to res

    // Could use bearer authorization but then we would have to set the token to local storage
    // and pass that along with each and every request. It's too much work compared to set and forget lol
    // response.headers['Authorization'] = `Bearer ${ request.locals.token }`;
    response.headers['set-cookie'] = `${serialize('user', request.locals.user, options)}; ${serialize('token', request.locals.token, options)}`;

    return response;
}

// This getSession returns a `session` object that is accessible on the client
// Keep in mind that cookies are stored on server
export const getSession: GetSession = async (request) => ({ user: request.locals.user })
// Deciding to not make the token accessible in session