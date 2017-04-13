'use strict'
//　aqnuroad-server;




//node_module
let fs = require('fs');
let app = require('express')();
let https = require('https');
let config = require('config');


//globaldir
global.API  = __dirname+'/api';
global.DATA = __dirname+'/data/';


global.httpsConfig = config.get('https') 
global.mongodbConfig = config.get('mongoDb')
global.wxSession = config.get('wxSession')


//main
let routes = require(DATA+'routes');

const credentials = {
    key: fs.readFileSync(httpsConfig.key_dir),
    cert: fs.readFileSync(httpsConfig.cert_dir)
}
const httpsServer = https.createServer(credentials, app).listen(443)

console.log('server running at 443')

routes(app);




