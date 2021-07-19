import type { RequestHandler } from '@sveltejs/kit';
import { User } from '$lib/db';

export const get: RequestHandler = async (req) => {
    try {
        const user = await User.findOne({ name: req.locals.user }).exec();
        console.log(user.books);
        return {
            body: JSON.stringify(user.books)
        }
    } catch (e) {
        console.log(e);
        return {
            status: 500,
            error: new Error(`${e}`)
        }
    }
}

export const put: RequestHandler = async (req) => {
    try {
        const user = await User.findOne({ name: req.locals.user }).exec();
        console.log(user.books);
        return {
            body: JSON.stringify(user.books)
        }
    } catch (e) {
        console.log(e);
        return {
            status: 500,
            error: new Error(`${e}`)
        }
    }
}

export const del: RequestHandler = async (req) => {
    try {
        const user = await User.findOne({ name: req.locals.user }).exec();
        console.log(user.books);
        return {
            body: JSON.stringify(user.books)
        }
    } catch (e) {
        console.log(e);
        return {
            status: 500,
            error: new Error(`${e}`)
        }
    }
}