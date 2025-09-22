const dataUriParser = require('datauri/parser')
const path = require('path');

const parser = new dataUriParser();

const getDataUri = (file)=>{
    if (!file || typeof file !== 'object') {
        throw new TypeError('Expected file to be an object');
    }
    if (!file.originalname || !file.buffer) {
        throw new TypeError('File object must have originalname and buffer properties');
    }
    
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer);
}

module.exports = getDataUri;