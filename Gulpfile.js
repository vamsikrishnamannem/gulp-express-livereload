var gulp    = require('gulp');
var express = require('express');
var path    = require('path');
var connect = require("connect");

var app = express();
gulp.task('express', function() {
  app.use(require('connect-livereload')({port: 8002}));
  app.use(express.static(path.join(__dirname, '/app')));
  app.listen(8000);
});

var tinylr;
gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
  tinylr.listen(8002);
});

function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);
  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

gulp.task('watch', function() {
  gulp.watch('app/*.html', notifyLiveReload);
  gulp.watch('app/js/*.js', notifyLiveReload);
  gulp.watch('app/css/*.css', notifyLiveReload);
});

gulp.task('default', ['express', 'livereload', 'watch'], function() {

});
