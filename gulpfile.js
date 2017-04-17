var gulp = require('gulp-param')(require('gulp'), process.argv),
    jsConcat = require('gulp-concat'),
    ts = require('gulp-typescript');

var tsProject = ts.createProject({
    declaration: true,
    noExternalResolve: true
});

gulp.task('scripts', ['typescript'], function () {
    return gulp.src([
        'scripts/**/*.js'
    ])
        .pipe(jsConcat('app.min.js'))
        .pipe(gulp.dest('Build/Scripts/'));
});

gulp.task('typescript', function () {
    return gulp.src([
        'Scripts/**/*.ts'
    ])
        .pipe(ts({
            sortOutput: true
        }))
        .pipe(gulp.dest('scripts/'));
});
gulp.task('default', ['scripts']);