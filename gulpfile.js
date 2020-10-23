var gulp = require('gulp');
var less = require('gulp-less'); //(преобразуем все файлы less в css)
var autoprefixer = require('gulp-autoprefixer'); //(автоматическое добавление префиксов для разных браузеров)
var concat = require('gulp-concat'); //(все файлы less, данного проекта, сохраняем в один файл)
var cleancss = require('gulp-clean-css'); //(сжатие css файла)
var babel = require('gulp-babel'); // babel
var uglify = require('gulp-uglify'); // Минификация js
var imagemin = require('gulp-imagemin'); // Минификация графики

var config = {
    output:{
        cssName: 'style.min.css', // Куда собираются стили
        jsName: 'script.min.js', // Куда собирается js
    }
};

gulp.task('lessMobile', function() {
    return gulp.src(['./common/less/vars/*.less', './common/less/*.less', './mobile/less/*.less'])
        .pipe(concat(config.output.cssName))
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(cleancss())
        .pipe(gulp.dest('./build/mobile/css'));
});

gulp.task('lessDesktop', function() {
    return gulp.src(['./common/less/vars/*.less', './common/less/*.less', './desktop/less/*.less'])
        .pipe(concat(config.output.cssName))
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(cleancss())
        .pipe(gulp.dest('./build/desktop/css'));
});

gulp.task('scriptsMobile', function() {
    return gulp.src(['./common/js/*.js', './mobile/js/*.js'])
        .pipe(concat(config.output.jsName))
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest('./build/mobile/js'));
});

gulp.task('scriptsDesktop', function() {
    return gulp.src(['./common/js/*.js', './desktop/js/*.js'])
        .pipe(concat(config.output.jsName))
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest('./build/desktop/js'));
});

gulp.task('imagesMobile', function() {
    gulp.src(['./common/img/*', './mobile/img/*'])
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest('./build/mobile/img'))
});

gulp.task('imagesDesktop', function() {
    gulp.src(['./common/img/*', './desktop/img/*'])
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest('./build/desktop/img'))
});



// запуск функций
gulp.task('default', function(){
    gulp.watch(['./common/less/vars/*.less', './common/less/*.less', './mobile/less/*.less'], gulp.parallel('lessMobile'));
    gulp.watch(['./common/less/vars/*.less', './common/less/*.less', './desktop/less/*.less'], gulp.parallel('lessDesktop'));
    gulp.watch(['./common/js/*.js', './mobile/js/*.js'], gulp.parallel('scriptsMobile'));
    gulp.watch(['./common/js/*.js', './desktop/js/*.js'], gulp.parallel('scriptsDesktop'));
    gulp.watch(['./common/img/*', './mobile/img/*'], gulp.parallel('imagesMobile'));
    gulp.watch(['./common/img/*', './desktop/img/*'], gulp.parallel('imagesDesktop'));
});