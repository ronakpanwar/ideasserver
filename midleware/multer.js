const multer = require('multer');

const storage = multer.memoryStorage();

const singleUpload = multer({storage}).single('img');

module.exports ={ singleUpload };
