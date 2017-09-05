const bcrypt = require('bcrypt');
const { camelCase, mapKeys, omit } = require('lodash');
const db = require('../lib/db');


function loginHandler(request, reply) {
  let me;
  const { email, password } = request.payload;
  db('users')
    .where({ email })
    .select([
      'id',
      'email',
      'password',
      'name',
      'twiml_app_sid',
      'twilio_account_sid',
      'twilio_auth_token',
    ])
    .then(([row]) => {
      if (!row) {
        throw new Error('Account not found');
      }
      me = omit(row, 'password');
      return bcrypt.compare(password, row.password);
    })
    .then((isValid) => {
      if (!isValid) {
        throw new Error('Wrong Password');
      }
      const cookieMe = mapKeys(me, (v, k) => camelCase(k));
      request.cookieAuth.set(cookieMe);

      reply({ id: me.id, email, name: me.name });
    })
    .catch(reply);
}

module.exports = loginHandler;
