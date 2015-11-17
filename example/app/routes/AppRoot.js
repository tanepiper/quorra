'use strict';

const App = require('./../components/App.jsx');
const About = require('./../components/App.jsx');
const Goodbye = require('./../components/App.jsx');
const Hello = require('./../components/App.jsx');
const Links = require('./../components/Links.jsx');

module.exports = [{
  path: '/',
  component: App,
  indexRoute: { component: Links },
  childRoutes: [{
    path: 'about', component: About, indexRoute: { component: Links }
  }, {
    path: 'hello', component: Hello, indexRoute: { component: Links }
  }, {
    path: 'goodbye', component: Goodbye, indexRoute: { component: Links }
  }]
}];
