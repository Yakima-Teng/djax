# Djax

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[Looking for English documentation? Please click here.](./README.md)

在线Demo: [Djax](http://www.verysites.com/)

Djax是我对Dom & Ajax的简写。Djax是一个简单易上手的网站（多页应用）脚手架，通过它，你可以方便地进行传统的网页开发，自己操作DOM，对你的代码有更多的控制权，你也更知道自己在干什么。

Vue不错，Angualr挺好，React也很好。但是，它们的流行并不意味着所有的网站都需要用它们中的一个来进行开发。经典的用jQuery等js库操作DOM的“DOM流开发风格”也并不差。Djax就是这样一个适合“DOM流开发风格”的网站脚手架，它简单、轻盈，几乎没有什么二次学习成本——你需要知道的，基本上都是你已经知道了的。

## 说明

虽然这个代码仓库是我本人自己维护的，我也花了不少时间去优化它（你可以自己看commit记录），但是我不会王婆卖瓜。。。Djax只适用于并且也非常适用于简单的、需要考虑SEO的前台网站，比如一些企业站官网。

:warning: **也就是说，如果你打算开发诸如后台管理系统之类的网站的话，Djax并不适合。此类网站不需要考虑SEO，同时表单和列表比较多, 那么还是建议你使用Vue/React/Angular或者其他类似的MVWhateveryoulike框架。此类网站通常js代码量较大，需要借助这些框架来对代码结构进行一些有益的限制。**

## 支持

支持书写Pug、Sass、ES6。

## 自带的utils封装库

src/scripts/utils目录下封装了许多常用的小代码，可以直接拿来复用。这块直接内嵌到项目里而不是单独作为一个第三方js库引入，是为了让你可以直接根据需要自定义这块代码，你可以删掉不用的代码，添加你自己封装的代码。如果你有一套自己的js库，可以直接拿过来替换掉这里的内容。

## 项目架构设计

直接跑一下项目，阅读下项目根目录下的gulpfile.js代码，就能知道这个项目架构是如何的了。核心重点内容是，页面相关js、css、html都放在一起-_-。

## 安装

前提条件: Node.js(>=4.x, 6.x更好)、npm 3+、[Git](https://git-scm.com/)。

``` bash
$ git clone https://github.com/Yakima-Teng/djax.git
$ cd djax
$ npm install
$ npm run dev
```

如果你有自己心仪的项目名（比如"demo"这个项目名），你可以按下面这样类似的操作进行开发前的准备工作：

``` bash
$ git clone https://github.com/Yakima-Teng/djax.git demo
$ cd demo
$ npm install
$ npm run dev
```

这会将本仓库的master分支代码拉到你本地。

**本地服务默认会使用18080端口，服务启动成功后会自动打开您的浏览器访问前端页面。**

## 包含的命令

- `npm run dev`: 本地开发时使用，会带来相当不错的开发体验。

  - 当您更改文件内容时会自动刷新页面，无需您手动F5或command+R。

  - 保存文件时会自动使用ESLint检测代码风格，尽量避免一些简单的代码风格混乱导致的bug。

- `npm run build`: 与本地开发不同，该命令产生的文件是用于发布到服务器上的。

  - 压缩JavaScript。

  - 压缩HTML文件.

  - 压缩CSS文件.

- `npm run deploy`: 让发布变得更简单。

  - 将config-example.js文件重命名为“config.js”，并根据您的SSH账号进行相应的修改。

  - 当你想要通过FTP/SFTP工具上传文件到服务器上时，你可以直接敲一个“npm run deploy”命令，然后去泡杯咖啡。

- `npm run buildAndDeploy`: 一个命令糖。

  - 当你想要先执行`npm run build`，然后等前面这个命令执行结束后再执行`npm run deploy`的时候， 你可以直接用一个`npm run buildAndDeploy`命令替代。它们的作用效果是一样的，后者可以让你不用一直呆在屏幕面前傻等。

- `gulp imagemin`: 压缩图片。

- 更多命令详见package.json和gulpfile.js。

## 许可协议

[MIT](http://opensource.org/licenses/MIT)
