'use strict'


const Boom = require('@hapi/boom');
const Hoek = require('@hapi/hoek');


const internals = {};

exports.plugin = {
  name: 'firebase-auth',
  once: true,
  register(server, options) {
    server.auth.scheme('firebase', internals.implementation)
  }
};


internals.implementation = function (server, options) {

  Hoek.assert(options, 'Missing firebase auth strategy options');
  Hoek.assert(typeof options.validate === 'function', 'options.validate must be a valid function in firebase scheme');

  const settings = Hoek.clone(options);

  const scheme = {
      authenticate: async function (request, h) {

          const { isValid, credentials, response } = await settings.validate(request, h);

          if (response !== undefined) {
              return h.response(response).takeover();
          }

          if (!isValid) {
              return h.unauthenticated(Boom.unauthorized('Scheme not valid', 'Firebase', settings.unauthorizedAttributes), credentials ? { credentials } : null);
          }

          if (!credentials ||
              typeof credentials !== 'object') {

              throw Boom.badImplementation('Bad credentials object received for Firebase auth validation');
          }

          return h.authenticated({ credentials });
      }
  };

  return scheme;
};