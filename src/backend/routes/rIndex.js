import express from 'express';
const spawn = require( 'child_process' ).spawn;
// import simplelog from 'simple-node-logger';
// import jwt from 'jsonwebtoken';
// import mail from '../mail';
// import config from '../config';
// import logdir from '../logdir';

const router = new express.Router();

// let errLog = null;
// let infoLog = null;

// logdir.checkLogDir()
//   .then( () => {
//     errLog = simplelog.createLogManager( config.errLogOpts ).createLogger();
//     infoLog = simplelog.createLogManager( config.infoLogOpts ).createLogger();
//   } );

function sshLogin() {
  return new Promise( ( resolve, reject ) => {
    const sshlogin = spawn( 'ssh', ['-tt', 'tuer@rpi01.local'] );

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
  sshLogin()
  .then( ( resolve ) => {
    res.json( { resolve: true, msg: resolve } );
  } )
  .catch( error => res.json( { resolve: false, msg: error } ) );
} );


module.exports = router;
