const Boom = require('boom');
const bcrypt = require('bcrypt');

const db = require('../lib/db');
const bread = require('../lib/bread');

module.exports = function resetPassword(request, reply) {
  const { password, token } = request.payload;
  let userId;

  db.transaction((t) => {
    return t('temporary_tokens')
      .where({ id: token, type: 'PASSWORD_RESET' })
      .whereNull('redeemed_at')
      .update({ redeemed_at: 'NOW()' })
      .returning(['user_id'])
      .then(([row]) => {
        if (!row) {
          throw Boom.notFound();
        }

        userId = row.user_id;
        return bcrypt.hash(password, 10);
      })
      .then(password => bread.edit('users', ['id'], { password }, { id: userId }, t));
  })
    .then(() => reply().code(204))
    .catch(reply);
};
