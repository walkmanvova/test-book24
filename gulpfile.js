var gulp = require('gulp');
var less = require('gulp-less'); //(преобразуем все файлы less в css)
var autoprefixer = require('gulp-autoprefixer'); //(автоматическое добавление префиксов для разных браузеров)
var concat = require('gulp-concat'); //(все файлы less, данного проекта, сохраняем в один файл)
var cleancss = require('gulp-clean-css'); //(сжатие css файла)
var babel = require('gulp-babel'); // babel
var uglify = require('gulp-uglify'); // Минификация js

var config = {
    output:{
        cssName: 'style.min.css', // Куда собираются стили
        jsName: 'script.min.js', // Куда собирается js
    }
};

gulp.task('lessMobile', function() {
    return gulp.src('./mobile/less/*.less')
        .pipe(less())
        .pipe(concat(config.output.cssName))
        .pipe(autoprefixer())
        .pipe(cleancss())
        .pipe(gulp.dest('./build/mobile/css'));
});

gulp.task('lessDesktop', function() {
    return gulp.src('./desktop/less/*.less')
        .pipe(less())
        .pipe(concat(config.output.cssName))
        .pipe(autoprefixer())
        .pipe(cleancss())
        .pipe(gulp.dest('./build/desktop/css'));
});

gulp.task('scriptsMobile', function() {
    return gulp.src('./mobile/js/*.js')
        .pipe(concat(config.output.jsName))
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest('./build/mobile/js'));
});

gulp.task('scriptsDesktop', function() {
    return gulp.src('./mobile/js/*.js')
        .pipe(concat(config.output.jsName))
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest('./build/desktop/js'));
});

// запуск функций
gulp.task('default', function(){
    gulp.watch('./mobile/less/*.less', gulp.parallel('lessMobile'));
    gulp.watch('./desktop/less/*.less', gulp.parallel('lessDesktop'));
    gulp.watch('./mobile/js/*.js', gulp.parallel('scriptsMobile'));
    gulp.watch('./desktop/js/*.js', gulp.parallel('scriptsDesktop'));
});