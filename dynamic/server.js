const path = require('path');
const config = require('./config');
const jsonServer = require('json-server');
const rules = require('./routes');
const dbfile = require(config.DB_FILE);

const ip = config.SERVER;
const port = config.PORT;
const db_file = config.DB_FILE;

const server = jsonServer.create();
const router = jsonServer.router(dbfile());
const middlewares = jsonServer.defaults();


server.use(jsonServer.bodyParser);

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);


server.use((req, res, next) => {
 res.header('X-Hello', 'World');
 next();
})


// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

router.render = (req, res) => {
  res.jsonp({
    body: res.locals.data,
    code: 0
  })
}

server.use("/api",router);

server.use(jsonServer.rewriter(rules));

server.use(router);

server.listen({
	host: ip,
	port: port,
}, function() {
	console.log(JSON.stringify(jsonServer));
	console.log(`JSON Server is running in http://${ip}:${port}`);
});
