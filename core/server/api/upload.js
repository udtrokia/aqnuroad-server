
'use strict'

let multer=require('multer');
let storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, DATA+'/lib/uploads/avatar')
    }, 

    filename: function (req, file, cb) {
        let fileFormat = (file.originalname).split(".");
	let savePath = file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1];
        cb(null, savePath);
    }
});  

var upload = multer({
    storage: storage
});


module.exports = upload;
