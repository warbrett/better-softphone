const twilio = require('twilio');
const config = require('../../server-config');

// const client = new twilio.RestClient(config.twilioAccountSid, config.twilioAuthToken);
// const capability = new twilio.Capability(config.twilioAccountSid, config.twilioAuthToken);
// 
// capability.allowClientOutgoing(config.twimlAppSid);

function inboundTwimlHandler(request, reply) {
  //  const token = capability.generate();
  //  const context = { token };
  //
  //  client.accounts.incomingPhoneNumbers.list()
  //  .then(function ({ incomingPhoneNumbers }) {
  //    context.numbers = incomingPhoneNumbers.map(({ friendlyName, phoneNumber }) => {
  //        return { friendlyName, phoneNumber };
  //      });
  //    })
  //    .finally(function () {
  //      reply.view('index', context);
  //    });
}

module.exports = inboundTwimlHandler;
