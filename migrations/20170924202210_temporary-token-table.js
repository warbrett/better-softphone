
const upQuery = `
CREATE extension IF NOT EXISTS "uuid-ossp";

CREATE OR REPLACE FUNCTION updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TABLE IF NOT EXISTS temporary_tokens(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  redeemed_at TIMESTAMPTZ
);

ALTER TABLE
  users
ADD COLUMN created_at TIMESTAMPTZ DEFAULT NOW(),
ADD COLUMN updated_at TIMESTAMPTZ;


CREATE TRIGGER updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE updated_at();
`;


const downQuery = `
DROP TABLE temporary_tokens;

ALTER TABLE users
  DROP COLUMN created_at,
  DROP COLUMN updated_at;

DROP FUNCTION IF EXISTS updated_at;
`;

exports.up = function (knex, Promise) {
  return knex.raw(upQuery);
};

exports.down = function (knex, Promise) {
  return knex.raw(downQuery);
};
