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
const friendlyFormatter = require('eslint-friendly-formatter')
const del = require('del')
const autoprefixer = require('gulp-autoprefixer')
const browserify = require('gulp-browserify')
const gulpSequence = require('gulp-sequence')
const config = require('./config')
const appName = config.appName

const isDev = process.env.npm_lifecycle_script === 'gulp dev'

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
  return gulp.src(['./src/assets/**/*.png', './src/assets/**/*.jpg', './src/assets/**/*.jpeg', './src/assets/**/*.gif'])
    .pipe(gulp.dest('./src/assets/image-backup'))
})

gulp.task('imagemin', ['imageBackup'], () => {
  return gulp.src(['./src/assets/**/*.png', './src/assets/**/*.jpg', './src/assets/**/*.jpeg', './src/assets/**/*.gif'])
    .pipe(changed('./dist/assets', {}))
    .pipe(imagemin())
    .pipe(gulp.dest('./src/assets'))
})

gulp.task('pug:pagesRoot', () => {
  return gulp.src(['./src/htmls/pages/root/**/*.pug'])
    .pipe(pug({ pretty: true }))
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
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('./dist/htmls/pages'))
    .pipe(browserSync.stream())
})

gulp.task('pug', ['pug:pagesRoot', 'pug:pagesNotRoot'], () => {
  //
})

gulp.task('sass:global', () => {
  return gulp.src(['./src/styles/global/reset.scss', './src/styles/global/global.scss', './src/styles/global/fix.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 20 versions'],
      cascade: false
    }))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(concat('global.css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/styles/global'))
    .pipe(browserSync.stream())
})

gulp.task('sass:templates', () => {
  return gulp.src(['./src/htmls/templates/**/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 20 versions'],
      cascade: false
    }))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/styles/templates'))
    .pipe(browserSync.stream())
})

gulp.task('sass:components', () => {
  return gulp.src(['./src/htmls/components/**/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 20 versions'],
      cascade: false
    }))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/styles/components'))
    .pipe(browserSync.stream())
})

gulp.task('sass:pages', () => {
  return gulp.src(['./src/htmls/pages/**/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 20 versions'],
      cascade: false
    }))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/htmls/pages'))
    .pipe(browserSync.stream())
})

gulp.task('sass', ['sass:pages', 'sass:components', 'sass:templates', 'sass:global'], () => {
  //
})

gulp.task('js:pages', () => {
  return gulp.src(['./src/htmls/pages/**/*.js'])
    // 页面文件不要通过import引入外部文件增加文件体积，外部共用的东西都封装到utils里，所以这里用gulp-babel就行
    .pipe(babel())
    .pipe(gulpif(!isDev, uglify()))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./dist/htmls/pages'))
    .pipe(browserSync.stream())
})

gulp.task('js:utils', () => {
  return gulp.src(['./src/scripts/utils/index.js'])
    // utils相关文件会用import, export互相引用，需要用browserify的transform: ['babelify']，故无需再用gulp-babel
    // .pipe(babel())
    .pipe(browserify({ transform: ['babelify'] }))
    .on('error', console.log)
    .pipe(gulpif(!isDev, uglify()))
    .pipe(rename({
      basename: 'utils',
      extname: '.min.js'
    }))
    .pipe(gulp.dest('./dist/scripts/utils'))
    .pipe(browserSync.stream())
})

gulp.task('js:common', () => {
  return gulp.src(['./src/scripts/common/*.js'])
    .pipe(babel())
    .pipe(gulpif(!isDev, uglify()))
    .pipe(concat('common.js'))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./dist/scripts/common'))
    .pipe(browserSync.stream())
})

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
  for (let i = 0; i < 100; i++) {
    srcPathArr.push(srcPath.replace(prefix, prefix + '.' + (i < 10 ? '0' + i : '' + i)))
  }
  srcPathArr.push(srcPath)
  return gulp.src(srcPathArr)
    .pipe(gulpif(file => file.history[0].indexOf('.min.js') === -1, babel({ presets: ['env'] })))
    .pipe(gulpif(file => file.history[0].indexOf('.min.js') === -1 && !isDev, uglify()))
    .pipe(concat(concatingFileName))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./dist/scripts/libs'))
    .pipe(browserSync.stream())
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

