var fs = require('fs');

var key = fs.readFileSync("key.txt","utf8");

key = key.split(/\|/g)

fs.writeFileSync('write.txt',key)
