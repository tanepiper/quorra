'use strict';

const React = require('react');
const Link = require('react-router').Link;

module.exports = React.createClass({

  render() {

    return (
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/hello">Hello</Link></li>
          <li><Link to="/goodbye">Goodbye</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </div>
    )
  }
});

