const express = require('express');
const {createComment, getPostComments, updateComment, deleteComment} = require('../controllers/commentController') 
const protect= require('../middleware/authMiddleware');


const router = express.Router();

router.post('/:postId', protect, createComment)
router.get('/:postId', getPostComments)
router.put('/:id', protect, updateComment)
router.delete('/:id', protect, deleteComment)

module.exports = router;
