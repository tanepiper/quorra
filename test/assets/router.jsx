'use strict';

const React = require('react');
const Router = require('react-router').Router;
const Route = require('react-router').Route;

const App = require('./app.jsx');

module.exports = <Router>
  <Route path="/foo" component={App} />
</Router>;
