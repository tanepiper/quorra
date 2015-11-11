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

  lab.test('decorates reply', (done) => {

    server.inject('/foo', (response) => {

      Code.expect(response.statusCode).to.equal(200);
      Code.expect(response.request.response.variety).to.equal('react');
      done();
    });
  });

  lab.test('throws on server decoration root conflict', (done) => {

    Code.expect(() => {

      server.decorate('reply', 'react', () => { });
    }).to.throw('Reply interface decoration already defined: react');
    done();
  });
});


lab.experiment('Hapi React Handler with layout', () => {

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
            routerFile: 'router.jsx',
            layout: 'layout.jsx',
            props: {
              title: 'Foobar'
            }
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

      Code.expect(response.payload).match(/<title(.*?>Foobar)<\/title>/);
      Code.expect(response.payload).match(/Hapi React Handler/);
      done();
    });
  });
});

lab.experiment('Hapi React Handler specific path', () => {

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
        path: '/foo',
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

lab.experiment('Hapi React Handler sub-path', () => {

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
        path: '/bar/{route*}',
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
      url: '/bar/foo'
    };

    server.inject(options, (response) => {

      Code.expect(response.payload).match(/Hapi React Handler/);
      done();
    });
  });
});

lab.experiment('Hapi React Handler multiple sub-path', () => {

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
        path: '/bar/baz/{route*}',
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
      url: '/bar/baz/foo'
    };

    server.inject(options, (response) => {

      Code.expect(response.payload).match(/Hapi React Handler/);
      done();
    });
  });
});
