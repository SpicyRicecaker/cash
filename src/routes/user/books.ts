import type { RequestHandler } from '@sveltejs/kit';
import { User } from '$lib/db';

export const get: RequestHandler = async (req) => {
    try {
        const user = await User.findOne({ name: req.locals.user }).exec();
        if (user) {
            return {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user.books)
            }
        } else {
            return {
                status: 404,
                body: JSON.stringify({ message: 'Not Found' })
            }
        }
    } catch (e) {
        return {
            status: 500,
            error: new Error(`${e}`)
        }
    }
}

// Keep in mind req.body is an array of books
export const post: RequestHandler = async (req) => {
    try {
        const res = await User.updateOne({ name: req.locals.user }, { books: req.body }).exec();
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

export const put: RequestHandler = async (req) => {
    try {
        if (req.locals.user == "") {
            throw "Username is empty"
        }
        const obj = {
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
                    value: "Prev chapter"
                },
            }],
        };
        // MAKE SURE TO NOT USE TYPE AS KEY VALUE
        const user = new User(obj);
        await user.save();
        return {
            status: 200,
            body: JSON.stringify(obj.books)
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
        const res = await User.deleteOne({ name: req.locals.user }).exec();
        if (res.deletedCount == 1) {
            return {
                status: 200
            }
        } else {
            return {
                status: 404
            }
        }
    } catch (e) {
        return {
            status: 500,
            error: new Error(`${e}`)
        }
    }
}