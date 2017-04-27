

var fs = require('fs')

var keyWordsArr = fs.readFileSync(DATA+'/fuckWords/key.txt','utf8').split('|')

var fuckWords  = (words)=>{
    
    var flag = false
    for(var i in keyWordsArr){
	var keyWords = '\\'+keyWordsArr[i]
	var regWords = new RegExp(keyWords,"gi")
	var result = regWords.test(words)
	if(result==true){
	    console.log(regWords)
	    flag = true
	}
    }
    return flag
}



module.exports = fuckWords;
