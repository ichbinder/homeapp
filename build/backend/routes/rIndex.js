'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var spawn = require('child_process').spawn;
// import simplelog from 'simple-node-logger';
// import jwt from 'jsonwebtoken';
// import mail from '../mail';
// import config from '../config';
// import logdir from '../logdir';

var router = new _express2.default.Router();

// let errLog = null;
// let infoLog = null;

// logdir.checkLogDir()
//   .then( () => {
//     errLog = simplelog.createLogManager( config.errLogOpts ).createLogger();
//     infoLog = simplelog.createLogManager( config.infoLogOpts ).createLogger();
//   } );

function sshLogin() {
  return new Promise(function (resolve, reject) {
    var sshlogin = spawn('ssh', ['-tt', 'tuer@rpi01.local']);

    sshlogin.stdout.on('data', function (data) {
      resolve(data);
      console.log('stdout: ' + data);
    });

    sshlogin.stderr.on('data', function (data) {
      reject(data);
      console.log('stderr: ' + data);
    });

    sshlogin.on('close', function (code) {
      console.log('child process exited with code ' + code);
    });
  });
}

router.get('/', function (req, res) {
  res.render('pIndex');
});

router.get('/tuer', function (req, res) {
  sshLogin().this(function (resolve) {
    res.json({ resolve: true, msg: resolve });
  }).catch(function (error) {
    return res.json({ resolve: false, msg: error });
  });
});

module.exports = router;