gulp.task('lint:gulpfile', () => {
  return gulp.src(['./gulpfile.js'])
    .pipe(eslint('.eslintrc.js'))
    .pipe(eslint.format(friendlyFormatter))
    .pipe(eslint.failAfterError())
})

gulp.task('lint:config', () => {
  return gulp.src(['./config.js', './config-example.js'])
    .pipe(eslint('.eslintrc.js'))
    .pipe(eslint.format(friendlyFormatter))
    .pipe(eslint.failAfterError())
})

gulp.task('lint:utils', () => {
  return gulp.src(['./src/scripts/utils/**/*.js', './src/scripts/common/utils-*.js'])
    .pipe(eslint('.eslintrc.js'))
    .pipe(eslint.format(friendlyFormatter))
    .pipe(eslint.failAfterError())
})

gulp.task('lint:common', () => {
  return gulp.src(['./src/scripts/common/*.js', '!./src/scripts/common/utils-*.js'])
    .pipe(eslint('.eslintrc.js'))
    .pipe(eslint.format(friendlyFormatter))
    .pipe(eslint.failAfterError())
})

gulp.task('lint:pages', () => {
  return gulp.src(['./src/htmls/pages/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('lint', ['lint:gulpfile', 'lint:config', 'lint:utils', 'lint:common', 'lint:pages'], () => {
  // console.log('finished task: lint')
})

gulp.task('dev:before', (cb) => {
  gulpSequence('lint', ['assets', 'pug', 'sass', 'js'], cb)
})

gulp.task('dev', ['dev:before'], () => {
  console.log(`[${new Date()}]: ready to develop!`)
  browserSync.init({
    server: {
      baseDir: './',
      directory: true,
      routes: {
        [`/${appName}`]: 'dist'
      }
    },
    port: '18080',
    // startPath: `/${appName}/htmls/pages/root/home/page.html`,
    startPath: `/${appName}/index.html`,
    middleware: [
      proxy('/path/api', { target: 'http://111.22.333.4', changeOrigin: true })
    ]
  })

  gulp.watch(['./src/assets/**/*.*'], ['assets'])
  gulp.watch(['./src/htmls/pages/root/**/*.pug'], ['pug:pagesRoot'])
  gulp.watch(['./src/htmls/pages/**/*.pug', '!./src/htmls/pages/root/**/*.pug'], ['pug:pagesNotRoot'])
  gulp.watch(['./gulpfile.js'], ['lint:gulpfile'])
  gulp.watch(['./config.js', './config-example.js'], ['lint:config'])
  gulp.watch(['./src/scripts/utils/**/*.js', './src/scripts/common/utils-*.js'], ['js:utils', 'lint:utils'])
  gulp.watch(['./src/scripts/common/*.js', '!./src/scripts/common/utils-*.js'], ['js:common', 'lint:common'])
  gulp.watch(['./src/scripts/libs/auto.head.*.js'], ['js:libs:onHeadReady'])
  gulp.watch(['./src/scripts/libs/auto.doc.*.js'], ['js:libs:onDocumentReady'])
  gulp.watch(['./src/scripts/libs/auto.lazy.*.js'], ['js:libs:onLazy'])
  gulp.watch(['./src/htmls/pages/**/*.js'], ['js:pages', 'lint:pages'])
  gulp.watch(['./src/styles/global/**/*.scss'], ['sass:global'])
  gulp.watch(['./src/htmls/templates/**/*.scss'], ['sass:templates'])
  gulp.watch(['./src/htmls/components/**/*.scss'], ['sass:components'])
  gulp.watch(['./src/htmls/pages/**/*.scss'], ['sass:pages'])
  gulp.watch(['./src/styles/tools/**/*.scss'], ['sass'])
})

gulp.task('build:before', (cb) => {
  gulpSequence('lint', ['assets', 'pug', 'sass', 'js'], cb)
})

gulp.task('build', ['build:before'], () => {
  console.log(`[${new Date()}]: Finish building!`)
})

gulp.task('deploy', () => {
  return gulp.src(['./dist/**/*.*'])
    .pipe(scp({
      host: config.deploy.hostname,
      username: config.deploy.username,
      password: config.deploy.password,
      dest: config.deploy.dest
    }))
})
