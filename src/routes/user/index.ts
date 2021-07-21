import type { RequestHandler } from '@sveltejs/kit';
import { User } from '$lib/db';

export const put: RequestHandler = async (req) => {
    try {
        if (req.locals.user == "") {
            throw "Username is empty"
        }
        const obj = {
            name: req.locals.user, // String is shorthand for {type: String}
            books: [],
        };
        // MAKE SURE TO NOT USE TYPE AS KEY VALUE
        const user = new User(obj);
        await user.save();
        return {
            status: 200,
            body: JSON.stringify(user)
        }
    } catch (e) {
        console.log(e);
        return {
            status: 500,
            error: new Error(`${e}`)
        }
    }
}