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
        return {
            status: 500,
            error: new Error(`${e}`)
        }
    }
}

export const post: RequestHandler = async (req) => {
    try {
        const new_user = JSON.parse(req.body.toString());
        await User.replaceOne({ name: req.locals.user }, new_user).exec();
        return {
            status: 200
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
        // MAKE SURE TO NOT USE TYPE AS KEY VALUE
        const user = new User({
            name: req.locals.user, // String is shorthand for {type: String}
            books: [{
                name: "test",
                url: "http://localhost:1234",
                content: {
                    type: "selector",
                    value: ".mt-5"
                },
                nextChapter: {
                    type: "innerHTML",
                    value: "Next chapter"
                },
                prevChapter: {
                    type: "innerHTML",
                    innerHTML: "Prev chapter"
                },
            }],
        });
        await user.save();
        return {
            status: 200
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
        await User.deleteOne({ name: req.locals.user }).exec();
        return {
            status: 200
        }
    } catch (e) {
        return {
            status: 500,
            error: new Error(`${e}`)
        }
    }
}