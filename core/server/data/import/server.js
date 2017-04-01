'use strict'

let app = require('express')();
let Import = require('./index');
let bodyParser=require('body-parser');
let jsonParser = bodyParser.json();
let urlencodedParser = bodyParser.urlencoded({extended: false}); 
let querystring = require('querystring');
let util = require('util');
let url = require('url');


app.listen('8888');
console.log('server running at 8888');


app.get('/',(req, res)=>{
    console.log(typeof(req.query))
})
