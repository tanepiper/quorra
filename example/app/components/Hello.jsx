'use strict';

const React = require('react');

module.export = React.createClass({

  getInitialState() {

    return Object.assign({}, this.props);
  },

  componentDidMount: function () {
    fetch('/api/hello').then((data) => {
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
          <div>This is the hello page</div>
        </div>

        {this.props.children}
      </div>
    )
  }
});

