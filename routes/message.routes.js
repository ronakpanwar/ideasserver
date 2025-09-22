const {Router} = require('express');
const { sendMessage, getMyMessage } = require('../controller/message.controller');
const { Authenticate } = require('../midleware/authontication');

const router = Router();

router.post('/send/:id' , sendMessage);
router.get('/my' , Authenticate , getMyMessage)

module.exports = router;