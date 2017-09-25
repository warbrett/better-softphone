const upQuery = `
CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  twiml_app_sid TEXT NOT NULL,
  twilio_account_sid TEXT NOT NULL,
  twilio_auth_token TEXT NOT NULL
);`;


const downQuery = 'DROP TABLE users;';

exports.up = function (knex, Promise) {
  return knex.raw(upQuery);
};

exports.down = function (knex, Promise) {
  return knex.raw(downQuery);
};
