import type { RequestHandler } from '@sveltejs/kit';
import { User } from '$lib/db';

interface NewUpdate {
    name: string
    newUrl: string,
}

export const post: RequestHandler = async (req) => {
    try {
        const name = (req.body as unknown as NewUpdate).name;
        const newUrl = (req.body as unknown as NewUpdate).newUrl;
        if (name && newUrl) {
            const res = await User.updateOne({ name: req.locals.user, 'books.name': name }, { $set: { "books.$.url": newUrl } }).exec();
            if (parseInt(res.nModified) === 1) {
                return {
                    status: 200
                }
            } else {
                return {
                    status: 204
                }
            }
        } else {
            return {
                status: 400
            }
        }
    } catch (e) {
        console.log(e);
        return {
            status: 500,
            error: new Error(`${e}`)
        }
    }
}
