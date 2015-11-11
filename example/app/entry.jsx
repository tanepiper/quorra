'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

const Router = require('./router');
const AppComponent = require('./app.jsx');

const App = React.createFactory(AppComponent);

ReactDOM.render(Router, document.getElementById('app-mount'));
