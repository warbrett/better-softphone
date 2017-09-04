const ClientCapability = require('twilio').jwt.ClientCapability;


function twilioTokenHandler(request, reply) {
  const capability = new ClientCapability({
    accountSid,
    authToken,
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
