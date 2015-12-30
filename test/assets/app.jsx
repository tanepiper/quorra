'use strict';

const React = require('react');

const App = React.createClass({
  render() {
    return (
      <div className="foo">Hapi React Handler {this.props.id}</div>
    )
  }
});

module.exports = App;
