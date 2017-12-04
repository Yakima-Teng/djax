# Djax

[Looking for English documentation? Please click here.](./README.md)

更多详细文档，请访问官方网站: [Djax](http://www.yxeye.com/djax)

Djax是我对Dom & Ajax的简写。Djax是一个简单易上手的网站脚手架，通过它，你可以方便地进行传统的网页开发，自己操作DOM，对你的代码有更多的控制权，你也更知道自己在干什么。

Vue不错，Angualr挺好，React也很好。但是，它们的流行并不意味着所有的网站都需要用它们中的一个来进行开发。经典的用jQuery等js库操作DOM的“DOM流开发风格”也并不差。Djax就是这样一个适合“DOM流开发风格”的网站脚手架，它简单、轻盈，几乎没有什么二次学习成本——你需要知道的，基本上都是你已经知道了的。

## 安装

前提条件: Node.js(>=4.x, 6.x更好)、npm 3+、[Git](https://git-scm.com/)。

``` bash
$ git clone https://github.com/Yakima-Teng/djax.git
$ cd djax
$ npm install
$ npm run dev
```

这会将本仓库的master分支代码拉到你本地。如果你希望用用最新的版本来尝尝鲜，可以按下面这样进行操作：

``` bash
$ git clone https://github.com/Yakima-Teng/djax.git
$ cd djax
## replace [localbranchname] with what your like
$ git checkout -b [localbranchname] origin/dev
$ npm install
$ npm run dev
```

:warning: **dev分支的代码是不稳定的、含有bug的可能性也比较高，甚至可能都是不可用的。不建议在生产环境使用，请自行评估风险。**

本地服务默认会使用18080端口，服务启动成功后会自动打开您的浏览器访问前端页面。

## 包含的命令

- `npm run dev`: 本地开发时使用，会带来相当不错的开发体验。

  - 当您更改文件内容时会自动刷新页面，无需您手动F5或command+R。

  - 保存文件时会自动使用ESLint检测代码风格，尽量避免一些简单的代码风格混乱导致的bug。

- `npm run build`: 与本地开发不同，该命令产生的文件是用于发布到服务器上的。

  - 压缩JavaScript。

  - 压缩HTML文件.

  - 压缩CSS文件.

  - 压缩Images.

- `npm run deploy`: 让发布变得更简单。

  - 将config-example.js文件重命名为“config.js”，并根据您的SSH账号进行相应的修改。

  - 当你想要通过FTP/SFTP工具上传文件到服务器上时，你可以直接敲一个“npm run deploy”命令，然后去泡杯咖啡。

- `npm run buildAndDeploy`: 一个命令糖。

  - 当你想要先执行`npm run build`，然后等前面这个命令执行结束后再执行`npm run deploy`的时候， 你可以直接用一个`npm run buildAndDeploy`命令替代。它们的作用效果是一样的，后者可以让你不用一直呆在屏幕面前傻等。

## 许可协议

[MIT](http://opensource.org/licenses/MIT)
