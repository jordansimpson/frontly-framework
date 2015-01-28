// Include gulp
var gulp = require('gulp'); 

// Include all required plugins
var jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload');

// Error Log Function to handle errors without disrupting watch
function errorLog(error) {
    console.error.bind(error);
    this.emit('end');
}

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
        .pipe(gulp.dest('dist/css/min'))
        .pipe(livereload());
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

    var server = livereload();
    gulp.watch('src/scripts/*.js', ['lint', 'scripts']);
    gulp.watch('src/sass/*.scss', ['sass']);
    livereload.listen();
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);