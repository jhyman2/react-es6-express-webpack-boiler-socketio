import gulp from 'gulp';
import shell from 'gulp-shell';
import rimraf from 'rimraf';
import run from 'run-sequence';
import watch from 'gulp-watch';
import gutil from 'gulp-util';
import server from 'gulp-live-server';
import webpack from 'webpack-stream';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from './webpack.config';

const paths = {
  serverJS    : ['./src/**/*.js'],
  serverDest  : './app',
  clientJS    : ['./src/**/*.js'],
  clientDest  : './public/build'
};

let express;

gulp.task('default', cb => {
  run('server', 'build', 'watch', cb);
});

gulp.task('build', cb => {
  run('clean-server', 'clean-client', 'flow', 'webpack', 'babel', 'restart', cb);
});

gulp.task('build-dev', cb => {
  run('clean-server', 'clean-client', 'flow', 'webpack-dev-server', 'babel', cb);
});

gulp.task('clean-server', cb => {
  rimraf(paths.serverDest, cb);
});

gulp.task('clean-client', cb => {
  rimraf(paths.clientDest, cb);
});

gulp.task('flow', shell.task([
  'flow'
], { ignoreErrors: true }));

gulp.task('babel', shell.task([
  'babel src --out-dir app'
]));

gulp.task('webpack', () => {
  return gulp.src('./public/js/index.jsx')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./public/dist'));
});

gulp.task('webpack-dev-server', () => {
  var compiler = webpack(webpackConfig);

  // todo: verify this
  return new WebpackDevServer(compiler, {
    contentBase: './build/',
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    host: 'localhost'
  }).listen(8080, 'localhost', err => {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);

    gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
  });
});

gulp.task('server', () => {
  express = server.new(paths.serverDest);
});

gulp.task('restart', () => {
  express.start.bind(express)();
});

gulp.task('watch', () => {
  return watch(paths.serverJS, () => {
    gulp.start('build');
  });
});

gulp.task('watch', () => {
  return watch(paths.clientJS, () => {
    gulp.start('build');
  });
})