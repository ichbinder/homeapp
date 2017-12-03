import express from 'express';
const spawn = require( 'child_process' ).spawn;
// import simplelog from 'simple-node-logger';
import jwt from 'jsonwebtoken';
// import mail from '../mail';
// import config from '../config';
// import logdir from '../logdir';

const router = new express.Router();

const config = {};

config.loginPW = '4tn37L';
config.loginSecret = 'Willkommen zu Hause ! /jd$#+w';


function sshLogin( sshCommand ) {
  return new Promise( ( resolve, reject ) => {
    const sshlogin = spawn( 'ssh', ['-tt', sshCommand] );

    sshlogin.stdout.on( 'data', ( data ) => {
      resolve( data );
      console.log( `stdout: ${data}` );
    } );

    sshlogin.stderr.on( 'data', ( data ) => {
      reject( data );
      console.log( `stderr: ${data}` );
    } );

    sshlogin.on( 'close', ( code ) => {
      console.log( `child process exited with code ${code}` );
    } );
  } );
}

router.get( '/', ( req, res ) => {
  res.render( 'pIndex' );
} );

router.get( '/tuer', ( req, res ) => {
  sshLogin( 'summer' )
  .then( ( resolve ) => {
    console.log( 'Tüer: ', resolve );
    res.json( { resolve: true, msg: resolve } );
  } )
  .catch( error => res.json( { resolve: false, msg: error } ) );
} );

router.get(
  '/homeDoor',
  jwt( { secret: config.loginSecret } ),
  ( req, res ) => {
    sshLogin( 'homeDoorOpen' )
    .then( ( resolve ) => {
      console.log( 'Tüer: ', resolve );
      res.json( { resolve: true, msg: resolve } );
    } )
    .catch( error => res.json( { resolve: false, msg: error } ) );
  } );

router.post( '/login', ( req, res ) => {
  if ( !req.body.pw ) {
    res.status( 400 ).json( {
      message: 'Bitte geben sie den Zugangscode ein.',
      error: true
    } );
  } else {
    if ( config.loginPW !== req.body.pw ) {
      res.status( 401 ).json( {
        message: 'Der Zugangscode war falsch.',
        error: true
      } );
    } else {
      const tokenJwt = jwt.sign( { pw: req.body.pw }, config.loginSecret );
      res.status( 200 ).json( {
        message: 'Der Login war erfolgreich.',
        error: false,
        token: tokenJwt
      } );
    }
  }
} );

module.exports = router;
