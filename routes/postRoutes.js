const express = require('express');
const {createPost, getAllPosts, getPostById, updatePost, deletePost} = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');



const router = express.Router();

router.post('/', protect, createPost);
router.get('/', getAllPosts)
router.get('/:id', getPostById);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);

module.exports = router;