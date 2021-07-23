import type { RequestHandler } from '@sveltejs/kit';
export const get: RequestHandler = async function get(req) {
    req.locals.token = null;
    return {
        status: 302,
        headers: {
            location: '/',
            'set-cookie': `token=deleted; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
        }
    }
}