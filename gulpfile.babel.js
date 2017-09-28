'use strict';

//*** NPM PACKAGES ***\\
  // npm i --save express pug socket.io mobile-detect clipboard && npm i --save-dev babel-register gulp-sass-glob pug-include-glob babel-preset-es2015 babel-polyfill babel-loader@6.4.1 gulp gulp-sourcemaps gulp-plumber merge-stream vinyl-buffer run-sequence gulp-if gulp-pug gulp-htmlmin gulp-sass gulp-postcss autoprefixer postcss-sorting gulp-cssnano gulp-group-css-media-queries gulp-webpack gulp-uglify gulp-imagemin gulp.spritesmith gulp-ttf2eot gulp-ttf2woff gulp-supervisor browser-sync path reload ansi-styles bempug
//*** NPM PACKAGES ***\\

// CONFIG
import GLOBALCONFIG from './config.json';

// BUILT-IN MODULES
import path from 'path';

// TOOL
import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';
import merge from 'merge-stream';
import buffer from 'vinyl-buffer';
import runSequence from 'run-sequence';
import gulpIf from 'gulp-if';

// PUG
import pug from 'gulp-pug';
import htmlMin from 'gulp-htmlmin';
import gulpIncludeGlob from 'pug-include-glob';

// CSS
import scss from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import sorting from 'postcss-sorting';
import cssNano from 'gulp-cssnano';
import combineMediaQuery from 'gulp-group-css-media-queries';
import scssGlob from 'gulp-sass-glob';

// JS
import webpack from 'gulp-webpack';
import uglifyJs from 'gulp-uglify';

// IMG
import imageMin from 'gulp-imagemin';
import sprite from 'gulp.spritesmith';

// FONT
import ttfToEot from 'gulp-ttf2eot';
import ttfToWoff from 'gulp-ttf2woff';

// SUPERVISOR
import supervisor from 'gulp-supervisor';

// LOCAL SERVER
const browserSync = require('browser-sync').create(),
      reload      = browserSync.reload;

//[*]+---------------[[ PUG 컴파일 ]]---------------+[*]\\
gulp.task('pug-compile', () => {
  return gulp.src(GLOBALCONFIG.DIRECTION.SRC + GLOBALCONFIG.DIRECTION.PUG + '/**/!(_)*.pug')
      .pipe(plumber())
      .pipe(pug({
        compileDebug: true,
        pretty: '  ',
        cache: true,
        plugins: [
          gulpIncludeGlob({})
        ]
      }))
      .pipe(gulp.dest(GLOBALCONFIG.DIRECTION.DEV))
      .pipe(reload({stream: true}));
});
//[*]+---------------[[ PUG 컴파일 ]]---------------+[*]\\

//[*]+---------------[[ HTML 압축 ]]---------------+[*]\\
gulp.task('html-minify', () => {
  return gulp.src(GLOBALCONFIG.DIRECTION.DEV + '/**/*.{html, htm}')
      .pipe(plumber())
      .pipe(htmlMin({
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        sortAttributes: true,
        sortClassName: true,
        minifyCSS: true,
        minifyJS: false
      }))
      .pipe(gulp.dest(GLOBALCONFIG.DIRECTION.DIST));
});
//[*]+---------------[[ HTML 압축 ]]---------------+[*]\\

//[*]+---------------[[ SCSS 컴파일 ]]---------------+[*]\\
gulp.task('scss-compile', () => {
  return gulp.src(GLOBALCONFIG.DIRECTION.SRC + GLOBALCONFIG.DIRECTION.SCSS + '/**/*.scss')
      .pipe(scssGlob())
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(scss({
        outputStyle: 'expanded',
        indentedSyntax: '  '
      })
      .on('error', scss.logError)
      )
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(GLOBALCONFIG.DIRECTION.DEV + '/css'))
      .pipe(reload({stream: true}));
});
//[*]+---------------[[ SCSS 컴파일 ]]---------------+[*]\\

//[*]+---------------[[ CSS 정리 ]]---------------+[*]\\
gulp.task('css-strong', () => {
  return gulp.src(GLOBALCONFIG.DIRECTION.DEV + '/css/**/*.css')
      .pipe(plumber())
      .pipe(postcss([
        autoprefixer(),
        sorting({
          'properties-order': 'alphabetical'
        })
      ]))
      .pipe(combineMediaQuery())
      .pipe(cssNano({discardUnused: false}))
      .pipe(gulp.dest(GLOBALCONFIG.DIRECTION.DIST + '/css'))
      .pipe(gulpIf(GLOBALCONFIG.SERVERDEV, gulp.dest(GLOBALCONFIG.DIRECTION.SERVER + '/css')));
});
//[*]+---------------[[ CSS 정리 ]]---------------+[*]\\

