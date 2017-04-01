/*
*
*
*@recive data@client
*@throw data@db
*
**/
'use strict'


let MongoClient = require('mongodb').MongoClient;
let dbApi = require('../../api/db');


//main func
let Import = (req,res)=>{
    //local define;
    let data       = req.query;        
    let dbName     = 'aqnuroad';// ##<postData>
    let collection = 'postData';// ##<posts>
    let DB_CONN_STR = 'mongodb://localhost:27017/aqnuroad'; // ##<http://localhost:27017>

    //connect db
    MongoClient.connect(DB_CONN_STR, (err,db)=>{
	db = db.db(dbName);
	db_insert(db);
	db.close();
    })
    let db_insert =(db)=>{
	dbApi.insertData(db, collection, data, (result)=>{})
    }
    
}


//helper

module.exports = Import;
