'use strict'
//let MongoClient = require('mongodb').MongoClient;
//let DB_CONN_STR = 'mongodb://localhost:27017/aqnuroad';//use db aqnuroad

// insert
let dbApi = {

    insert : (db, table, data, callback)=>{
        //link table
        let collection = db.collection(table);
        //insert
        collection.insert(data, (err, result)=>{
    	if(err){
    	    console.log('Error:'+err);
    	    return;
    	}
    	    callback(result);
        });
    },
    select :{
	// select
	select : (db, table, whereStr, callback)=>{
	    //link table
	    let collection = db.collection(table);
	    //select
//	    whereStr = JSON.parse(whereStr);
	    collection.find(whereStr).toArray((err,result)=>{
		if(err){
		    console.log('Error: '+err);
		    return;
		}
		callback(result);
		db.close;
	    })
	},
	
	refresh : (db, table, whereStr, page, callback)=>{
            //link table
            let collection = db.collection(table);
            //select
//	    whereStr = JSON.parse(whereStr)
            collection.find(whereStr).sort({date:-1,name:-1}).limit(5*page).toArray((err,result)=>{
    		if(err){
    		    console.log('Error: '+err);
    		    return;
    		}
    		callback(result);
    		db.close;
            })
	},
	loadmore : (db, table, whereStr, page, callback)=>{
	    //link table
	    let collection = db.collection(table);
	    page += page;
	    whereStr = JSON.parse(whereStr)
	    //select
	    collection.find(whereStr).sort({date:-1,name:-1}).limit(5).skip(page).toArray((err, result)=>{
		if(err){
		    console.log('Error:'+err);
		    return;
		}
		callback(result);
		db.close;
	    })
	}
    },
    // update
    
    update : (db, table, whereStr, updateStr, callback)=>{
        //link table
        let collection = db.collection(table);
        //update data
	whereStr = JSON.parse(whereStr)
        collection.update(whereStr, updateStr, {upsert:true},(err, result)=>{
	    if(err){
		console.log("UPDATE ERR: "+err);
		return;
	    }
    	    callback(result);		
	});
    },
    
    // delete
    
    del : (db, table, whereStr, callback)=>{
        //link to table
        let collection = db.collection(table);
        //delete
	whereStr  = JSON.parse(whereStr)
        collection.remove(whereStr, (err,result)=>{
    	    if(err){
    		console.log('Error:'+err);
    		return;
    	    }
    	    callback(result);
        })
    }
}

//exports

module.exports = dbApi;



//MongoClient.connect(DB_CONN_STR, (err, db)=>{
//    console.log('connect success!');
//    delData(db, (result)=>{
//	console.log(result)
//	db.close();
//    })
//})



