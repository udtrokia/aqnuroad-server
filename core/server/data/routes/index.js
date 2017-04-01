//I`m router

'use strict'

let Import     = require(DATA+'import');
let Export     = require(DATA+'export');
let onLogin = require(DATA+'onLogin');
let checkSession = require(DATA+'session');

let routes=(app)=>{

    app.use(checkSession);

    app.get('onLogin',(req,res)=>{
	onLogin(req,res);
    })
    
    app.get('/import',(req,res)=>{
	Import(req,res);
    });

    app.get('/export',(req,res)=>{
	Export(req,res);
    });

    

}

module.exports = routes;
