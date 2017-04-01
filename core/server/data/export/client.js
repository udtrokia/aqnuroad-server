'use strict'

var app = require('express')();
var http = require('http');





//http.get('http://localhost:8888/',(res)=>{console.log(res)})
http.get('http://localhost:8888/', (res) => {

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => rawData += chunk);
    res.on('end', () => {
	try {
	    let parsedData = JSON.parse(rawData);
	    console.log(parsedData);
	} catch (e) {
	    console.log(e.message);
	}
    });
}).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
});
