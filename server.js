// const { createServer } = require('https')
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const fs = require('fs')
const https = require('https');
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const PORT = 8885;
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};
app.prepare().then(() => {
  // https.createServer(options, function (req, res) {
  //   // Be sure to pass `true` as the second argument to `url.parse`.
  //   // This tells it to parse the query portion of the URL.
  //   const parsedUrl = parse(req.url, true)
  //   const { pathname, query } = parsedUrl

  //   if (pathname === '/a') {
  //     app.render(req, res, '/a', query)
  //   } else if (pathname === '/b') {
  //     app.render(req, res, '/b', query)
  //   } else {
  //     handle(req, res, parsedUrl)
  //   }
  // }).listen(PORT, (err) => {
  //   if (err) throw err;
  // });
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    if (pathname === '/a') {
      app.render(req, res, '/a', query)
    } else if (pathname === '/b') {
      app.render(req, res, '/b', query)
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(PORT, (err) => {
    if (err) throw err;
  });
});
