const db = require('../lib/db');
const bcrypt = require('bcrypt');
const Promise = require('bluebird');
const { omit, omitBy, isNil } = require('lodash');

function usersAddHandler(request, reply) {
  const {
    email,
    password,
    name,
    twimlAppSid,
    twilioAccountSid,
    twilioAuthToken,
  } = request.payload;

  const newUser = omitBy({
    email,
    name,
    twiml_app_sid: twimlAppSid,
    twilio_account_sid: twilioAccountSid,
    twilio_auth_token: twilioAuthToken,
  }, isNil);

  newUser.password = bcrypt.hash(password, 10);

  Promise.props(newUser)
    .then((data) => {
      return db('users')
        .insert(data);
    })
    .then(() => {
      const cookieMe = {
        email,
        name,
        twimlAppSid,
        twilioAccountSid,
        twilioAuthToken,
      };
      request.cookieAuth.set(cookieMe);
      reply(omit(cookieMe, ['twimlAppSid', 'twilioAccountSid', 'twilioAuthToken']));
    })
    .catch((e) => {
      console.log('err', e);
      reply(e);
    });
}

module.exports = usersAddHandler;
