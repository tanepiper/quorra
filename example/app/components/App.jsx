'use strict';

const React = require('react');

module.exports = React.createClass({

  componentWillMount() {

    return this.setState(typeof window !== 'undefined' ? window.__INITIAL_STATE__ : {});
  },

  getInitialState() {

    return Object.assign({}, this.props);
  },

  render() {

    return (
      <div className="hapi-react-route-welcome">
        <h1>{this.state.indexMessage}</h1>

        <div>
          <div>This example shows how you can create an isomorphic app with Hapi and React-Router</div>
        </div>

        {this.props.children}
      </div>
    )
  }
});

