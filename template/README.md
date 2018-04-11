# {{ name }}

> {{ description }}

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[在找中文文档？点此查看。](./README_CN.md)

For online demo, please refer to: [Djax](http://www.verysites.com/)

Djax is short for Dom & Ajax. It's a simple boilerplate for scaffolding traditionally websites (Multi-Page Application) where you are supposed to operate dom, where you more control over your code.

Vue is good, Angular is good, React is good, em... but who ever said that all websites should be made by these frontend frames? Anyway, Djax is simple and flexible, with almost no study cost -- what you should know is what you almost already know.

## Notice

Although this repository is maintained by myself and I have taken really some time to improve this project (you can read the commit logs), I must say that Djax is only but also very appropriate for developing simple frontend websites such as some simple enterprise websites, where SEO (Search Engine Optimization) should be taken into consideration.

:warning: **That is to say, if you want to develop websites such as backend management platforms, it would be better to use Vue/React/Angular or other MVWhateveryyoulike javascript frames. Because SEO is often not the factor that should be taken into consideration in these cases, meanwhile forms and lists are very common and quantity of javascript code is usually very large so that some good restriction to code structure is required.**

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

If you have your own favorite project name (e.g. demo) in your plan, you can do similar things like below:

``` bash
$ git clone https://github.com/Yakima-Teng/djax.git demo
$ cd demo
$ npm install
$ npm run dev
```

This will scaffold the project using the `master` branch.

**The development server will run on port 8080 by default. If that port is already in use on your machine, the next free port will be used.**

## What's Included

- `npm run dev`: Try to give you a good development experience.

  - Auto refresh while you changes your files.

  - Lint-on-save with ESLint.

- `npm run build`: Production ready build.

  - JavaScript minified.

  - HTML minified.

  - CSS minified.

- `npm run deployToTestServer` / `npm run deployToProductionServer`: Make deployment more convenient.

  - Rename config-example.js as 'config.js' and change content according to your ssh accout.

  - Whenever you want to deploy your files under dist folder to the server, just run command `npm run deployToTestServer` / `npm run deployToProductionServer`, and wait. That's all.

- `npm run buildAndDeployToTestServer` / `npm run buildAndDeployToProductionServer`: A convenient command.

  - When you want to run `npm run build`, and run `npm run deployToTestServer` / `npm run deployToProductionServer` after completion of the former command, you can just run `npm run buildAndDeployToTestServer` / `npm run buildAndDeployToProductionServer` instead. It's just a sugar command.

- `gulp imagemin`: Minify images.

  - This IO operation is often not a high-frequency operation and is time consuming, so it was not defined in the filed "scripts" in file package.json or integrated in commands such as ```npm run dev``` or ```npm run build``. What's more, in order to keep source images, source images will be backed up before they are compressed.

- `npm run zip`: Zip files to deploy.

  - If you need to zip your files to a single .zip file, and delivery it to other people, you can run this command, and a .zip file will be generated in `zip` folder in the project root path. All files under `dist` folder (`dist` folder itself is not included) will be included.

- For more, please refer to package.json and gulpfile.js.

## License

[MIT](http://opensource.org/licenses/MIT)
