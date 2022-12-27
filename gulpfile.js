let preprocessor = 'scss';

const { src, dest, parallel, series, watch } = require('gulp');
const fileinclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const imagecomp = require('compress-images');
const del = require('del');

function browsersync() {
    browserSync.init({
        server: { baseDir: 'app/' },
        notify: false,
        online: true
    })
}

async function html(){
    return src([
        'app/pages/*.html',
        '!app/pages/component/'
    ])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('app/'));
}

function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.min.js',
        'app/js/**/*.js',
        '!app/js/app.min.js',
    ])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js/'))
        .pipe(browserSync.stream())
}

function styles() {
    return src('app/' + preprocessor + '/main.' + preprocessor + '')
        .pipe(eval('sass')())
        .pipe(concat('app.min.css'))
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
        .pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } ))
        .pipe(dest('app/css/'))
        .pipe(browserSync.stream())
}

async function images() {
    imagecomp(
        "app/images/src/**/*",
        "app/images/dest/",
        { compress_force: false, statistic: true, autoupdate: true }, false,
        { jpg: { engine: "mozjpeg", command: ["-quality", "75"] } },
        { png: { engine: "pngquant", command: ["--quality=75-100", "-o"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
        function (err, completed) {
            if (completed === true) {
                browserSync.reload()
            }
        }
    )
}

function cleanimg() {
    return del('app/images/dest/**/*', { force: true })
}

function buildcopy() {
    return src([
        'app/css/**/*.min.css',
        'app/js/**/*.min.js',
        'app/images/dest/**/*',
        'app/**/*.html',
    ], { base: 'app' })
        .pipe(dest('dist'))
}

function cleandist() {
    return del('dist/**/*', { force: true })
}

function startwatch() {
    watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
    watch('app/**/' + preprocessor + '/**/*', styles);
    watch('app/pages/**/*.html', {usePolling: true}, html).on('change', browserSync.reload);
    watch('app/images/src/**/*', images);
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.cleanimg = cleanimg;
exports.build = series(cleandist, html, styles, scripts, images, buildcopy);
exports.default = parallel(html, styles, scripts, browsersync, images, startwatch);