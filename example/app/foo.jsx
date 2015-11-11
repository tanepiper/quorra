'use strict';

const React = require('react');

const Foo = React.createClass({
  render() {
    return (
      <div className="foo">
        OMG A TOTALLY DIFFERENT ROUTE!
        {this.props.children}
      </div>
    )
  }
});

module.exports = Foo;
