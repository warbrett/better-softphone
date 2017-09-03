const Joi = require('joi');

const twimlHandler = require('./handlers/twiml');
const inboundTwimlHandler = require('./handlers/inbound-twiml');

const numberData = [1,2,3,4,5];
function numbers(request, reply) {
  console.log('request!');
  reply(numberData);
}

const routes = [
  {
    method: 'GET',
    path: '/numbers',
    handler: numbers,
    config: {
      auth: false,
      tags: ['api', 'users'],
      validate: {
        query: Joi.object(),
      },
      response: {
        schema: Joi.array()
      }
    },
  },
  {
    method: 'GET',
    path: '/twiml',
    handler: twimlHandler
  },
  {
    method: 'GET',
    path: '/inbound-twiml',
    handler: inboundTwimlHandler
  },
];
;

module.exports = routes;
