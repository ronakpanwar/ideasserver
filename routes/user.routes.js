const {Router} = require('express');
const { signUp, signIn, getUserById, updateProfile, logOut } = require('../controller/user.controller');
const { Authenticate } = require('../midleware/authontication');
const { singleUpload } = require('../midleware/multer');

const router = Router();

router.post('/sign-up' , signUp);
router.post('/sign-in' , signIn);
router.get('/:id' , getUserById);
router.post('/profile/update', Authenticate ,singleUpload , updateProfile);
router.post('/log-out' , logOut)

module.exports = router