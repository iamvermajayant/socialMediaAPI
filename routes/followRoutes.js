const express = require('express')
const {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing
} = require('../controllers/followController')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Follow
 *   description: Follow and unfollow users
 */

/**
 * @swagger
 * /api/follow/{userId}:
 *   post:
 *     summary: Follow a user
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: User followed successfully
 *       400:
 *         description: Already following or cannot follow yourself
 */

router.post('/:userId',              protect, followUser)    // protected

/**
 * @swagger
 * /api/follow/{userId}:
 *   delete:
 *     summary: Unfollow a user
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User unfollowed successfully
 *       400:
 *         description: Not following this user
 */
router.delete('/:userId',            protect, unfollowUser)  // protected


/**
 * @swagger
 * /api/follow/{userId}/followers:
 *   get:
 *     summary: Get all followers of a user
 *     tags: [Follow]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns followers list with total count
 */
router.get('/:userId/followers',              getFollowers)  // public


/**
 * @swagger
 * /api/follow/{userId}/following:
 *   get:
 *     summary: Get all users someone is following
 *     tags: [Follow]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns following list with total count
 */
router.get('/:userId/following',              getFollowing)  // public

module.exports = router