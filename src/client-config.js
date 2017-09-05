const env = {
  development: {
    API_URL: 'http://localhost:3001/api',
  },
  production: {
    API_URL: '/api',
  },
};

export default env[process.env.NODE_ENV];
