const {Router} = require('express');
const { Authenticate } = require('../midleware/authontication');
const { addPost, allPosts, userPosts, postById } = require('../controller/post.controller');
const { singleUpload } = require('../midleware/multer');

const router = Router();

router.post('/add-post' , Authenticate , singleUpload, addPost);
router.get('/all-post' , allPosts);
router.get('/user-post' ,Authenticate, userPosts);
router.get('/:id' , postById)

module.exports = router;