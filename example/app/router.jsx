'use strict';

const React = require('react');
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const IndexRoute = require('react-router').IndexRoute;
const createHistory = require('history/lib').createHistory;

const App = require('./app.jsx');
const Hello = require('./hello.jsx');
const Goodbye = require('./goodbye.jsx');
const Foo = require('./foo.jsx');
const Links = require('./links.jsx');


// Note: This is a lazy implementation, cannot use createHistory on the
// server side
const isBrowser = typeof window !== 'undefined';

if (isBrowser) {
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
} else {
  module.exports = <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Links}/>
      <Route path="hello" component={Hello} />
      <Route path="goodbye" component={Goodbye} />
    </Route>
    <Route path="/foo" component={Foo}>
      <IndexRoute component={Links}/>
    </Route>
  </Router>;
}
