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
        layout: 'layout.jsx',
        props: {
          '/': 'getIndex',
          '/hello': 'getHello',
          '/goodbye': 'getGoodbye',
          '/foo': 'getFoo'
        }
      }
    }
  });

  server.method({name : 'getIndex', method: () => {
    return {title: 'Hapi React Router Index', indexMessage: 'Welcome to The Hapi React Router Example'};
  }});
  server.method({name : 'getHello', method: () => {
    return {title: 'Hapi React Router Hello', helloMessage: 'Well, hello there!'};
  }});
  server.method({name : 'getGoodbye', method: () => {
    return {title: 'Hapi React Router Goodbye', goodbyeMessage: 'We are sad to see you go'};
  }});
  server.method({name : 'getFoo', method: () => {
    return { title: 'OMG FOO!', fooMessage: 'Foo is the best bar'};
  }});

  server.start((error) => {
    if (error) {
      throw error;
    }
  });
});

