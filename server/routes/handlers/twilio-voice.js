function twilioVoiceHandler(request, reply) {
  reply(`<Response>
    <Dial callerId="${request.query.callerId}">${request.query.To}</Dial>
  </Response>`).type('text/xml');
}

module.exports = twilioVoiceHandler;
