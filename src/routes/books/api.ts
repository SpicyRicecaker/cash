import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async (req) => {
    try {
        const url = req.query.get('url');

        if (url) {
            const res = await fetch(url);
            if (res.ok) {
                return {
                    status: 200,
                    body: await res.text(),
                    headers: { 'Content-Type': 'text/html' },
                }
            } else {
                return {
                    status: res.status
                }
            }
        } else {
            return {
                status: 400
            }
        }
    } catch (e) {
        return {
            status: 500,
            error: new Error(`${e}`)
        }
    }
}