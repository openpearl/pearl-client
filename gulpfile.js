// General.
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var watch = require('gulp-watch');

// Utils.
var sh = require('shelljs');
var replace = require('replace');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var flatten = require('gulp-flatten');

// Bower.
var bower = require('bower');

// Browserify.
var browserify = require('browserify');
var watchify = require('watchify');

// Sass.
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var minifyCss = require('gulp-minify-css');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass', 'watch', 'watchify', 'templates']);

//Moves all templates into a flat structure. 
gulp.task('templates', function() {
  var source = 'www/app';
  var destination = 'www/_templates';
  gulp.src(source + '/**/*.t.html', {base: source})
    .pipe(watch(source, {base: source}))
    .pipe(flatten())  
    .pipe(gulp.dest(destination));
});

gulp.task('watchify', function() {
  
  var bundler = browserify({
    // Configurations.
    cache: {}, 
    packageCache: {},
    fullPaths: true,
  });
  bundler = watchify(bundler);

  function rebundle() {
    console.log("Rebundling Angular scripts.");
    return bundler.bundle()
      .pipe(source('app.m.js'))
      .pipe(rename('bundle.js'))
      .pipe(gulp.dest("www/app/"));
  }

  bundler.on('update', rebundle);
  bundler.add('www/app/app.m.js');

  return rebundle();
});

var replaceFiles = ['./www/app/bundle.js'];
gulp.task('add-proxy', function() {
  return replace({
    regex: "https://cors.api.com/api",
    replacement: "https://localhost:8100/api",
    paths: replaceFiles,
    recursive: false,
    silent: false,
  });
});

gulp.task('remove-proxy', function() {
  return replace({
    regex: "https://localhost:8100/api",
    replacement: "https://cors.api.com/api",
    paths: replaceFiles,
    recursive: false,
    silent: false,
  });
});

gulp.task('sass', function(done) {

  var processors = [
    autoprefixer({browsers: ['last 2 version']})
  ];

  gulp.src('./scss/ionic.app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./www/assets/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/assets/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
