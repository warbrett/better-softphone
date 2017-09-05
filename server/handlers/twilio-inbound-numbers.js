const twilio = require('twilio');

function twilioNumbersHandler(request, reply) {
  const {
    twilioAccountSid,
    twilioAuthToken,
  } = request.auth.credentials;

  const client = twilio(twilioAccountSid, twilioAuthToken);
  client.incomingPhoneNumbers
    .list((err, numberData) => {
      const availableNumbers = numberData.map(i => i.phoneNumber);
      reply(availableNumbers);
    });
}

module.exports = twilioNumbersHandler;