//[*]+---------------[[ Webpack 컴파일 ]]---------------+[*]\\
gulp.task('webpack-compile', () => {
  return gulp.src(GLOBALCONFIG.DIRECTION.SRC + GLOBALCONFIG.DIRECTION.WEBPACK)
      .pipe(plumber())
      .pipe(gulpIf(
        GLOBALCONFIG.DISTRIBUTION,
        webpack({
          entry: {
            [GLOBALCONFIG.WEBPACK.DISTFILENAME]: './' + GLOBALCONFIG.DIRECTION.SRC + GLOBALCONFIG.DIRECTION.WEBPACK + `/${GLOBALCONFIG.WEBPACK.DISTFILENAME}.js`
          },
          devtool: 'source-map',
          context: __dirname,
          output: {
            filename: '[name].bundle.js',
            pathinfo: true
          },
          module: {
            loaders: [{
              test: /.jsx?$/,
              loader: 'babel-loader',
              exclude: [
                path.resolve(__dirname, '/node_modules/'),
                path.resolve(__dirname, '/reload-helper/'),
                path.resolve(__dirname, '/dev/'),
                path.resolve(__dirname, '/dist/'),
                path.resolve(__dirname, '/public/')
              ],
              query: {
                presets: ['es2015']
              }
            }]
          },
        }),
        webpack({
          entry: {
            [GLOBALCONFIG.WEBPACK.FILENAME]: './' + GLOBALCONFIG.DIRECTION.SRC + GLOBALCONFIG.DIRECTION.WEBPACK + `/${GLOBALCONFIG.WEBPACK.FILENAME}.js`
          },
          devtool: 'source-map',
          context: __dirname,
          output: {
            filename: '[name].bundle.js',
            pathinfo: true
          },
          module: {
            loaders: [{
              test: /.jsx?$/,
              loader: 'babel-loader',
              exclude: [
                path.resolve(__dirname, '/node_modules/'),
                path.resolve(__dirname, '/reload-helper/'),
                path.resolve(__dirname, '/dev/'),
                path.resolve(__dirname, '/dist/'),
                path.resolve(__dirname, '/public/')
              ],
              query: {
                presets: ['es2015']
              }
            }]
          },
        })
      ))
      .pipe(gulp.dest(GLOBALCONFIG.DIRECTION.DEV + '/js'))
      .pipe(reload({stream: true}));
});
//[*]+---------------[[ Webpack 컴파일 ]]---------------+[*]\\

//[*]+---------------[[ JS 압축 ]]---------------+[*]\\
gulp.task('js-compress', (cb) => {
  return gulp.src(GLOBALCONFIG.DIRECTION.DEV + '/js/**/*.js')
      .pipe(uglifyJs())
      .pipe(gulp.dest(GLOBALCONFIG.DIRECTION.DIST + '/js'))
      .pipe(gulpIf(GLOBALCONFIG.SERVERDEV, gulp.dest(GLOBALCONFIG.DIRECTION.SERVER + '/js')));
});
//[*]+---------------[[ JS 압축 ]]---------------+[*]\\

//[*]+---------------[[ 그 외의 파일 dev, dist 폴더로 복사 ]]---------------+[*]\\
gulp.task('file-copy', () => {
  return gulp.src(GLOBALCONFIG.DIRECTION.SRC + GLOBALCONFIG.DIRECTION.JSON + '**/!(_)*.json')
      .pipe(plumber())
      .pipe(gulp.dest(GLOBALCONFIG.DIRECTION.DEV))
      .pipe(gulp.dest(GLOBALCONFIG.DIRECTION.DIST))
      .pipe(gulpIf(GLOBALCONFIG.SERVERDEV, gulp.dest(GLOBALCONFIG.DIRECTION.SERVER)))
      .pipe(reload({stream: true}));
});
//[*]+---------------[[ 파일 dev, dist 폴더로 복사 ]]---------------+[*]\\

//[*]+---------------[[ 이미지 압축 ]]---------------+[*]\\
gulp.task('img-min', () => {
  return gulp.src([GLOBALCONFIG.DIRECTION.SRC + GLOBALCONFIG.DIRECTION.IMAGE + '/!(sprites)*', GLOBALCONFIG.DIRECTION.SRC + GLOBALCONFIG.DIRECTION.IMAGE + '/!(sprites)*/**/*'])
      .pipe(plumber())
      .pipe(imageMin())
      .pipe(gulp.dest(GLOBALCONFIG.DIRECTION.DEV + '/images'))
      .pipe(gulp.dest(GLOBALCONFIG.DIRECTION.DIST + '/images'))
      .pipe(gulpIf(GLOBALCONFIG.SERVERDEV, gulp.dest(GLOBALCONFIG.DIRECTION.SERVER + '/images')))
      .pipe(reload({stream: true}));
});
//[*]+---------------[[ 이미지 압축 ]]---------------+[*]\\

