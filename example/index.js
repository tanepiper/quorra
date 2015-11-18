'use strict';

const Hapi = require('hapi');
const Boom = require('boom');

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

  server.method('createPage', (html, initialState) => {
    return `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8"/>
          <title>Hapi React Router Example</title>
        </head>
        <body>
          <div id="app-mount">${html}</div>
          <script id="app-state">${initialState}</script>
          <!--<script src="/static/js/app.js"></script>-->
        </body>
    </html>
    `
  });

  server.method({name : 'getIndex', method: () => {
    return {title: 'Hapi React Router Index', message: 'Welcome to The Hapi React Router Example'};
  }});
  server.method({name : 'getHello', method: () => {
    return {title: 'Hapi React Router Hello', message: 'Well, hello there!'};
  }});
  server.method({name : 'getGoodbye', method: () => {
    return {title: 'Hapi React Router Goodbye', message: 'We are sad to see you go'};
  }});
  server.method({name : 'getAbout', method: () => {
    return { title: 'About', message: 'About message'};
  }});

  const props = {
    '/': 'getIndex',
    '/hello': 'getHello',
    '/goodbye': 'getGoodbye',
    '/about': 'getAbout'
  };

  server.route({
    method: 'GET',
    path: '/{route*}',
    handler: {
      react: {
        relativeTo: __dirname + '/app',
        router: 'routes/AppRoot.js',
        // This is a method of passing a layout.jsx file which will render with
        // the inner content returned by the handler
        //layout: 'layout.jsx',
        // This is an alternative method where you can output to a
        // static HTML being created server side
        layout: server.methods.createPage,
        props: props
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/api/{route*}',
    handler: (req, reply) => {
      if (props[`/${req.params.route}`]) {
        return reply(server.methods[props[`/${req.params.route}`]]());
      } else if (req.params.route === 'index') {
        return reply(server.methods[props['/']]());
      } else {
        return reply(Boom.notFound(`Route /${req.params.route} not found`));
      }
    }
  });

  server.start((error) => {
    if (error) {
      throw error;
    }
  });
});

