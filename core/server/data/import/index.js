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
let fuckWords = require(DATA+'/fuckWords')
let fs = require('fs')


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
    let keyWordsArr = [data.msg,data.name,data.sex,data.age,data.weChat,data.hobby,data.desire,data.word,data.stuff,data.need,data.staff]


    for(var i in keyWordsArr){
	var checkWords = fuckWords(keyWordsArr[i])
	if(checkWords==true){
	    console.log('it works!!!!!')
	    res.end(false)
	    return
	}

    }





    //connect db
    MongoClient.connect(DB_CONN_STR, (err,db)=>{

	db = db.db(dbName);
	switch(switchApi){
	case "insert":
	    db_insert(db);
	    break;
	case "update":
	    if(data.weChat){
		db_update(db);
	    }else{
		db_del(db)
	    }
	    break;
	case "del":
	    db_del(db);
	}

	db.close();
	res.end('success')
    })

    let db_insert =(db)=>{
	dbApi.insert(db, collection, data, (result)=>{})
    }

    let db_update = (db)=>{
	dbApi.update(db, collection, whereStr, updateStr,(result)=>{})
    }

    let db_del = (db)=>{
	dbApi.del(db, collection, whereStr, (result)=>{
	})
    }


}


//helper

module.exports = Import;


