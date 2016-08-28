import gulp       from 'gulp'
import minimist   from 'minimist'
import browserify from 'browserify'
import babelify   from 'babelify'
import source     from 'vinyl-source-stream'
import del        from 'del'
import _          from 'lodash'

const handler = {

}

function transpile(src, dest, filename) {

  return browserify(src, {
		debug : true
	})
	.transform(babelify)
	.bundle()
    .pipe(source(filename))
		.pipe(gulp.dest(dest))
}

gulp.task('build', () => {

  const files = {
    'background': [
      'content_script.js',
      'handler.js'
    ],
    'frontend': [
      'popup.js'
    ]
  }

  _.forEach(files, (filenames, path) => {
    _.forEach(filenames, (filename) => {
      transpile(`./src/${path}/${filename}`, `./dest/js/${path}`, filename)
    })
  })

	gulp.src(['src/**/*.html', 'src/**/*.css', 'src/**/*.json', 'src/**/*.png'])
		.pipe(gulp.dest('./dest'))
});

gulp.task('clean', () => {
  del(['dest/*'])
});

gulp.task('watch', () => {
  gulp.watch('./*.js', ['build'])
});