//[*]+---------------[[ 스프라이트 이미지 생성 ]]---------------+[*]\\
gulp.task('img-sprite', () => {
  let spriteData = gulp.src(GLOBALCONFIG.DIRECTION.SRC + GLOBALCONFIG.DIRECTION.IMAGE + '/sprites/**/*.png')
                       .pipe(plumber())
                       .pipe(gulpIf(
                          GLOBALCONFIG.DISTRIBUTION,
                          sprite({
                            imgName: GLOBALCONFIG.SPRITE.DISTFILENAME,
                            cssName: '_sprite.scss',
                            imgPath: '../images/' + GLOBALCONFIG.SPRITE.DISTFILENAME,
                            padding: 5 // 스프라이트 이미지 간의 간격 조절
                          }),
                          sprite({
                            imgName: GLOBALCONFIG.SPRITE.FILENAME,
                            cssName: '_sprite.scss',
                            imgPath: '../images/' + GLOBALCONFIG.SPRITE.FILENAME,
                            padding: 5 // 스프라이트 이미지 간의 간격 조절
                          })
                        ));

  let imgStream = spriteData.img
      .pipe(buffer())
      .pipe(imageMin())
      .pipe(gulp.dest(GLOBALCONFIG.DIRECTION.DEV + '/images'))
      .pipe(gulp.dest(GLOBALCONFIG.DIRECTION.DIST + '/images'))
      .pipe(gulpIf(GLOBALCONFIG.SERVERDEV, gulp.dest(GLOBALCONFIG.DIRECTION.SERVER + '/images')));
  let cssStream = spriteData.css
      .pipe(gulp.dest(GLOBALCONFIG.DIRECTION.SRC + GLOBALCONFIG.DIRECTION.SCSS + '/components/sprite'))
      .pipe(reload({stream: true}));

  return merge(imgStream, cssStream);
});
//[*]+---------------[[ 스프라이트 이미지 생성 ]]---------------+[*]\\

//[*]+---------------[[ 폰트 형식 변환 ]]---------------+[*]\\
gulp.task('font-convert', () => {
  gulp.src([GLOBALCONFIG.DIRECTION.SRC + GLOBALCONFIG.DIRECTION.FONT + '/**/*.ttf'])
    .pipe(plumber()) // TTF => EOT
    .pipe(ttfToEot())
    .pipe(gulp.dest(GLOBALCONFIG.DIRECTION.DEV + GLOBALCONFIG.DIRECTION.FONT))
    .pipe(gulp.dest(GLOBALCONFIG.DIRECTION.DIST + GLOBALCONFIG.DIRECTION.FONT))
    .pipe(gulpIf(GLOBALCONFIG.SERVERDEV, gulp.dest(GLOBALCONFIG.DIRECTION.SERVER + GLOBALCONFIG.DIRECTION.FONT)));
  
  gulp.src([GLOBALCONFIG.DIRECTION.SRC + GLOBALCONFIG.DIRECTION.FONT + '/**/*.ttf'])
    .pipe(plumber()) // TTF => WOFF
    .pipe(ttfToWoff())
    .pipe(gulp.dest(GLOBALCONFIG.DIRECTION.DEV + GLOBALCONFIG.DIRECTION.FONT))
    .pipe(gulp.dest(GLOBALCONFIG.DIRECTION.DIST + GLOBALCONFIG.DIRECTION.FONT))
    .pipe(gulpIf(GLOBALCONFIG.SERVERDEV, gulp.dest(GLOBALCONFIG.DIRECTION.SERVER + GLOBALCONFIG.DIRECTION.FONT)));
  
  gulp.src([GLOBALCONFIG.DIRECTION.SRC + GLOBALCONFIG.DIRECTION.FONT + '/**/*'])
    .pipe(plumber()) // TTF => TTF
    .pipe(gulp.dest(GLOBALCONFIG.DIRECTION.DEV + GLOBALCONFIG.DIRECTION.FONT))
    .pipe(gulp.dest(GLOBALCONFIG.DIRECTION.DIST + GLOBALCONFIG.DIRECTION.FONT))
    .pipe(gulpIf(GLOBALCONFIG.SERVERDEV, gulp.dest(GLOBALCONFIG.DIRECTION.SERVER + GLOBALCONFIG.DIRECTION.FONT)));
});
//[*]+---------------[[ 폰트 형식 변환 ]]---------------+[*]\\

