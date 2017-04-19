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
    let dbName     = mongodbConfig.dbName;// ##<postData>
    let whereStr = data.whereStr;
    let updateStr = data;
    let switchApi  = data.api;
    let collection = data.col;// ##<posts>
    let DB_CONN_STR = mongodbConfig.DB_CONN_STR; // ##<http://localhost:27017>

    //connect db
    MongoClient.connect(DB_CONN_STR, (err,db)=>{

	console.log(req.query)
	db = db.db(dbName);
	switch(switchApi){
	case "insert":
	    db_insert(db);
	    break;
	case "update":
	    db_update(db);
	    break;
	case "del":
	    db_del(db);
	}

	db.close();
    })

    let db_insert =(db)=>{
	dbApi.insert(db, collection, data, (result)=>{})
    }

    let db_update = (db)=>{
	dbApi.update(db, collection, whereStr, updateStr,(result)=>{})
    }

    let db_del = (db)=>{
	db.Api.del(db, collection, whereStr, (result)=>{})
    }
}


//helper

module.exports = Import;


