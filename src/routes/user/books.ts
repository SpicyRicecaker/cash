import type { RequestHandler } from '@sveltejs/kit';
import { User } from '$lib/db';
import type { Book } from '$lib/types';
import { ObjId } from '$lib/db';

export const get: RequestHandler = async (req) => {
    try {
        if (!req.locals.authenticated) {
            throw new Error("You're not logged in");
        }
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

export const post: RequestHandler = async (req) => {
    try {
        if (!req.locals.authenticated) {
            throw new Error("You're not logged in");
        }
        const book = req.body as unknown as Book;
        if (book) {
            const res = await User.updateOne({ name: req.locals.user, 'books._id': book._id }, { $set: { "books.$": book } }).exec();
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

export const put: RequestHandler = async (req) => {
    try {
        if (!req.locals.authenticated) {
            throw new Error("You're not logged in");
        }
        // Add new book to user and return it
        if (req.locals.user == "") {
            throw "Username is empty"
        }
        const book: Book = {
            _id: `${ObjId()}`,
            name: "test",
            url: "http://localhost:1234",
            content: {
                _id: `${ObjId()}`,
                type: "selector",
                value: ".mt-5"
            },
            nextChapter: {
                _id: `${ObjId()}`,
                type: "innerHTML",
                value: "Next chapter"
            },
            prevChapter: {
                _id: `${ObjId()}`,
                type: "innerHTML",
                value: "Prev chapter"
            },
        };
        const res = await User.updateOne({ name: req.locals.user }, { $push: { books: book } }).exec();
        switch (res.nModified) {
            case 0: {
                throw new Error("Unable to modify document");
            }
            default: {
                return {
                    status: 200,
                    body: JSON.stringify(book)
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

export const del: RequestHandler = async (req) => {
    try {
        if (!req.locals.authenticated) {
            throw new Error("You're not logged in");
        }
        const _id = req.body;
        const res = await User.updateOne({ name: req.locals.user }, { $pull: { books: { _id: _id } } }).exec();
        if (res.nModified == 1) {
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