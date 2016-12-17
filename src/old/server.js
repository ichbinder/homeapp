// =======================
// get the packages we need ============
// =======================
const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const morgan = require( 'morgan' );
const mongoose = require( 'mongoose' );
const spawn 		= require( 'child_process' ).spawn;

const jwt = require( 'jsonwebtoken' ); // used to create, sign, and verify tokens
const config = require( './config' ); // get our config file
const User = require( './app/models/user' ); // get our mongoose model

// =======================
// configuration =========
// =======================
const port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect( config.database ); // connect to database
app.set( 'superSecret', config.secret ); // secret letiable

// use body parser so we can get info from POST and/or URL parameters
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );

// use morgan to log requests to the console
app.use( morgan( 'dev' ) );

// =======================
// routes ================
// =======================
// basic route
app.get( '/', ( req, res ) => {
  res.send( `Hello! The API is at http://localhost: ${port}/api` );
} );

app.get( '/setup', ( req, res ) => {
  // create a sample user
  const nick = new User( {
    name: 'jakob',
    password: 'hallo23',
    admin: true
  } );

  // save the sample user
  nick.save( ( err ) => {
    if ( err ) throw err;

    console.log( 'User saved successfully' );
    res.json( { success: true } );
  } );
} );

app.get( '/tuer', ( req, res ) => {
  const sshlogin = spawn( 'ssh', ['-tt', 'tuer@rpi01.local'] );

  sshlogin.stdout.on( 'data', ( data ) => {
    res.sendStatus( data );
    console.log( `stdout: ${data}` );
  } );

  sshlogin.stderr.on( 'data', ( data ) => {
    res.statusCode = 404;
    console.log( `stderr: ${data}` );
  } );

  sshlogin.on( 'close', ( code ) => {
    res.sendStatus( code );
    console.log( `child process exited with code ${code}` );
  } );
} );

// API ROUTES -------------------
// get an instance of the router for api routes
const apiRoutes = express.router();

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post( '/authenticate', ( req, res ) => {
  // find the user
  User.findOne( {
    name: req.body.name
  }, ( err, user ) => {
    if ( err )
      throw err;
    if ( !user ) {
      res.json( { success: false, message: 'Authentication failed. User not found.' } );
    } else if ( user ) {
      // check if password matches
      if ( user.password !== req.body.password ) {
        res.json( { success: false, message: 'Authentication failed. Wrong password.' } );
      } else {
        // if user is found and password is right
        // create a token
        const token = jwt.sign( user, app.get( 'superSecret' ), {
          expiresInMinutes: 1440 // expires in 24 hours
        } );

        // return the information including token as JSON
        res.json( {
          success: true,
          message: 'Enjoy your token!',
          expiresInMinutes: 1440,
          token
        } );
      }
    }
  } );
} );

// route middleware to verify a token
apiRoutes.use( ( req, res, next ) => {
  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if ( token ) {
    // verifies secret and checks exp
    jwt.verify( token, app.get( 'superSecret' ), ( err, decoded ) => {
      if ( err ) {
        return res.json( { success: false, message: 'Failed to authenticate token.' } );
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    } );
  } else {
    // if there is no token
    // return an error
    return res.status( 403 ).send( {
      success: false,
      message: 'No token provided.'
    } );
  }
} );

// route to show a random message (GET http://localhost:8080/api/)
apiRoutes.get( '/', ( req, res ) => {
  res.json( { message: 'Welcome to the coolest API on earth!' } );
} );

// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get( '/users', ( req, res ) => {
  User.find( {}, ( err, users ) => {
    res.json( users );
  } );
} );

// apply the routes to our application with the prefix /api
app.use( '/api', apiRoutes );

// =======================
// start the server ======
// =======================
app.listen( port );
console.log( `Magic happens at http://localhost: ${port}` );