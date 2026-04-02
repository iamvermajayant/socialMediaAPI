const express = require('express');
const {likePost, unlikePost, getPostLikes} = require('../controllers/likeController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: Post likes management
 */

/**
 * @swagger
 * /api/likes/{postId}:
 *   post:
 *     summary: Like a post
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Post liked successfully
 *       400:
 *         description: Already liked
 */


router.post('/:postId', protect, likePost);


/**
 * @swagger
 * /api/likes/{postId}:
 *   delete:
 *     summary: Unlike a post
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post unliked successfully
 *       400:
 *         description: Not liked yet
 */
router.delete('/:postId', protect, unlikePost);

/**
 * @swagger
 * /api/likes/{postId}:
 *   get:
 *     summary: Get all likes on a post
 *     tags: [Likes]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns likes with total count
 */
router.get('/:postId', getPostLikes);


module.exports = router;