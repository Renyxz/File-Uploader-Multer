const path = require('path');
const multer = require('multer');



// Storage engine setup
const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: function(req, file, callback) {
        
        // Generate file name
        const fileName = `${ file.fieldname }-${ Date.now() }${ path.extname(file.originalname) }`;

        callback(null, fileName);
    }
});


// Upload setup
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function(req, file, callback) {
        checkFileType(file, callback);
    }
}).single('image');

const checkFileType = (file, callback) => {
    // File name to be checked
    const fileName = path.extname(file.originalname).toLowerCase();

    // Permitted file types
    const fileTypes = /jpeg|jpg|gif|png/;

    // Check file extension
    const fileExt = fileTypes.test(fileName);

    // Check file mimetype
    const mimetype = fileTypes.test(file.mimetype);

    // If fileExt and mimetype are true, return callback with true:
    (fileExt && mimetype) ? callback(null, true)

    // Otherwise, return callback with error message:
    : callback('Only image files are allowed to be uploaded!');
}



module.exports = upload;