var fs = require('fs')
var path = require('path')

var gulp = require('gulp')
var $ = require('gulp-load-plugins')() // Load all gulp plugins
// automatically and attach
// them to the `plugins` object

var runSequence = require('run-sequence') // Temporary solution until gulp 4
// https://github.com/gulpjs/gulp/issues/355
var browserSync = require('browser-sync').create()

// ---------------------------------------------------------------------
// | postcss plugin                                                    |
// ---------------------------------------------------------------------
var autoprefixer = require('autoprefixer')
var cssnano = require('cssnano')

// ---------------------------------------------------------------------
// | Helper tasks                                                      |
// ---------------------------------------------------------------------

gulp.task('archive:create_archive_dir', function () {
  fs.mkdirSync(path.resolve(dirs.archive), '0755')
})

gulp.task('archive:zip', function (done) {
  var archiveName = path.resolve(dirs.archive, pkg.name + '_v' + pkg.version + '.zip')
  var archiver = require('archiver')('zip')
  var files = require('glob').sync('**/*.*', {
    'cwd': dirs.dist,
    'dot': true // include hidden files
  })
  var output = fs.createWriteStream(archiveName)

  archiver.on('error', function (error) {
    done()
    throw error
  })

  output.on('close', done)

  files.forEach(function (file) {
    var filePath = path.resolve(dirs.dist, file)

    // `archiver.bulk` does not maintain the file
    // permissions, so we need to add files individually
    archiver.append(fs.createReadStream(filePath), {
      'name': file,
      'mode': fs.statSync(filePath)
    })
  })

  archiver.pipe(output)
  archiver.finalize()
})

gulp.task('clean', function (done) {
  require('del')([
    dirs.archive,
    dirs.dist
  ], done)
})

gulp.task('copy', [
  'copy:.htaccess',
  'copy:index.html',
  'copy:jquery',
  'copy:main.css',
  'copy:misc',
  'copy:normalize'
])

gulp.task('copy:.htaccess', function () {
  return gulp.src('node_modules/apache-server-configs/dist/.htaccess')
    .pipe($.replace(/# ErrorDocument/g, 'ErrorDocument'))
    .pipe(gulp.dest(dirs.dist))
})

gulp.task('css', function () {
  var plugins = [
    autoprefixer({
      browsers: [
        'ie >= 8',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 4.4',
        'bb >= 10'
      ]
    }),
    cssnano()
  ]

  return gulp.src('src/sass/**/*.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.postcss(plugins))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('src/css'))
})

gulp.task('sync-css', ['css'], function () {
  return gulp.src('src/css')
    .pipe(browserSync.stream())
})

gulp.task('serve', ['css'], function () {
  var proxy = require('http-proxy-middleware')('/api', {
      target: 'http://devadmin.bmtrip.com',
      changeOrigin:true
  })

  browserSync.init({
    server: {
      baseDir: './src'
    },
    middleware: proxy,
    scrollRestoreTechnique: 'cookie'
  })
  gulp.watch('src/sass/**/*.scss', ['sync-css'])
  gulp.watch('src/*.html', browserSync.reload)
})

// ---------------------------------------------------------------------
// | Main tasks                                                        |
// ---------------------------------------------------------------------

gulp.task('archive', function (done) {
  runSequence(
    'build',
    'archive:create_archive_dir',
    'archive:zip',
    done)
})
