const CookieAuth = require('hapi-auth-cookie');
const Inert = require('inert');
const Hapi = require('hapi');

const config = require('./server-config');
const routes = require('./routes');

const server = new Hapi.Server(config.server);

server.connection(config.connection);

// Register Hapi Plugins
server.register([
  CookieAuth,
  Inert,
], err => err);

server.auth.strategy('auth', 'cookie', true, config.cookies);

server.route(routes);


server.start((err) => {
  if (err) {
    console.error('Error starting server', err);
    throw err;
  }
  console.log('Server started', server.info.uri);
});

module.exports = server;
