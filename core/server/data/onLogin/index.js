/**			
  *
*@params?req&res
*@func?makeRandom&retSession
*@get code@client, change code to openid&session_key@wxServer, res mySession to client;
*@exports=retSession@JSON
*
**/

'use strict'

let https = require('https');
let redisClient = require('redis').createClient();
let session;

//#main func#
let checkSession = (req, res)=>{
 	console.log('now checking session!')   
    req.query.session?expireSession(req,res):retSession(req,res);
}

//##

let parseRes = (wxRes,callback)=>{
    wxRes.setEncoding('utf8');
    let rawData = '';
	let parsedData;
	wxRes.on('data', (chunk) =>{ 
		rawData += chunk
    });
    wxRes.on('end', () => {
		try {
		    parsedData = JSON.parse(rawData);
			callback(parsedData);
		} catch (e) {
		    console.log(e.message);
		}
    });
}

let makeSession = () =>{
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    let random = '';
    for(let i=0; i<16; i++){
	let rnum = Math.floor(Math.random()*chars.length);
	random += chars.substring(rnum,rnum+1);	    
    }
    return random;
}


let retSession  = (req,res)=>{
    
	//console.log(req.data)
    let APPID   = wxSession.APPID;
    let SECRET  = wxSession.SECRET;
    let JSCODE  = req.query.code;
	console.log(JSCODE)

    https.get("https://api.weixin.qq.com/sns/jscode2session?appid="+APPID+"&secret="+SECRET+"&js_code="+JSCODE+"&grant_type=authorization_code",(wxRes)=>{
		
	
		let session = parseRes(wxRes, (parsedData)=>{
	  	    if(parsedData.openid&&parsedData.session_key){
				let mySession = makeSession();
				redisClient.set(mySession,parsedData.openid+parsedData.session_key);
	   			console.log('insert success')
	  			session = {
				    'SESSID' : mySession,
	  			}
	  			return session;
	  	    }else{
				return('err');
			}
		})

    })

	res.json(session)
	
}


let expireSession = (req, res)=>{
    let reqSession = req.query.session;
    redisClient.get(reqSession,(err,reply)=>{
		if(reply){
			 redisClient.expire(reqSession,60*60*24*3)//3 days
			 res.end()
		}else{
		    retSession();
		}
	})
    
    //helper
}



module.exports = checkSession;

