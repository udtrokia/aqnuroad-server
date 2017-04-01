'use strict'
//　aqnuroad-server;

global.API  = __dirname+'/api';
global.DATA = __dirname+'/data/';
global.api = {}



//node_module
let fs = require('fs');
let app = require('express')();
let https = require('https');
const privateKey = fs.readFileSync('','');
const certificate = fs.readFileSync('','');
const credentials = {
    key: fs.readFileSync('../../ssl/214061262970155.key'),
    cert: fs.readFileSync('../../ssl/214061262970155.pem')
}

const httpsServer = https.createServer(credentials, app);
console.log('server running at 8888')
let routes = require(DATA+'routes');


routes(app);
