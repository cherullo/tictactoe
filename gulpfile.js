var gulp = require("gulp");

var ts = require("gulp-typescript");

var paths = {
    pages: ['html/**']
};

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("output"));
});

var tsProject = ts.createProject("tsconfig.json");

gulp.task("default", ["copy-html"], function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("output"));
});
