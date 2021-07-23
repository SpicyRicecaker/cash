import type { RequestHandler } from '@sveltejs/kit';
import { User } from '$lib/db';
import { put } from '../routes/user/index';
import { generateToken } from '$lib/jwt';

const tokenURL = "https://github.com/login/oauth/access_token";
const apiURL = "https://api.github.com/user";

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

export const get: RequestHandler = async function (req) {
    const code = req.query.get('code');
    if (!code) {
        return {};
    }
    // We want to exchange code for access token,
    const accessToken: string = await getAccessToken(code);
    // Use access token to get user info from api
    // An object that contains info
    const user = await getUser(accessToken);

    // Setting user to login username?
    req.locals.user = user.login;
    req.locals.token = generateToken(user.login);

    // Check db for if user is preexisting or new
    const userDB = await User.findOne({ name: req.locals.user }).exec();
    // If !exists create
    if (!userDB) {
        req.locals.authenticated = true;
        await put(req);
    }

    return {
        status: 302,
        headers: {
            location: '/',
        }
    }
}

// _A_ccept rather than _a_ccept looks weird, but it's what the github api 
// @ https://docs.github.com/en/rest/overview/resources-in-the-rest-api#current-version 
// recommends
const getAccessToken = (code: string): Promise<string> => fetch(tokenURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/vnd.github.v3+json' },
    body: JSON.stringify(
        {
            client_id: clientId,
            client_secret: clientSecret,
            code: code
        }
    ),
}).then(res => res.json()).then(res => res.access_token)

const getUser = (accessToken: string) => fetch(apiURL, {
    headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${accessToken}`
    }
}).then(res => res.json())