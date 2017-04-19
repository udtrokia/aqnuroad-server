

/*
*
*
*/

var filePath = '';
var folder = ''

var  multer=require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
	folder = file.fieldname
	console.log(file.fieldname)
        cb(null, LIB+file.fieldname)
    },
    filename: function (req, file, cb) {
	var openId = req.body.openId;
        cb(null, openId );
	filePath = 'https://udtrokia.com/lib/'+file.fieldname+'?openId='+openId;
    }
});

//var upload = multer({
//    storage: storage
//});
//
//var upload=upload.single('avatar');
//
module.exports= function (req, res) {
   var type  = req.query.name
    console.log(req.query)
   var upload= multer({storage: storage}).single(type)
    upload(req, res, function (err) {
	if (err) {
            return  console.log(err);
	    }
	res.send(filePath);
    });
    
}



