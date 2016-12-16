let gulp = require( "gulp" );
let gutil = require("gulp-util");

module.exports.onError = function onError (err) {
  let displayErr = gutil.colors.red(err);
  gutil.log(displayErr);
  gutil.beep();
  this.emit("end");
}

module.exports.logWatchEvent = function logWatchEvent(event) {
  console.log("File " + event.path + " was " + event.type + ", running tasks...");
}

module.exports.watchTask = function ( name ) {
	gulp.watch( gulp.tasks[name].SRC_GLOB, [name])
	    .on("change", module.exports.logWatchEvent);
}
