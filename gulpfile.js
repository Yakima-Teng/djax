const gulp = require('gulp')
const sass = require('gulp-sass')
const cleanCSS = require('gulp-clean-css')
const browserSync = require('browser-sync').create()
const proxy = require('http-proxy-middleware')
const rename = require('gulp-rename')
const changed = require('gulp-changed')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const babel = require('gulp-babel')
const pug = require('gulp-pug')
const imagemin = require('gulp-imagemin')
const gulpif = require('gulp-if')
const scp = require('gulp-scp2')
const eslint = require('gulp-eslint')
const gulpdata = require('gulp-data')
const friendlyFormatter = require('eslint-friendly-formatter')
const del = require('del')
const autoprefixer = require('gulp-autoprefixer')
const browserify = require('gulp-browserify')
const portfinder = require('portfinder')
const gulpSequence = require('gulp-sequence')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const through2 = require('through2')
const config = require('./config')
const appName = config.appName

const isDev = process.env.npm_lifecycle_script === 'gulp dev'

const store = {
  defaultSiteTitle: config.defaultSiteTitle,
  defaultSiteDescription: config.defaultSiteDescription,
  versionQuery: (() => {
    // 这里定义的全局范围可用的version是用来追加到内容比较会变的js和css文件资源路径后面减少缓存影响用的
    const date = new Date()
    const yyyy = date.getFullYear()
    const mm = (1 + date.getMonth()) > 9 ? ('' + (1 + date.getMonth())) : ('0' + (1 + date.getMonth()))
    const dd = date.getDate() > 9 ? ('' + date.getDate()) : ('0' + date.getDate())
    const version = yyyy + '-' + mm + '-' + dd + '_' + date.valueOf()
    return '?v=' + version
  })()
}

gulp.task('clean', () => {
  return del([
    'dist/**/*'
  ])
})

gulp.task('assets', () => {
  return gulp.src('./src/assets/**/*.*')
    .pipe(changed('./dist/assets', {}))
    .pipe(gulp.dest('./dist/assets'))
})

gulp.task('cleanImageBackup', () => {
  return del([
    'src/assets/image-backup/**/*'
  ])
})

gulp.task('imageBackup', ['cleanImageBackup'], () => {
  return gulp.src(['./src/assets/**/*.{png,jpg,jpeg,gif,ico}'])
    .pipe(gulp.dest('./src/assets/image-backup'))
})

gulp.task('imagemin', ['imageBackup'], () => {
  return gulp.src(['./src/assets/**/*.{png,jpg,jpeg,gif,ico}'])
    .pipe(changed('./dist/assets', {}))
    .pipe(imagemin())
    .pipe(gulp.dest('./src/assets'))
})

