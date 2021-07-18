export async function get(req) {
    const code = req.query.get('code');
    console.log(code);

    return {
        body: 'callback'
    }
}