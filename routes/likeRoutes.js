const express = require('express');
const {likePost, unlikePost, getPostLikes} = require('../controllers/likeController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/:postId', protect, likePost);
router.delete('/:postId', protect, unlikePost);
router.get('/:postId', getPostLikes);


module.exports = router;