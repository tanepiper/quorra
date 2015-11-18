'use strict';

const Path = require('path');
const Joi = require('joi');
const Boom = require('boom');
const Hoek = require('hoek');

const React = require('react');
const match = require('react-router').match;
const RoutingContext = require('react-router').RoutingContext;

let internals = {
  renderToString: require('react-dom/server').renderToString,
  renderToStaticMarkup: require('react-dom/server').renderToStaticMarkup
};

internals.schema = Joi.alternatives([
  Joi.object({
    relativeTo: Joi.string().required(),
    router: Joi.string().required(),
    layout: Joi.alternatives(Joi.string(), Joi.func()).optional(),
    props: Joi.alternatives(Joi.object(), Joi.func()).optional(),
    stateVar: Joi.string().optional(),
    renderMethod: Joi.string().optional()
  })
]);

exports.handler = (route, options) => {

  let settings = Joi.attempt(options, internals.schema, 'Invalid react handler options (' + route.path + ')');

  // Required properties
  settings.relativeTo = options.relativeTo;
  settings.router =  Path.normalize(Hoek.isAbsolutePath(options.router) ?
    options.router : Path.join(settings.relativeTo, options.router));

  settings.props = options.props || {};

  settings.stateVar = options.stateVar || false;

  if (options.layout) {
    if (typeof options.layout === 'function') {
      settings.layout = options.layout;
    } else {
      settings.layout = Path.normalize(Hoek.isAbsolutePath(options.layout) ? options.layout : Path.join(settings.relativeTo, options.layout));
    }
  }

  settings.renderMethod = options.renderMethod || 'renderToString';

  Hoek.assert(typeof settings.relativeTo === 'string', 'Relative path of react files must be set', route.path);
  Hoek.assert(typeof settings.router === 'string', 'Router file must be set', route.path);

  return (request, reply) => {

    return reply(exports.response(settings, request));
  };
};

exports.response = (options, request) => {

  // Here be dragons - we have to remove the fingerprint for paths that are set
  // up under a specific route like /bar/{route*}
  let path;
  const fingerPrintCheck = request.route.fingerprint.split('#');
  path = fingerPrintCheck.length > 1 ? request.path.replace(fingerPrintCheck[0], '/') : request.path;

  const source = Object.assign({}, options, {
    path: path,
    options: options,
    props: options.props[path] && request.server.methods[options.props[path]] ?
      request.server.methods[options.props[path]](request) : false
  });

  return request.generateResponse(source, { variety: 'react', marshal: internals.marshal });
};

internals.marshal = (response, next) => {

  let routes = require(response.source.router);
  routes = routes.default || routes;

  match({ routes, location: response.source.path }, (error, redirectLocation, renderProps) => {

    if (error) {
      next(Boom.wrap(error));
    } else if (redirectLocation) {
      next.redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      internals.prepare(response, renderProps, next);
    } else {
      next(Boom.notFound('Not Found'));
    }
  })
};


internals.prepare = (response, renderProps, next) => {

  const content = internals[response.source.renderMethod](<RoutingContext {...renderProps} createElement={
    (Component, props) => {
      return <Component {...props} {...response.source.props} />;
    }
  } />);

  if (response.source.layout) {

    // Layout is a function, signature is (content, props)
    if (typeof response.source.layout === 'function') {
      return next(null, response.source.layout(content, `window.${response.source.stateVar || '__INITIAL_STATE__'} = ${JSON.stringify(response.source.props)};`));
    }

    // Layout is a JSX component
    let layoutComponent = require(response.source.layout);
    layoutComponent = layoutComponent.default || layoutComponent;

    const Element = React.createFactory(layoutComponent);

    const props = Object.assign({}, response.source.props, {
      content: content,
      initialState: `window.${response.source.stateVar || '__INITIAL_STATE__'} = ${JSON.stringify(response.source.props)};`
    });

    const layoutOutput = internals[response.source.renderMethod](Element(props));

    return next(null, layoutOutput);
  }

  return next(null, content);
};
