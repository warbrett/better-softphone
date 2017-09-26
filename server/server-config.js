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
    port: process.env.PORT || 3001,
    routes: {
      cors: {
        credentials: true,
        origin: ['*'],
      },
    },
  },
  production: {
    host: '0.0.0.0',
    port: process.env.PORT || 3001,
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
  sendgridApiKey: process.env.SENDGRID_API_KEY,
  siteUrl: process.env.SITE_URL,
  fromEmail: process.env.FROM_EMAIL,
};