//[*]+---------------[[ 로컬서버 실행 후 파일 변경 감지 ]]---------------+[*]\\
gulp.task('server-run', () => {
  browserSync.init({
    server: GLOBALCONFIG.DIRECTION.DEV,
    ghostMode: {
      clicks: true,
      forms: true,
      scroll: true
    }
  });
  
  gulp.watch(GLOBALCONFIG.DIRECTION.SRC + GLOBALCONFIG.DIRECTION.PUG + '/**/*', ['pug-compile']);
  gulp.watch(GLOBALCONFIG.DIRECTION.SRC + GLOBALCONFIG.DIRECTION.SCSS + '/**/*', ['scss-compile']);
  gulp.watch(GLOBALCONFIG.DIRECTION.SRC + GLOBALCONFIG.DIRECTION.WEBPACK + '/**/*', ['webpack-compile']);
  gulp.watch(GLOBALCONFIG.DIRECTION.SRC + GLOBALCONFIG.DIRECTION.JSON + '/**/*', ['file-copy']);
  gulp.watch([GLOBALCONFIG.DIRECTION.SRC + GLOBALCONFIG.DIRECTION.IMAGE + '/!(sprites)*', GLOBALCONFIG.DIRECTION.SRC + GLOBALCONFIG.DIRECTION.IMAGE + '/!(sprites)*/**/*'], ['img-min']);
  gulp.watch(GLOBALCONFIG.DIRECTION.IMAGE + 'sprites/*', ['img-sprite']);
  gulp.watch(GLOBALCONFIG.DIRECTION.DEV + '/**/*.{html, htm}', ['html-minify']);
  gulp.watch(GLOBALCONFIG.DIRECTION.DEV + '/css/**/*.css', ['css-strong']);
//  gulp.watch(GLOBALCONFIG.DIRECTION.DEV + '/js/**/*.js', ['js-compress']);
});
//[*]+---------------[[ 로컬서버 실행 후 파일 변경 감지 ]]---------------+[*]\\

//[*]+---------------[[ 서버앱 개발시 자동 리다이렉트 ]]---------------+[*]\\
gulp.task('supervisor', ['build-server'], () => {
  supervisor("app-runner.js", {
    args: [],
    watch: ['./'],
    ignore: ['node_modules', 'dev', 'dist', 'public'],
    pollInterval: 500,
    extensions: ['js'],
    exec: 'node',
    debug: true,
    debugBrk: false,
    harmony: true,
    noRestartOn: false,
    forceWatch: true,
    quiet: false
  });
  
  gulp.watch(GLOBALCONFIG.DIRECTION.SRC + GLOBALCONFIG.DIRECTION.PUG + '/**/*', ['pug-compile']);
  gulp.watch(GLOBALCONFIG.DIRECTION.SRC + GLOBALCONFIG.DIRECTION.JSON + '/**/*', ['file-copy']);
  gulp.watch(GLOBALCONFIG.DIRECTION.SRC + GLOBALCONFIG.DIRECTION.SCSS + '/**/*', ['scss-compile']);
  gulp.watch([GLOBALCONFIG.DIRECTION.SRC + GLOBALCONFIG.DIRECTION.IMAGE + '/!(sprites)*', GLOBALCONFIG.DIRECTION.SRC + GLOBALCONFIG.DIRECTION.IMAGE + '/!(sprites)*/**/*'], ['img-min']);
  gulp.watch(GLOBALCONFIG.DIRECTION.IMAGE + 'sprites/*', ['img-sprite']);
  gulp.watch(GLOBALCONFIG.DIRECTION.SRC + GLOBALCONFIG.DIRECTION.WEBPACK + '/**/*', ['webpack-compile']);
  gulp.watch(GLOBALCONFIG.DIRECTION.DEV + '/css/**/*.css', ['css-strong']);
  gulp.watch(GLOBALCONFIG.DIRECTION.DEV + '/js/**/*.js', ['js-compress']);
});
//[*]+---------------[[ 서버앱 개발시 자동 리다이렉트 ]]---------------+[*]\\

//[*]+---------------[[ GULP 기본, 빌드 명령어 실행 ]]---------------+[*]\\
gulp.task('build', () => {
  runSequence(
    'font-convert',
    ['pug-compile', 'scss-compile', 'webpack-compile'],
    ['img-sprite', 'img-min', 'file-copy'],
//    ['css-strong', 'js-compress', 'html-minify']
    ['css-strong', 'html-minify']
  );
});

gulp.task('default', () => {
  runSequence(
    'font-convert',
    ['pug-compile', 'scss-compile', 'webpack-compile'],
    ['img-sprite', 'img-min', 'file-copy'],
//    ['css-strong', 'html-minify', 'js-compress'],
    ['css-strong', 'html-minify'],
    'server-run'
  );
});
//[*]+---------------[[ GULP 기본, 빌드 명령어 실행 ]]---------------+[*]\\
