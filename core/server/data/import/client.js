
'use strict'

let request = require('request');

request.get('http://localhost:8888/?name=fred&tel=0926xxx572', {form:{key:'valuee'}})
