const express = require('express');
const {signUp, signIn, signOut, getMe } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');


const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: john1234
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
router.post('/signup' , signUp);

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Login and get access token
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: john1234
 *     responses:
 *       200:
 *         description: Login successful returns access token
 *       401:
 *         description: Invalid credentials
 */
router.post('/signin', signIn);


/**
 * @swagger
 * /api/auth/signout:
 *   post:
 *     summary: Logout current user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       400:
 *         description: Error logging out
 */
router.post('/signout', signOut);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current logged in user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns current user info
 *       401:
 *         description: Unauthorized
 */
router.get('/me', protect, getMe);

module.exports = router;