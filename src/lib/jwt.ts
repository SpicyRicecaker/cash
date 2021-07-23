import jwt from 'jsonwebtoken';
import type { Request } from '@sveltejs/kit';
const secret = process.env.JWT_SECRET;

// generate the JWT
export const generateToken = (user: string): string => (
    jwt.sign({
        user: user,
        auth: 'github',
    }, (secret as string), { expiresIn: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60 })  // secret is defined in the environment variable JWT_SECRET
)

// validate the token supplied in request header
export function validate(req: Request): boolean {
    // console.log('req is lfldsfkasdlfas', req);
    try {
        const decoded = jwt.verify(req.locals.token, (secret as string));
        if (!decoded || (decoded as jwt.JwtPayload).auth !== 'github') {
            return false;
        } else {
            req.locals.user = (decoded as jwt.JwtPayload).user;
            return true;
        }
    } catch (e) {
        return false;
    }
}