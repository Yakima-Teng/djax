# Djax

[在找中文文档？点此查看。](./README_CN.md)

For online demo, please refer to: [Djax](http://www.yxeye.com/djax/htmls/pages/index.html)

Djax is short for Dom & Ajax. It's a simple boilerplate for scaffolding traditionally websites (Multi-Page Application) where you are supposed to operate dom, where you more control over your code.

Vue is good, Angular is good, React is good, em... but who ever said that all websites should be made by these frontend frames? Anyway, Djax is simple and flexible, with almost no study cost -- what you should know is what you almost already know.

## Support

Pug, Sass, ES6 are supported.

## built-in utils javascript lib

A tiny javascript library is built in the project in src/scripts/utils folder, you can use it directly. It's included as source code instead of a third single-file .js file, in order for you to customize those code, you can delete useless code and add your own. Or you can replace the entire directory if you already have your own js library.

## Project structure design

You are strongly recommended to run this project by your self and then read the source code in gulpfile.js under the project root. The main care is that you should write page-related js, css, html together in one page folder.

## Installation

Prerequisites: Node.js(>=4.x, 6.x preferred), npm version 3+ and [Git](https://git-scm.com/).

``` bash
$ git clone https://github.com/Yakima-Teng/djax.git
$ cd djax
$ npm install
$ npm run dev
```

This will scaffold the project using the `master` branch. If you wish to use the lastst version of the template, do the following instead:

``` bash
$ git clone https://github.com/Yakima-Teng/djax.git
$ cd djax
## replace [localbranchname] with what your like
$ git checkout -b [localbranchname] origin/dev
$ npm install
$ npm run dev
```

:warning: **The dev branch is not considered stable and can contain bugs or not available at all, so use at your own risk.**

The development server will run on port 18080 by default.

## What's Included

- `npm run dev`: Try to give you a good development experience.

  - Auto refresh while you changes your files.

  - Lint-on-save with ESLint.

- `npm run build`: Production ready build.

  - JavaScript minified.

  - HTML minified.

  - CSS minified.

  - Images minified.

- `npm run deploy`: Make deployment more convenient.

  - Rename config-example.js as 'config.js' and change content according to your ssh accout.

  - Whenever you want to deploy your files under dist folder to the server, just run command `npm run deploy`, and wait. That's all.

- `npm run buildAndDeploy`: A convenient command.

  - When you want to run `npm run build`, and run `npm run deploy` after completion of the former command, you can just run `npm run buildAndDeploy` instead. It's just a sugar command.

- For more, please refer to package.json.

## License

[MIT](http://opensource.org/licenses/MIT)
