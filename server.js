'use strict';
// Node utils
const Path = require('path');
// NPM
const Hapi = require('@Hapi/hapi');
const Inert = require('@Hapi/inert');
const Vision = require('@Hapi/vision');
const NunjucksHapi = require('nunjucks-hapi');
// & @hapi/boom
const Blipp = require('blipp');
// Custom modules
const FirebaseScheme = require('./firebase-auth-scheme');
// Routes
const Routes = require('./routes');


// - move to module
const validate = async (request) => {
  const isValid = true;
  const credentials = { id: '2133d32a', name: 'John Doe' };
  return { isValid, credentials };
};


// Create server
const server = Hapi.server({
  host: 'localhost',
  port: 3000,
  routes: {
    files: {
      relativeTo: Path.join(__dirname, 'public'),
    }
  },
    //cors: true
});


// Configure server
const init = async () => {
    await server.register([Inert, Vision, Blipp, FirebaseScheme]);
    server.auth.strategy('sso', 'firebase', { validate });
    server.views({
      engines: { njk: NunjucksHapi },
      relativeTo: __dirname,
      path: "templates",
      isCached: false,
    });
    server.route(Routes);

    try {
      await server.start();
    } catch (err) {
      console.log(err);
      process.exit(1);
    }

    console.log('Server running on %s', server.info.uri);
};


// Start server
init();