let gulp = require( "gulp" );
let babel = require( "gulp-babel" );

let onError = require( "../utils" ).onError;

// let sourcemaps = require( "gulp-sourcemaps" );

let SRC_GLOB =  "./src/**/*.js";

gulp.task( "build:scripts", function() {
  return gulp.src( SRC_GLOB )
            //  .pipe( sourcemaps.init() )
             .pipe( babel( {
                  presets: ['es2015']
              } ) )
             .on( "error", onError )
            //  .pipe( sourcemaps.write( "." ) )
             .pipe( gulp.dest( "build" ) );
});

gulp.tasks[ "build:scripts" ].SRC_GLOB = SRC_GLOB;
