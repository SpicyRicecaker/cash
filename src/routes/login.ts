// Location of where to authorize
const gitAuthURL = "https://github.com/login/oauth/authorize";
// VITE_ needed for variables to be visible for app I think?
const clientId = import.meta.env.VITE_CLIENT_ID;
export async function get(req) {
    const sessionId = '1234';
    return {
        // 300 status codes are for redirect responses
        // 302 means that the res has been found and url may be changed
        status: 302,
        headers: {
            // See https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps for required parameters
            // client_id is always required for making an app
            // session id prevents against cross origin forgery attacks???
            location: `${gitAuthURL}?client_id=${clientId}&state=${sessionId}`
        }
    }
}