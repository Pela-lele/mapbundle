var gulp = require('gulp'),
	browserify = require('browserify'),
	babelify = require('babelify'),
	source = require('vinyl-source-stream'),
  	buffer = require('vinyl-buffer'),
	plugins = require('gulp-load-plugins')();

var runSequence = require('run-sequence');

console.log(plugins);

gulp.task('clean', function() {
    return gulp.src('dist/**/**')
    	.pipe(plugins.clean())
});

//es6-es5
// gulp.task('babel', function() {
//     return gulp.src('src/**/*.js')
//         .pipe(plugins.babel())
//         .pipe(gulp.dest('dist'))
// });

gulp.task('browserify', function() {
	return browserify({
			entries: './src/zmap.js',
			standalone: 'Zmap',
			debug: true
		})
		.transform(babelify.configure({
	        presets:['es2015']
		}))
		// .transform(babelify)
    	.bundle()
    	.pipe(source('zmap.js'))
    	.pipe(buffer())
    	.pipe(gulp.dest('dist'))

});

gulp.task('default', function() {
	runSequence('clean'/*,'babel'*/,'browserify')
});
