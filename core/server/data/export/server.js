

'use strict'

global.api = {};

let Export = require('./index');
let http   = require('http');
let app    = require('express')();



app.listen('8888')
console.log('server running at localhost:8888');

app.get('/',(req, res)=>{
    console.log(req.body);
    res.end()
})
