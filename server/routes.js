const Joi = require('joi');

// Auth Handlers
const loginHandler = require('./handlers/login');
const logoutHandler = require('./handlers/logout');

// User Handlers
const usersAddHandler = require('./handlers/users-add');
const usersMeHandler = require('./handlers/users-me');

// Twilio Handlers
const inboundNumbersHandler = require('./handlers/twilio-inbound-numbers');
const twilioTokenHandler = require('./handlers/twilio-token');
const twilioVoiceHandler = require('./handlers/twilio-voice');

const routes = [
  {
    method: 'POST',
    path: '/api/login',
    handler: loginHandler,
    config: {
      auth: false,
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().min(8).required(),
        }),
      },
    },
  },
  {
    method: 'POST',
    path: '/api/logout',
    handler: logoutHandler,
    config: {
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/api/signup',
    handler: usersAddHandler,
    config: {
      auth: false,
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().min(8).required(),
          name: Joi.string().required(),
          twimlAppSid: Joi.string().required(),
          twilioAccountSid: Joi.string().required(),
          twilioAuthToken: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: 'GET',
    path: '/api/users/me',
    handler: usersMeHandler,
    config: {
      auth: 'auth',
    },
  },
  {
    method: 'GET',
    path: '/api/twilio-numbers',
    handler: inboundNumbersHandler,
    config: {
      auth: 'auth',
      validate: {
        query: Joi.object(),
      },
      response: {
        schema: Joi.array(),
      },
    },
  },
  {
    method: 'GET',
    config: {
      auth: 'auth',
    },
    path: '/api/twilio-token',
    handler: twilioTokenHandler,
  },
  {
    method: 'GET',
    config: {
      auth: false,
    },
    path: '/api/twilio-voice',
    handler: twilioVoiceHandler,
  },
  {
    method: 'GET',
    config: {
      auth: false,
    },
    path: '/{param*}',
    handler: {
      directory: {
        path: 'build',
      },
    },
  },
];

module.exports = routes;
