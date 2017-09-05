const { snakeCase } = require('lodash');
const ClientCapability = require('twilio').jwt.ClientCapability;

function twilioTokenHandler(request, reply) {
  const {
    name,
    twimlAppSid,
    twilioAccountSid,
    twilioAuthToken,
  } = request.auth.credentials;
  const identity = snakeCase(name);

  const capability = new ClientCapability({
    accountSid: twilioAccountSid,
    authToken: twilioAuthToken,
  });

  capability.addScope(new ClientCapability.IncomingClientScope(identity));
  capability.addScope(new ClientCapability.OutgoingClientScope({
    applicationSid: twimlAppSid,
    clientName: identity,
  }));

  const response = {
    identity,
    token: capability.toJwt(),
  };

  reply(response);
}

module.exports = twilioTokenHandler;
