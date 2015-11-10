'use strict';

const Path = require('path');
const Joi = require('joi');
const Boom = require('boom');
const Hoek = require('hoek');

const React = require('react');
const renderToString = require('react-dom/server').renderToString;
const match = require('react-router').match;
const RoutingContext = require('react-router').RoutingContext;

let internals = {};

internals.schema = Joi.alternatives([
  Joi.object({
    relativeTo: Join.string(),
    routerFile: Joi.string()
  })
]);

exports.handler = (route, options) => {

  let settings = Joi.attempt(options, internals.schema, 'Invalid react handler options (' + route.path + ')');

  settings.relativeTo = options.relativeTo;
  settings.routerFile = /\.jsx$/.test(settings.routerFile) ? settings.routerFile : settings.routerFile + '.jsx';

  Hoek.assert(typeof settings.relativeTo !== 'string', 'Relative path of react files must be set', route.path);
  Hoek.assert(typeof settings.routerFile !== 'string', 'Router file must be set', route.path);

  return (request, reply) => {
    return reply(exports.response(settings, request));
  };
};

exports.response = (options, request, _preloaded) => {

  options = options || {};

  var source = {
    path: request.path,
    router: Path.join(options.relativeTo, options.routerFile),
    settings: options,
    stat: null,
    fd: null
  };

  var prepare = _preloaded ? null : internals.prepare;

  return request.generateResponse(source, { variety: 'react', marshal: internals.marshal });

};

internals.marshal = function (response, next) {

  const routes = require(response.source.router);

  match({ routes, location: response.source.path }, (error, redirectLocation, renderProps) => {
    if (error) {
      next(Boom.wrap(error));
    } else if (redirectLocation) {
      next.redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      next(null, renderToString(<RoutingContext {...renderProps} />));
    } else {
      next(Boom.notFound('Not Found'));
    }
  })

};
