const multer=require('multer');
const path=require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Date.now()+ '-' + fileName)
    }
});

const upload=multer({storage:storage});

module.exports=upload;