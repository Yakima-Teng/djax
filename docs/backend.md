# Developing with Backend API

If you are building a purely-static app (one that is deployed separately from the backend API), then you probably don't even need to read this file. However, if you want to integrate this template with existing backend APIs, you can edit `gulpfile.js` to proxy http request to the target server.

Let's take a look at the default `gulpfile.js`:

``` js
// gulpfile.js
'use strict'

gulp.task('dev', ['dev:before'], () => {

  browserSync.init({
    server: {
      baseDir: './',
      directory: true,
      routes: {
        [`/${appName}`]: 'dist'
      }
    },
    port,
    // startPath: `/${appName}/htmls/pages/root/home/page.html`,
    startPath: `/${appName}/index.html`,
    middleware: [
      proxy('/path/api', { target: 'http://111.22.333.4', changeOrigin: true })
    ]
  })

})
```

Inside the gulp task `dev`, we passed some configuration to configure the dev server.

## `server.baseDir`

Define the root directory for the frontend project in the dev server.

## `server.directory`

When set to `true`, you will see files in specific directory listed to you in case that no single file is matched.

## `server.routes`

For each element in the server.routes array:

- The key is the url to match;

- The value is which folder to serve (relative to your current working directory).

## `port`

Specify the port to use for the dev server. Default value is 3000. In the default `gulpfile.js`, we would use 8080 as the value of `port` if 8080 is available, otherwise port value like 8081, 8082 and etc. will be employed.

## `startPath`

Open the first browser window at the URL specified by `startPath`.

## `middleware`

Inside `middleware` section, we passed an array to define http proxy rule.

For more information about how to define proxy rules for the dev server, see [API Proxying During Development](proxy.md).
