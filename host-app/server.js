const { createServer } = require('http');
const { parse } = require('url')
const next = require('next');

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    createServer(async (req, res) => {
        const parsedUrl = parse(req.url, true)
        if (parsedUrl.pathname.startsWith('/admin')) {
            await app.render(req, res, '/admin', parsedUrl.query);
        } else {
            await handle(req, res, parsedUrl);
        }
    }).listen(port)

    console.log(
        `> Server listening at http://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV
        }`
    )
})