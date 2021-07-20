import type { RequestHandler } from '@sveltejs/kit';
import { User } from '$lib/db';

// Keep in mind req.body is an array of books
export const post: RequestHandler = async (req) => {
    try {
        const res = await User.updateOne({ name: req.locals.user, 'books.id': 2 }, { books: req.body }).exec();
        console.log(res.modified);
        switch (res.nModified) {
            case 0: {
                return {
                    status: 404
                }
            }
            default: {
                return {
                    status: 200
                }
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
