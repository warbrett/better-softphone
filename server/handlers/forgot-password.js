const bread = require('../lib/bread');

const { sendReset } = require('../lib/emails');

module.exports = function forgotPassword(request, reply) {
  const { email } = request.payload;

  bread.read('users', ['id'], { email })
    .then(({ id }) => {
      return bread.add('temporary_tokens', ['id'], { user_id: id, type: 'PASSWORD_RESET' });
    })
    .then((token) => {
      return sendReset(email, token.id);
    })
    .then(() => reply().code(204))
    .catch(reply);
};
