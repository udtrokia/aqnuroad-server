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

    let api = req.query.api;
    let whereStr = req.query.whereStr;
    let collection = req.query.col;
    let DB_CONN_STR = mongodbConfig.DB_CONN_STR;

    //connect
    MongoClient.connect(DB_CONN_STR, (err, db)=>{

        db = db.db(dbName);
	switch(api){
	case "refresh":	  
	    db_refresh(db);
	    break;
	case "loadmore":
	    db_loadmore(db);
	    break;
	case "select":
	    db_select(db);
	    break;
	}

    });

    //helper
    let db_loadmore = (db)=>{
	dbApi.select.loadmore(db, collection, {}, page, (result)=>{
	    res.json(result);
	})
    }

    let db_refresh = (db)=>{
	dbApi.select.refresh(db, collection, {}, page, (result)=>{
	    res.json(result)
	})
    }

    let db_select = (db)=>{
	whereStr = JSON.parse(whereStr)
	dbApi.select.select(db, collection, whereStr, (result)=>{
	    res.json(result)
	})
    }

}


module.exports = Export;



