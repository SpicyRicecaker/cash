import type { RequestHandler } from '@sveltejs/kit';
import { User } from '$lib/db';

interface PostBook {
    _id: string
    newUrl: string,
}

// Return book of id given id in req.body
export const get: RequestHandler = async (req) => {
    try {
        if (!req.locals.authenticated) {
            throw new Error("You're not logged in");
        }
        const _id = req.query.get('_id');
        if (_id) {
            // Request book with id in question
            const user = await User.findOne({ name: req.locals.user, 'books._id': _id }, { _id: 0, 'books.$': 1 }).exec();
            if (user) {
                return {
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(user.books[0])
                }
            } else {
                return {
                    status: 404,
                    error: new Error(`Book with id ${_id} was not found.`)
                }
            }
        } else {
            return {
                status: 400,
                error: new Error(`Bad request. Should include url of book in request parameters. Expected 24-len id, found ${_id}`)
            }
        }
    } catch (e) {
        console.log(e);
        return {
            status: 500,
            error: e
        }
    }
}

export const post: RequestHandler = async (req) => {
    try {
        if (!req.locals.authenticated) {
            throw new Error("You're not logged in");
        }
        const _id = (req.body as unknown as PostBook)._id;
        const newUrl = (req.body as unknown as PostBook).newUrl;
        if (_id && newUrl) {
            const res = await User.updateOne({ name: req.locals.user, 'books._id': _id }, { $set: { "books.$.url": newUrl } }).exec();
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
            error: e
        }
    }
}
