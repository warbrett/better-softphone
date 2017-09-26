const db = require('./db');
const Boom = require('boom');

// Originally from https://github.com/iceddev/generic-api/
module.exports = {
  browse(table, fields, filter, dbApi = db) {
    return dbApi(table)
      .where(filter)
      .select(fields)
      .then((rows) => {
        return rows;
      });
  },
  read(table, fields, filter, dbApi = db) {
    return dbApi(table)
      .where(filter)
      .select(fields)
      .then((rows) => {
        if (rows.length === 1) {
          return rows[0];
        }
        throw Boom.notFound();
      });
  },
  add(table, fields, data, dbApi = db) {
    return dbApi(table)
      .returning(fields)
      .insert(data)
      .then(([row]) => {
        return row;
      });
  },
  edit(table, fields, data, filter, dbApi = db) {
    return dbApi(table)
      .where(filter)
      .returning(fields)
      .update(data)
      .then(([row]) => {
        if (row) {
          return row;
        }
        throw Boom.notFound();
      });
  },
  del(table, filter, dbApi = db) {
    return dbApi(table)
      .where(filter)
      .del()
      .then((row) => {
        if (row === 0) {
          throw Boom.notFound();
        }
        return row;
      });
  },
  raw(sql, options, dbApi = db) {
    return dbApi.raw(sql, options)
      .then(res => res.rows);
  },
  rawOne(sql, options, dbApi = db) {
    return dbApi.raw(sql, options)
      .then((res) => {
        if (res.rows.length === 1) {
          return res.rows[0];
        }
        throw Boom.notFound();
      });
  },
};
