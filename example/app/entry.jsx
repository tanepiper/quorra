'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const Router = require('react-router').Router;
const createHistory = require('history/lib').createHistory;

const Routes = require('./routes/AppRoot');

ReactDOM.render(<Router history={createHistory()} routes={Routes} />, document.getElementById('app-mount'));
