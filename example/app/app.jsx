'use strict';

const React = require('react');

const App = React.createClass({
  render() {
    return (
      <div className="example">
        Welcome to the Hapi React Handler example
        {this.props.children}
      </div>
    )
  }
});

module.exports = App;
