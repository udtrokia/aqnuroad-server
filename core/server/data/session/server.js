

'use strict'

let app = require('express')();
let checkSession = require('./index')

app.listen('8888')
console.log('server running at 8888')
app.get('/',(req,res)=>{
    checkSession(req,res)
})
