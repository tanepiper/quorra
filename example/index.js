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

  server.method('createPage', (html, initialState) => {
    console.log(html);
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

  server.route({
    method: 'GET',
    path: '/{route*}',
    handler: {
      react: {
        relativeTo: __dirname + '/app',
        routerFile: 'router.jsx',
        layout: 'layout.jsx',
        //layout: server.methods.createPage,
        props: {
          '/': 'getIndex',
          '/hello': 'getHello',
          '/goodbye': 'getGoodbye',
          '/foo': 'getFoo'
        }
      }
    }
  });

  server.start((error) => {
    if (error) {
      throw error;
    }
  });
});

