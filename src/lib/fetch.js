import queryString from 'query-string';
import { omitBy, startsWith, isUndefined } from 'lodash';

import config from '../client-config';

export default function handledFetch(path, options) {
  return fetch(path, options)
    .then((res) => {
      if (res.status >= 400) {
        const err = new Error('Bad response from server');
        err.status = res.status;
        const contentType = res.headers.get('content-type');

        if (startsWith(contentType, 'application/json')) {
          return res.json()
          .then((content) => {
            err.content = content;
            throw err;
          });
        }

        return res.text()
        .then((content) => {
          err.content = content;
          throw err;
        });
      }
      return res;
    });
}

export function apiFetch(path, options = {}) {
  let qs = '';
  if (typeof options.body === 'object' && !(options.body instanceof FormData)) {
    options.body = JSON.stringify(options.body);
  }

  if (options.query) {
    const query = omitBy(options.query, isUndefined);
    qs = `?${queryString.stringify(query)}`;
  }
  Object.assign(options, { credentials: 'include' });

  return handledFetch(`${config.API_URL}${path}${qs}`, options)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      return true;
    });
}
