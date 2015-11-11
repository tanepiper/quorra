'use strict';

const React = require('react');

const App = React.createClass({
  getInitialState() {
    return Object.assign({}, this.props);
  },

  render() {
    return (
      <div className="example">
        <h1>{this.state.indexMessage}</h1>
        {this.state.children}
      </div>
    )
  }
});

module.exports = App;
