const env = process.env.NODE_ENV || 'development';

const cookies = {
  development: {
    password: 'password-should-be-32-characters',
    cookie: 'bsoft-dev',
    isSecure: false,
  },
  production: {
    password: process.env.COOKIE_PASSWORD,
    cookie: 'bsoft',
    isSecure: true,
  },
};

const connectionOptions = {
  development: {
    host: '0.0.0.0',
    port: 3001,
    routes: {
      cors: {
        credentials: true,
        origin: ['*'],
      },
    },
  },
  production: {
    host: '0.0.0.0',
    port: 3001,
    routes: {
      cors: {
        credentials: true,
        origin: ['*'],
      },
    },
  },
};

module.exports = {
  env,
  connection: connectionOptions[env],
  cookies: cookies[env],
};
