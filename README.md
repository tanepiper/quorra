# hapi-react-handler

<a href="http://pebblecode.com"><img src="http://i.imgur.com/mat11pe.png" align="right" /></a>

This hapi plugin provides a route handler that taps into using react-router, allowing you to render isomorphic views.

**hapi-react-handler** is sponsored by [Pebble{code}](http://pebblecode.com)

### Example

To run the example code, first do `npm install @tanepiper/hapi-react-handler` to install all dependencies, then run the following commands:

```
> npm run webpack
> npm run example
```

Now go to [http://localhost:9000](http://localhost:9000) in your browser to see an isomorphic example.

### Usage

```
server.register([{
  register: require('@tanepiper/hapi-react-handler')
}], (error) => {
  if (error) {
    throw error;
  }

  server.route({
    method: 'GET',
    path: '/{route*}',
    handler: {
      react: {
        relativeTo: `${__dirname}/app`,
        router: 'routes.js',
        layout: 'layout.jsx' || 'myLayoutMethod',
        props: {
          '/': 'myIndexMethod',
          '/about': 'myAboutMethod'
        }
      }
    }
  });
});
```

#### Options

* `relativeTo`: The path to where your react-router application is located
* `router`: The router file that defines your routes and components
* `layout`: Either a path to a layout jsx file, or a method name that generates HTML
* `props`: An object or function that returns a mapping of paths to methods that return data. This
uses Hapi's in-build [`server.methods`](http://hapijs.com/tutorials/server-methods)

`Router.js` might look something like:

```
const App = require('./../components/App.jsx');
const About = require('./../components/App.jsx');
const Goodbye = require('./../components/App.jsx');
const Hello = require('./../components/App.jsx');
const Links = require('./../components/Links.jsx');

module.exports = [{
  path: '/', component: App, indexRoute: { component: Links }
}, {
  path: '/about', component: About, indexRoute: { component: Links }
}, {
  path: '/hello', component: Hello, indexRoute: { component: Links }
}, {
  path: '/goodbye', component: Goodbye, indexRoute: { component: Links }
}];
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

