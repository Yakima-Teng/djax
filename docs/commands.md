# Build Commands

All build commands are executed via [NPM Scripts](https://docs.npmjs.com/misc/scripts). Some major commands are listed below. For more, please refer to `package.json` and `gulpfile.js`.

## `npm run dev`

> Starts a Node.js local development server. See [API Proxying During Development](proxy.md) for more details.

- Pug and sass is out of the box.
- Will auto-refresh the webpage while you changes your files.
- Lint-on-save with ESLint.

## `npm run build`

> Production ready build.

- JavaScript minified.
- HTML minified.
- CSS minified.

## `npm run deployToTestServer` / `npm run deployToProductionServer`

> Make deployment more convenient.

- To use these commands, you need to rename `config-example.js` as `config.js` and change content according to your ssh accout. Please be informed of that `config.js` is added to `.gitignore` by default, so you do not need to care about pushing private information to your remote repository.

- Whenever you want to deploy your files under dist folder to the server, just run command `npm run deployToTestServer` / `npm run deployToProductionServer`, and wait. That's all.

## `npm run buildAndDeployToTestServer` / `npm run buildAndDeployToProductionServer`

> A convenient command.

- When you want to run `npm run build`, and run `npm run deployToTestServer` / `npm run deployToProductionServer` after completion of the former command, you can just run `npm run buildAndDeployToTestServer` / `npm run buildAndDeployToProductionServer` instead. It's just a sugar command.

## `gulp imagemin`

> Minify images.

- This IO operation is often not a high-frequency operation and is time consuming, so it was not defined in the filed "scripts" in file package.json or integrated in commands such as `npm run dev` or `npm run build`. What's more, in order to keep source images, source images will be backed up before they are compressed.

## `npm run zip`

> Zip files to deploy.

- If you need to zip your files to a single .zip file, and delivery it to other people, you can run this command, and a .zip file will be generated in `zip` folder in the project root path. All files under `dist` folder (`dist` folder itself is not included) will be included.
