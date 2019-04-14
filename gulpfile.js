'use strict'
/****************************************************************************************************/
//PLUGINS
/****************************************************************************************************/
const {src, dest, lastRun, task, watch, series, parallel} = require('gulp')

/*Плагины для HTML*/
const htmlmin = require('gulp-htmlmin')
const validator = require('gulp-w3c-html-validator')

/*Плагины для PostCSS*/
const postcss = require('gulp-postcss')
const csso = require('postcss-csso')
const autoprefixer = require('autoprefixer')
const mqp = require('css-mqpacker')

/*Плагины для Less*/
const less = require('gulp-less')

/*Плагины для обработки графики*/
const imagemin = require('gulp-imagemin')
const svgSymbols = require('gulp-svg-symbols')

/*Плагины для обработки сторонних библиотек*/
const mainNpmFiles = require('npmfiles')

/*Плагины для обработки JavaScript*/
const webpack = require('webpack')
const gulpwebpack = require('webpack-stream')

/*Технические плагины для оптимизации работы gulp*/
const plumber = require('gulp-plumber')
const newer = require('gulp-newer')
const gulpIf = require('gulp-if')
const flatten = require('gulp-flatten')
const remember = require('gulp-remember')
const cached = require('gulp-cached')
const path = require('path')
const del = require('del')
const debug = require('gulp-debug')

/*Плагин для синхронизации кода в браузерах*/
const browserSync = require('browser-sync').create()

/****************************************************************************************************/
//PATHS AND SETTINGS
/****************************************************************************************************/
const outputPaths = {
  html: 'build/',
  css: 'build/assets/css/',
  js: 'build/assets/js/',
  img: 'build/assets/',
  libs: 'build/assets/libs/',
  fonts: 'build/assets/fonts/',
  svgSprite: 'build/assets/img/svg'
}

/****************************************************************************************************/
//HTML task
/****************************************************************************************************/
const html = () =>
  src('src/*.html', {since: lastRun('html')})
    .pipe(plumber())
    // .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(dest(path.resolve()))
    .pipe(browserSync.stream())

/****************************************************************************************************/
//HTML validation task
/****************************************************************************************************/
const validation = () =>
  src('build/*.html')
    .pipe(validator())
    .pipe(validator.reporter())

/****************************************************************************************************/
//CSS task
/****************************************************************************************************/
const css = () =>
  src('src/css/style.less', {sourcemaps: true})
    .pipe(plumber())
    .pipe(less())
    // .pipe(postcss([
    //   autoprefixer(),
    //   mqp(),
    //   csso({restructure: false, comments: false})
    // ]))
    .pipe(dest(outputPaths.css, {sourcemaps: '.'}))
    .pipe(browserSync.stream())

/****************************************************************************************************/
//JS task
/****************************************************************************************************/
const js = () =>
  src('src/js/main.js')
    .pipe(plumber())
    .pipe(gulpwebpack(require('./webpack.config.js'), webpack))
    .pipe(dest(outputPaths.js))
    .pipe(browserSync.stream())

/****************************************************************************************************/
//LIBS task
/****************************************************************************************************/
const libs = () =>
  src(mainNpmFiles(), {base: './node_modules'})
    .pipe(flatten({includeParents: 1}))
    .pipe(newer(outputPaths.libs))
    .pipe(dest(outputPaths.libs))

/****************************************************************************************************/
//FONTS task
/****************************************************************************************************/
const fonts = () =>
  src('src/fonts/**/*.*')
    .pipe(newer(outputPaths.fonts))
    .pipe(dest(outputPaths.fonts))

/****************************************************************************************************/
//IMG task (jpg,png,gif,webp)
/****************************************************************************************************/
const img = () =>
  src(['src/img/**/*.*', 'src/images/**/*.*'], {base: 'src'})
    .pipe(newer(outputPaths.img))
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({removeViewBox: false, collapseGroups: true})
    ]))
    .pipe(dest(outputPaths.img))

/****************************************************************************************************/
//SVG sprite icons
/****************************************************************************************************/
const svgicons = () =>
  src('src/img/svg/icons/*.svg')
    .pipe(cached('svg:icons'))
    .pipe(remember('svg:icons'))
    .pipe(svgSymbols({templates: ['default-svg']}))
    .pipe(dest(outputPaths.svgSprite))

/****************************************************************************************************/
//WATCHERS
/****************************************************************************************************/
const watchers = (cb) => {
  watch('src/*.html', html).on('unlink', (filepath) => {
    let filePathFromSrc = path.relative(path.resolve('src/'), filepath)
    let destFilePath = path.resolve(path.resolve(), filePathFromSrc)
    del.sync(destFilePath)
  })
  watch('src/css/**/*.less', css)
  watch('src/js/**/*.js', js)
  watch('src/**/*.{jpg,png,gif,webp,svg}', img).on('unlink', (filepath) => {
    let filePathFromSrc = path.relative(path.resolve('src/'), filepath)
    let destFilePath = path.resolve(outputPaths.img, filePathFromSrc)
    del.sync(destFilePath)
  })
  watch('src/img/svg/icons/*.svg', svgicons).on('unlink', (filepath) => {
    remember.forget('svg:icons', path.resolve(filepath))
    delete cached.caches['svg:icons'][path.resolve(filepath)]
  })
  watch('src/fonts/**/*.*', fonts).on('unlink', (filepath) => {
    let filePathFromSrc = path.relative(path.resolve('src/fonts'), filepath)
    let destFilePath = path.resolve(outputPaths.fonts, filePathFromSrc)
    del.sync(destFilePath)
  })
  cb()
}

/****************************************************************************************************/
//BROWSER-SYNC task
/****************************************************************************************************/
const serve = (cb) => {
  browserSync.init({
   proxy:'practicepsd.loc',
    open: false,
    notify: true
  })
  cb()
}

/****************************************************************************************************/
//EXPORT TASKS
/****************************************************************************************************/
exports.html = html
exports.validation = validation
exports.css = css
exports.js = js
exports.libs = libs
exports.fonts = fonts
exports.img = img
exports.sprite = svgicons
exports.watchers = watchers
exports.serve = serve

/****************************************************************************************************/
//GLOBAL TASKS
/****************************************************************************************************/
task('build', parallel(html, css, js, libs, fonts, img, svgicons))
exports.dev = series('build', parallel(watchers, serve, validation))
