

var fs = require('fs')

var keyWordsArr = fs.readFileSync('./arr.txt','utf8').split(',')

var fuckWords  = (words)=>{
    
    var flag = false
    for(var i in keyWordsArr){
	var regWords = new RegExp(keyWordsArr[i],"i")
	var result = regWords.test(words)
	if(result==true){
	    console.log(regWords)
	    flag = true
	}
    }
    return flag
}



module.exports = fuckWords;
