/*
*
*
*response lists
*
*/
'use strict'


//node_modules


let MongoClient = require('mongodb').MongoClient;
let dbApi = require('../../api/db');


//main
let Export = (req, res)=>{

    let page = req.query.page;
    let dbName = mongodbConfig.dbName;
    let collection = mongodbConfig.collection;
    let DB_CONN_STR = mongodbConfig.DB_CONN_STR;
    
    //connect
    MongoClient.connect(DB_CONN_STR, (err, db)=>{
	console.log('success')
        db = db.db(dbName);
	req.query.refresh?db_refresh(db):db_load(db);

    });

    //helper
    let db_load　= (db)=>{
		dbApi.select.loadmore(db, collection, {}, page, (result)=>{
//		    console.log(result);
		    res.json(result);
		})
    }

    let db_refresh = (db)=>{
		dbApi.select.refresh(db, collection, {}, page, (result)=>{
		    res.json(result)
		})
    }


}


module.exports = Export;



