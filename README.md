# hapi-react-handler

This hapi plugin provides a route handler that taps into using react-router, allowing you to render isomorphic views.

### Usage

```
server.route({
  method: 'GET',
  path: '/{route*}',
  handler: {
    react: {
      relativeTo: Path.join(__dirname, 'assets'),
      routerFile: 'router.jsx',
      layout: 'layout.jsx',
      props: {
        title: 'Foobar'
      },
      state: server.state.mycookie
    }
  }
});
```

`Router.jsx` might look something like:

```
const React = require('react');
const Router = require('react-router').Router;
const Route = require('react-router').Route;

const App = require('./app.jsx');

module.exports = <Router>
  <Route path="/foo" component={App} />
</Router>;
```

`Layout.jsx` mighht look something like:

```
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
      </html>
    );
  }
});

module.exports = Layout;
```

