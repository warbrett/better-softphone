function twimlHandler (request, reply) {
  reply(`<Response>
    <Client>${request.query.client}</Client>
  </Response>`).type('text/xml');
}

module.exports = twimlHandler;
