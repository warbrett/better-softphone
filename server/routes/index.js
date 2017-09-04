const Joi = require('joi');

const twilioTokenHandler = require('./handlers/twilio-token');
const twilioVoiceHandler = require('./handlers/twilio-voice');

const numberData = ['15035059957', '14804065861'];
function numbers(request, reply) {
  reply(numberData);
}

const routes = [
  {
    method: 'GET',
    path: '/numbers',
    handler: numbers,
    config: {
      auth: false,
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
      auth: false,
    },
    path: '/twilio-token',
    handler: twilioTokenHandler,
  },
  {
    method: 'GET',
    config: {
      auth: false,
    },
    path: '/twilio-voice',
    handler: twilioVoiceHandler,
  },
];

module.exports = routes;
