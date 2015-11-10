'use strict';

const Hapi = require('hapi');
const Code = require('code');
const Lab = require('lab');
const Path = require('path');

const lab = exports.lab = Lab.script();


lab.experiment('Hapi React Handler', () => {

  let server;

  lab.beforeEach((done) => {
    server = new Hapi.Server();
    server.connection({ port: 9000 });

    server.register([{
      register: require('./../')
    }], (error) => {
      if (error) {
        return done(error);
      }

      server.route({
        method: 'GET',
        path: '/{route*}',
        handler: {
          react: {
            relativeTo: Path.join(__dirname, 'assets'),
            routerFile: 'router.jsx'
          }
        }
      });

      server.start(done);
    });
  });

  lab.afterEach((done) => {
    server.stop(done);
  });

  lab.test('Set up handler on route', (done) => {
    const options = {
      method: 'GET',
      url: '/foo'
    };

    server.inject(options, (response) => {
      Code.expect(response.payload).match(/Hapi React Handler/);
      done();
    });
  });

});
