'use strict';

const React = require('react');
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const IndexRoute = require('react-router').IndexRoute;

const App = require('./app.jsx');
const Hello = require('./hello.jsx');
const Goodbye = require('./goodbye.jsx');
const Foo = require('./foo.jsx');
const Links = require('./links.jsx');

// We have to pass a noop for server-side as window is not available in node
const createHistory = typeof window !== 'undefined' ? require('history/lib').createHistory : () => ({});

module.exports = <Router history={createHistory()}>
  <Route path="/" component={App}>
    <IndexRoute component={Links}/>
    <Route path="hello" component={Hello} />
    <Route path="goodbye" component={Goodbye} />
  </Route>
  <Route path="/foo" component={Foo}>
    <IndexRoute component={Links}/>
  </Route>
</Router>;