gulp.task('pug:pagesRoot', () => {
  return gulp.src(['./src/htmls/pages/root/**/*.pug'])
    .pipe(gulpdata(file => ({ store })))
    .pipe(pug({ pretty: isDev }))
    .pipe(rename(path => {
      path.basename = path.dirname
      path.dirname = ''
      path.extname = '.html'
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream())
})

gulp.task('pug:pagesNotRoot', () => {
  return gulp.src(['./src/htmls/pages/**/*.pug', '!./src/htmls/pages/root/**/*.pug'])
    .pipe(gulpdata(file => ({ store })))
    .pipe(pug({ pretty: isDev }))
    .pipe(gulp.dest('./dist/htmls/pages'))
    .pipe(browserSync.stream())
})

gulp.task('pug', ['pug:pagesRoot', 'pug:pagesNotRoot'], () => {
  //
})

/**
 * gulp-if插件不支持传函数，但是有时候我们并不希望trueChild/falseChild在condition不匹配时也触发，这会带来污染
 * 比如condition为false，trueChild为test()，则即便我们希望condition为false时不执行test，它都已经执行了
 * @param condition
 * @param trueChild
 * @param falseChild
 * @param minimatchOptions
 * @returns {*}
 */
function clerverGulpif (condition, trueChild, falseChild, minimatchOptions) {
  condition = !!condition
  if (typeof trueChild === 'function') {
    trueChild = condition ? trueChild() : through2.obj()
  }
  if (typeof falseChild === 'function') {
    falseChild = condition ? through2.obj() : falseChild()
  }
  return gulpif(condition, trueChild, falseChild, minimatchOptions)
}

function doSassTask (arrSrc, strDest, concatFileName) {
  return gulp.src(arrSrc)
    .pipe(sass({
      includePaths: ['.']
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 20 versions'],
      cascade: false
    }))
    .pipe(cleanCSS({
      compatibility: 'ie8',
      format: isDev ? 'beautify' : ''
    }))
    .pipe(clerverGulpif(!!concatFileName, concat.bind(this, concatFileName)))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(strDest))
    .pipe(browserSync.stream())
}

gulp.task('sass:global', () => {
  return doSassTask(['./src/styles/global/{reset,global,fix}.scss'], './dist/styles/global', 'global.css')
})

gulp.task('sass:templates', () => {
  return doSassTask(['./src/htmls/templates/**/*.scss'], './dist/styles/templates')
})

gulp.task('sass:components', () => {
  return doSassTask(['./src/htmls/components/**/*.scss'], './dist/styles/components')
})

gulp.task('sass:pages', () => {
  return doSassTask(['./src/htmls/pages/**/*.scss'], './dist/htmls/pages')
})

gulp.task('sass', ['sass:pages', 'sass:components', 'sass:templates', 'sass:global'], () => {
  //
})

gulp.task('js:pages', () => {
  return gulp.src(['./src/htmls/pages/**/*.js'])
    .pipe(changed('./dist/htmls/pages', { extension: '.min.js' }))
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    // 页面文件不要通过import引入外部文件增加文件体积，外部共用的东西都封装到utils里，所以这里用gulp-babel就行
    .pipe(babel())
    .pipe(gulpif(!isDev, uglify()))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./dist/htmls/pages'))
    .pipe(browserSync.stream())
})

gulp.task('js:utils', () => {
  return gulp.src(['./src/scripts/utils/index.js'])
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    // utils相关文件会用import, export互相引用，需要用browserify的transform: ['babelify']，故无需再用gulp-babel
    // .pipe(babel())
    .pipe(browserify({ transform: ['babelify'] }))
    .pipe(gulpif(!isDev, uglify()))
    .pipe(rename({
      basename: 'utils',
      extname: '.min.js'
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./dist/scripts/utils'))
    .pipe(browserSync.stream())
})

gulp.task('js:common', () => {
  return gulp.src(['./src/scripts/common/*.js'])
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(babel())
    .pipe(gulpif(!isDev, uglify()))
    .pipe(concat('common.js'))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./dist/scripts/common'))
    .pipe(browserSync.stream())
})

// 文件名排序后再进行合并处理（00-99）
function handleJSLibs (srcPath, concatingFileName) {
  const srcPathArr = []
  const prefix = (() => {
    if (srcPath.indexOf('libs/auto.head') !== -1) {
      return 'auto.head'
    } else if (srcPath.indexOf('libs/auto.doc') !== -1) {
      return 'auto.doc'
    } else if (srcPath.indexOf('libs/auto.lazy') !== -1) {
      return 'auto.lazy'
    } else if (srcPath.indexOf('libs/hand') !== -1) {
      return 'hand'
    }
  })()
  return gulp.src(srcPath)
    .on('data', file => {
      const filePath = file.history[0]
      const matches = filePath.split(prefix)[1].match(/[0-9]{2}/)
      const order = (matches && matches.length > 0) ? parseInt(matches[0]) : 0
      srcPathArr.push({
        order,
        filePath
      })
    })
    .on('end', function () {
      srcPathArr.sort((a, b) => a.order - b.order)
      return gulp.src(srcPathArr.map(item => item.filePath))
        .pipe(plumber({
          errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(gulpif(file => file.history[0].indexOf('.min.js') === -1, babel({ presets: ['env'] })))
        .pipe(gulpif(file => file.history[0].indexOf('.min.js') === -1 && !isDev, uglify()))
        .pipe(concat(concatingFileName))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(plumber.stop())
        .pipe(gulp.dest('./dist/scripts/libs'))
        .pipe(browserSync.stream())
    })
}

gulp.task('js:libs:onHeadReady', () => {
  return handleJSLibs('./src/scripts/libs/auto.head.*.js', 'libs-onheadready.js')
})

gulp.task('js:libs:onDocumentReady', () => {
  return handleJSLibs('./src/scripts/libs/auto.doc.*.js', 'libs-ondocumentready.js')
})

gulp.task('js:libs:onLazy', () => {
  return handleJSLibs('./src/scripts/libs/auto.lazy.*.js', 'libs-onlazy.js')
})

gulp.task('js:libs:byHand', () => {
  return handleJSLibs('./src/scripts/libs/hand.*.js', 'libs-byhand.js')
})

gulp.task('js:libs', ['js:libs:onHeadReady', 'js:libs:onDocumentReady', 'js:libs:onLazy', 'js:libs:byHand'], () => {
  // need do nothing here
})

gulp.task('js', ['js:pages', 'js:utils', 'js:common', 'js:libs'], () => {
  //
})

function doLintTask (arrFileSrc) {
  return gulp.src(arrFileSrc)
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(eslint('.eslintrc.js'))
    .pipe(eslint.format(friendlyFormatter))
    .pipe(gulpif(!isDev, eslint.failOnError()))
}

gulp.task('lint:gulpfile', () => {
  return doLintTask(['./gulpfile.js'])
})

gulp.task('lint:config', () => {
  return doLintTask(['./config.js', './config-example.js'])
})

gulp.task('lint:utils', () => {
  return doLintTask(['./src/scripts/{utils/**/*,common/utils-*}.js'])
})

gulp.task('lint:common', () => {
  return doLintTask(['./src/scripts/common/*.js', '!./src/scripts/common/utils-*.js'])
})

gulp.task('lint:pages', () => {
  return doLintTask(['./src/htmls/pages/**/*.js'])
})

gulp.task('lint', ['lint:gulpfile', 'lint:config', 'lint:utils', 'lint:common', 'lint:pages'], () => {
  // console.log('finished task: lint')
})

gulp.task('dev:before', (cb) => {
  gulpSequence('lint', ['assets', 'pug', 'sass', 'js'], cb)
})

function gulpWatch (arrFilesAndTasks) {
  arrFilesAndTasks.forEach(item => {
    gulp.watch(item[0], item[1])
  })
}

gulp.task('dev', ['dev:before'], () => {
  console.log(`[${new Date()}]: ready to develop!`)
  portfinder.basePort = process.env.PORT || 8080
  portfinder.getPortPromise()
    .then(port => {
      console.log(`[About Port]: port ${port} is employed for development purpose!`)
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
    .catch(err => {
      console.log(`[Error]: ${err.message}`)
    })

  gulpWatch([
    [['./src/assets/**/*.*'], ['assets']],
    [['./src/htmls/{pages/root/**/*,components/**/*_for_root,templates/**/*}.pug'], ['pug:pagesRoot']],
    [['./src/htmls/{pages/**/*,components/**/*,templates/**/*}.pug', '!./src/htmls/{pages/root/**/*,components/**/*_for_root}.pug'], ['pug:pagesNotRoot']],
    [['./gulpfile.js'], ['lint:gulpfile']],
    [['./config.js', './config-example.js'], ['lint:config']],
    [['./src/scripts/{utils/**/*,common/utils-*}.js'], ['js:utils', 'lint:utils']],
    [['./src/scripts/common/*.js', '!./src/scripts/common/utils-*.js'], ['js:common', 'lint:common']],
    [['./src/scripts/libs/auto.head.*.js'], ['js:libs:onHeadReady']],
    [['./src/scripts/libs/auto.doc.*.js'], ['js:libs:onDocumentReady']],
    [['./src/scripts/libs/auto.lazy.*.js'], ['js:libs:onLazy']],
    [['./src/htmls/pages/**/*.js'], ['js:pages', 'lint:pages']],
    [['./src/styles/global/**/*.scss'], ['sass:global']],
    [['./src/htmls/templates/**/*.scss'], ['sass:templates']],
    [['./src/htmls/components/**/*.scss'], ['sass:components']],
    [['./src/htmls/pages/**/*.scss'], ['sass:pages']],
    [['./src/styles/tools/**/*.scss'], ['sass']]
  ])
})

gulp.task('build:before', (cb) => {
  gulpSequence('lint', ['assets', 'pug', 'sass', 'js'], cb)
})

gulp.task('build', ['build:before'], () => {
  console.log(`[${new Date()}]: Finish building!`)
})

gulp.task('deploy', () => {
  return gulp.src(config.deploy.src)
    .pipe(scp({
      host: config.deploy.hostname,
      username: config.deploy.username,
      password: config.deploy.password,
      dest: config.deploy.dest,
      readyTimeout: 60000
    }))
})
