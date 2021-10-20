# Cash
... is [live](https://cash-weld.vercel.app) over at Vercel!

## Why $? 

Cash is a webscraper for books/text online. You add the url for a book, configure css selectors, and it downloads the webpage and displays only the content you select in a nice frontend.

## Limitations

Captcha.

## Developing

Install mongodb via https://www.mongodb.com/try/download/community

Make sure to create a `.env` file and assign the following fields

```shell
VITE_CLIENT_ID=... # client id @ https://github.com/settings/applications
VITE_CLIENT_SECRET=... # client secret @ https://github.com/settings/applications
VITE_JWT_SECRET=... # can be literally anything, used for jason web tokens
VITE_MONGODB_URI=... # link to mongodb database (can be localhost for testing)
```