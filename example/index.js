'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({ port: 9000 });

server.register([{
  register: require('../')
}, {
  register: require('inert')
}], (error) => {
  if (error) {
    throw error;
  }

  server.route({
    method: 'GET',
    path: '/static/{path*}',
    handler: {
      directory: {
        path: __dirname + '/public'
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/{route*}',
    handler: {
      react: {
        relativeTo: __dirname + '/app',
        routerFile: 'router.jsx',
        layout: 'layout.jsx'
      }
    }
  });

  server.start((error) => {
    if (error) {
      throw error;
    }
  });
});

