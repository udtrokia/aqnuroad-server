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
let WXBizDataCrypt = require(DATA+'decipher')


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

let makeSession = (res,SESSION,userInfo) =>{
    console.log('make newSession')
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    let random = '';
    for(let i=0; i<16; i++){
	let rnum = Math.floor(Math.random()*chars.length);
	random += chars.substring(rnum,rnum+1);	    
    }
    SESSION = random
    let resData={
	'session':SESSION,
	'userInfo':userInfo
    }
    res.json(resData)

}

let expireSession = (res,SESSION,userInfo)=>{
    
    console.log('expireSession')
    redisClient.get(SESSION,(err,reply)=>{
	if(reply){
	    
	    redisClient.expire(SESSION,60*60*24*3)//3 days
	    console.log('has reply: '+SESSION)

	    let resData={
		'session':SESSION,
		'userInfo':userInfo
	    }
	    res.json(resData)
	    
	}else{
	    console.log(err)
	    return makeSession(res,SESSION,userInfo);
	}
    })
}


let retSession  = (req,res)=>{
    
    //console.log(req.data)
    let APPID   = wxSession.APPID;
    let SECRET  = wxSession.SECRET;
    let JSCODE  = req.query.code;
    let iv      = req.query.iv;
    let SESSION = req.query.session;
    let encryptedData = req.query.encryptedData;
    
    https.get("https://api.weixin.qq.com/sns/jscode2session?appid="+APPID+"&secret="+SECRET+"&js_code="+JSCODE+"&grant_type=authorization_code",(wxRes)=>{
	
	parseRes(wxRes, (parsedData)=>{
	    if(parsedData.openid&&parsedData.session_key){

		let sessionKey = parsedData.session_key;
		let openId = parsedData.openid;
		let userInfo = new WXBizDataCrypt(APPID,sessionKey).decryptData(encryptedData , iv)

		redisClient.set(SESSION,openId+sessionKey);
//		makeSession(res,SESSION,userInfo)		
		SESSION?expireSession(res,SESSION,userInfo):makeSession(res,SESSION,userInfo)
				 
	    }else{
		return('err');
	    }
	})

    })
}





module.exports = retSession;

