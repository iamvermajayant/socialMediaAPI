const express = require('express');
const {createComment, getPostComments, updateComment, deleteComment} = require('../controllers/commentController') 
const protect= require('../middleware/authMiddleware');


const router = express.Router();

/**
 * @swagger 
 * tags:
 *  name:Comments
 *  description:Post comments Management
 */


/**
 * @swagger
 * /api/comments/{postId}:
 *   post:
 *     summary: Add a comment to a post
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content]
 *             properties:
 *               content:
 *                 type: string
 *                 example: Great post!
 *     responses:
 *       201:
 *         description: Comment added successfully
 *       400:
 *         description: Bad request
 */
router.post('/:postId', protect, createComment)


/**
 * @swagger
 * /api/comments/{postId}:
 *   get:
 *     summary: Get all comments on a post
 *     tags: [Comments]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns comments with total count
 */
router.get('/:postId', getPostComments)

/**
 * @swagger
 * /api/comments/{id}:
 *   put:
 *     summary: Update your own comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content]
 *             properties:
 *               content:
 *                 type: string
 *                 example: Updated comment!
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       403:
 *         description: Not authorized
 */
router.put('/:id', protect, updateComment)

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Delete your own comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       403:
 *         description: Not authorized
 */
router.delete('/:id', protect, deleteComment)

module.exports = router;
