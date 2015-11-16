'use strict';

const React = require('react');

const App = React.createClass({
  componentWillMount() {
    return this.setState(typeof window !== 'undefined' ? window.__INITIAL_STATE__ : {});
  },
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
