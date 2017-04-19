//I`m router

'use strict'

let Import     = require(DATA+'import');
let Export     = require(DATA+'export');
let upload     = require(DATA+'upload')
let onLogin    = require(DATA+'onLogin');
let returnFile = require(DATA+'returnFile')

let routes=(app)=>{


    app.get('/onLogin', (req,res)=>{
	onLogin(req,res);
    })
    
    app.get('/import', (req,res)=>{
	Import(req,res);
    });

    app.get('/export', (req,res)=>{
	Export(req,res);
    });

    app.get('/lib/:libFolder', (req,res)=>{
	returnFile(req,res);
    })

    app.post('/upload', upload)


}

module.exports = routes;
