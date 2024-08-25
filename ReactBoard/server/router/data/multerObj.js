const multer = require("multer");
const path = require("path");

const multerObj = multer({
    storage: multer.diskStorage({
        destination(req, file, done) { 
            done(null, 'uploads/');
        },
        filename(req, file, done) { 
            const ext = path.extname(file.originalname);
            const fn = path.basename(file.originalname, ext) + Date.now() + ext;
            done(null, fn); 
        },
    }),
    limits: {
        fileSize: 5 * 1024 * 1024, 
    },
});

module.exports = multerObj;