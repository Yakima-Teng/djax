# djax

Just a gulp boilerplate. Issues are welcome!

> A full-featured gulp setup with refresh-on-change, lint-on-save, http proxy, and etc.

> This template is used by djax-cli: `djax init default my-project`

## Documentation

- [For this template](https://yakima-teng.github.io/djax/): common questions specific to this template are answered and each part is described in greater detail
- [For djax-cli](https://github.com/Yakima-Teng/djax-cli): general information about how to work with djax-cli, not specific to this template

## Usage

This is a project template for [djax-cli](https://github.com/Yakima-Teng/djax-cli). **It is recommended to use npm 3+ for a more efficient dependency tree.**

``` bash
$ npm install -g djax-cli
$ djax init default my-project
# you can also use the below command to replace the above one
$ djax init djax my-project
$ cd my-project
$ npm install
$ npm run dev
```

This will scaffold the project using the `master` branch. If you wish to use the latest version of the template, do the following instead:

``` bash
$ djax init default#dev my-project
```

:warning: **The develop branch is not considered stable and can contain bugs or not build at all, so use at your own risk.**

The development server will run on port 8080 by default. If that port is already in use on your machine, the next free port will be used.

### Fork It And Make Your Own

You can fork this repo to create your own boilerplate, and use it with `djax-cli`:

``` bash
djax init username/repo my-project
```
