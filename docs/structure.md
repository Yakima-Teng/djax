# Project Structure

``` bash
.
├── src/
│   └── assets/                 # static files such as images
|   │   ├── images/
|   │   └── ...
│   ├── htmls/
|   │   ├—— components/         # pug componenets with corresponding css files
|   │   ├—— pages/              # pug page with corresponding css files and js files
|   │   └—— templates/          # pug templates
│   ├── scripts/
|   │   ├—— common/             # global scripts used for each page
|   │   ├—— libs/               # third-party scripts that need concating
|   │   └—— utils/              # utility scripts
│   └── styles/
|   │   ├—— global/             # global styles used for each page
|   │   └—— tools/              # utility styles
├── .babelrc                    # babel config
├── .editorconfig               # indentation, spaces/tabs and similar settings for your editor
├── .eslintrc.js                # eslint config
├── .eslintignore               # eslint ignore rules
├── .gitignore                  # sensible defaults for gitignore
├── config-example.js           # config for app name, site title, site description, and configuration for deployment
├── gulpfile.js                 # gulp tasks
├── package.json                # build scripts and dependencies
└── README.md                   # default README file
```

### `src/assets/`

Files under this folder will just be copied to `dist` folder by gulp.

### `src/htmls/`

This folder is used to store page/components/templates-related source code.

#### components/

Pug components and related files.

#### pages/

Page-related files. Multily-level path is supported. If you want your .html files to be available in root path, just write them under `root` folder (`root` folder is handled differently from other folder names).

#### templates/

Pug templates and related files.

### `src/scripts/`

#### common/

*.js files under this folder will be concated into a single `common.js` file.

#### libs/

*.js files under this folder will be concated into three single files `libs-onheadready.js`, `libs-ondocumentready.js` and `libs-onlazy.js`.

Only filenames in this foder matches the following rules will be handled differently:

*(auto|hand).(doc|head|lazy).(Number).(filename)[.min].js*:

- Files tagged with `auto` will be automatically injected into html files after concatenation;
- Files tagged with `hand` will be concated into the final `libs-byhand.js` file, but you should inject it into your html files by hand;
- Files tagged with `doc` will be concated into the final `libs-ondocumentready.js` file;
- Files tagged with `head` will be concated into the final `libs-onheadready.js` file;
- Files tagged with `lazy` will be concated into the final `libs-onlazy.js` file;
- The `Number` tag is used to determine the concating sequence, file with less number will be concated first;
- `.min` is optional. Files with `.min` will not handled by babel and will not be uglified;

Files whose name do not match the above rule will not be handled by gulp, meaning they will stay in this folder silently untial you need them and then rename them.

#### utils/

Some utility functions are provided here. They are integrated into the `index.js' file. All files in this folders will be used to generate a single `utils.js` file.

### `src/styles/`

Almost all styles files that do not belong to third parties and are not page-specific should be placed under this folder.

#### global/

The following `.scss` files under this folder will be concated (in the order `reset.scss`, `global.scss` and then `fix.scss`) into a single `global.css` file.

- reset.scss: css reset styles here.

- global.scss: global styles here.

- fix.scss: it's common to modify styles of third-party, and it's supposed that you put your modifying styles here.


#### tools/

- *.scss: sass utility files, you can use them in your sass files.

### `config-example.js`

An example file for some configurations about SSH account, app name, site title, site description and etc. You should rename it to be `config.js`, and fill your own content.

### `package.json`

The NPM package meta file that contains all the build dependencies and [build commands](commands.md).
