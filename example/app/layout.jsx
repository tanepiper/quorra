'use strict';

const React = require('react');

const Layout = React.createClass({
  displayName: 'Layout',

  render() {
    return (
      <html>
        <head>
          <title>{this.props.title || "Hapi React Handler"}</title>
        </head>
        <body>
        <div className="container" id="app-mount" dangerouslySetInnerHTML={{ __html: this.props.content }}></div>
        <script id="app-state" dangerouslySetInnerHTML={{ __html: this.props.state }}></script>
        </body>

      <script src="/static/js/app.js"></script>
      </html>
    );
  }
});

module.exports = Layout;
