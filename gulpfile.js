// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('src/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        .pipe(minifyCSS({keepBreaks:false}))
        .pipe(rename('frontly.min.css'))
        .pipe(gulp.dest('dist/css/min'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('src/scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts/min'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/scripts/*.js', ['lint', 'scripts']);
    gulp.watch('src/sass/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);