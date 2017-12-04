const gulp = require('gulp')
const sass = require('gulp-sass')
const cleanCSS = require('gulp-clean-css')
const browserSync = require('browser-sync').create()
const rename = require('gulp-rename')
const changed = require('gulp-changed')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const babel = require('gulp-babel')
const pug = require('gulp-pug')
const gulpif = require('gulp-if')
const scp = require('gulp-scp2')
const config = require('./config')
const appName = 'home'

gulp.task('pug-pages', () => {
  return gulp.src('./src/htmls/pages/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('./dist/htmls/pages'))
    .pipe(browserSync.stream())
})

gulp.task('sass', () => {
  return gulp.src(['./src/styles/**/*.scss', '!./src/styles/tools/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/styles'))
    .pipe(browserSync.stream())
})

gulp.task('js-pages', () => {
  return gulp.src(['./src/scripts/pages/*.js'])
    .pipe(changed('./dist/scripts/pages', { extension: '.min.js' }))
    .pipe(babel({ presets: ['env'] }))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./dist/scripts/pages'))
    .pipe(browserSync.stream())
})

// 对页面展现有较大潜在影响的放在head里优先加载
gulp.task('js-libs-before', () => {
  return gulp.src(['./src/scripts/libs/*.before.js'])
    .pipe(gulpif(file => file.history[0].indexOf('.min') === -1, babel({ presets: ['env'] })))
    .pipe(gulpif(file => file.history[0].indexOf('.min') === -1, uglify()))
    .pipe(concat('libs-before.js'))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./dist/scripts/libs'))
    .pipe(browserSync.stream())
})

// 对页面展现影响不太大的放在body结束标签前加载
gulp.task('js-libs-after', () => {
  return gulp.src(['./src/scripts/libs/*.after.js'])
    .pipe(gulpif(file => file.history[0].indexOf('.min') === -1, babel({ presets: ['env'] })))
    .pipe(gulpif(file => file.history[0].indexOf('.min') === -1, uglify()))
    .pipe(concat('libs-after.js'))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./dist/scripts/libs'))
    .pipe(browserSync.stream())
})

gulp.task('js-common', () => {
  return gulp.src(['./src/scripts/common/*.js'])
    .pipe(concat('common.js'))
    .pipe(babel({ presets: 'env' }))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./dist/scripts/common'))
    .pipe(browserSync.stream())
})

gulp.task('assets', () => {
  return gulp.src('./src/assets/**/*.*')
    .pipe(gulp.dest('./dist/assets'))
})

gulp.task('dev', ['pug-pages', 'sass', 'js-pages', 'js-libs-before', 'js-libs-after', 'js-common', 'assets'], () => {
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
    startPath: `/${appName}/htmls/pages/home.html`,
    meddleware: []
  })

  gulp.watch(['./src/assets/**/*.*'], ['assets'])
  gulp.watch(['./src/htmls/**/*.pug'], ['pug-pages'])
  gulp.watch(['./src/scripts/common/**/*.js'], ['js-common'])
  gulp.watch(['./src/scripts/libs/**/*.before.js'], ['js-libs-before'])
  gulp.watch(['./src/scripts/libs/**/*.after.js'], ['js-libs-after'])
  gulp.watch(['./src/scripts/pages/**/*.js'], ['js-pages'])
  gulp.watch(['./src/styles/**/*.scss'], ['sass'])
})

gulp.task('build', ['pug-pages', 'sass', 'js-pages', 'js-libs-before', 'js-libs-after', 'js-common', 'assets'], () => {
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
