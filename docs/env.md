# Environment Variables

Sometimes it is practical to distinguish between different environment. In `gulpfile.js`, we use this code to judge whether you are use command `npm run dev` to start this project for development purpose.

```js
const isDev = process.env.npm_lifecycle_script === 'gulp dev'
```

So then we can judge whether or not to minify html, javascript or css files.
