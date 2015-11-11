'use strict';

// This plugin requires babel to handle some transpliling
require('babel-core/register')({
  presets: ['react', 'es2015']
});

const ReactHandler = require('./handler');

const registerPlugin = function (server, options, next) {

  server.handler('react', ReactHandler.handler);

  server.decorate('reply', 'react', function (path, responseOptions) {

    return this.response(ReactHandler.response(path, responseOptions, this.request));
  });

  return next();
};

registerPlugin.attributes = {

  pkg: require('./../package.json'),
  connections: false,
  once: true
};

module.exports = registerPlugin;
