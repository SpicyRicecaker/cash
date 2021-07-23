import type { RequestHandler } from '@sveltejs/kit';
export const get: RequestHandler = async function get(req) {
    req.locals.user = null;
    return {
        status: 302,
        headers: {
            location: '/',
            'set-cookie': `user=deleted; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; token=deleted; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
        }
    }
}