import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
// import expressJWT from 'express-jwt';
import rIndex from '../routes/rIndex';
// import config from '../config/config';

// import server from './server';


const app = express();

app.set( 'port', process.env.PORT || 8080 );

// laden den bodyParser
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );

// app.use( expressJWT( { secret: config.loginSecret } )
//    .unless( { path: [ '/',
//                       '/login',
//                       /^\/styles\/.*/,
//                       /^\/scripts\/.*/,
//                       /^\/images\/.*/,
//                       '/favicon.ico' ] } ) );

// View engine
app.set( 'views', `${path.resolve( __dirname, '../views' )}` );
app.set( 'view engine', 'pug' );

// Lade die Statischen Datein in die Middleware
app.use( express.static( `${path.resolve( __dirname, '../../frontend' )}` ) );

// Meine eigenen Routes werden hier bekoant gemacht
app.use( '/', rIndex );

// Error Handling
app.use( ( req, res ) => {
  res.type( 'text/plain' );
  res.status( 404 );
  res.send( '404 - Not Found' );
} );

app.use( ( err, req, res ) => {
  console.error( err.stack );
  res.type( 'text/plain' );
  res.status( 500 );
  res.send( '500 - Internal error' );
} );

app.listen( app.get( 'port' ), () => {
  console.log( `Express ready on http://localhost:${app.get( 'port' )}` );
} );


// exports.start = () => {
//
// };
