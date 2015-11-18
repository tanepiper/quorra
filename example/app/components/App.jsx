'use strict';

const React = require('react');

module.exports = React.createClass({

  getInitialState() {

    return Object.assign({}, this.props);
  },

  componentDidMount: function () {
    fetch('/api/index').then((data) => {
      return data.json()
    }).then((json) => {
      this.setState(json);
    })
  },

  render() {

    return (
      <div className="hapi-react-route-welcome">
        <h1>{this.state.message}</h1>

        <div>
          <div>This example shows how you can create an isomorphic app with Hapi and React-Router</div>
        </div>

        {this.props.children}
      </div>
    )
  }
});

