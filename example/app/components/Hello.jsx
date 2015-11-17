'use strict';

const React = require('react');

module.export = React.createClass({

  componentWillMount() {

    return this.setState(typeof window !== 'undefined' ? window.__INITIAL_STATE__ : {});
  },

  getInitialState() {

    return Object.assign({}, this.props);
  },

  render() {

    return (
      <div className="hapi-react-route-welcome">
        <h1>{this.state.helloMessage}</h1>

        <div>
          <div>This is the hello page</div>
        </div>

        {this.props.children}
      </div>
    )
  }
});

