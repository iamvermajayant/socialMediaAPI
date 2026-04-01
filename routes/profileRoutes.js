const express = require('express');
const {getProfile, updateProfile} = require('../controllers/profileController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Profile
 *  description: User Profile Management
 * 
 */

/**
 * @swagger
 * /api/profile/{id}
 * 
 * get:
 *  summary: Get any user Profiles by ID
 *  tags : [Profile]
 *  security: []
 *  parameters:
 *      - in: path
 *        name: id
 *        required:true
 *        schema:
 *          type:string
 *        description: User UUID
 *  responses:
 *      200: 
 *        description: 
 * 
 */
router.get('/:id', getProfile);

/**
 * @swagger
 * /api/profile/update:
 *  put:
 *     summary:Update your own profile 
 *     tags : [Profile]
 *     security: 
 *          - bearerAuth:[]
 *     requestBody:
 *        content:
 *          application/json:
 *              schema:
 *                  type:object
 *                  properties:
 *                      username:
 *                          type:string
 *                          example:john_doe
 *                      full_name:
 *                          type:string
 *                          example:John Doe
 *                      bio:
 *                          type:string
 *                          example: Hello I am john 
 *                      avatar_url:
 *                          type:string
 *                          example: https://example.com/avataer.png
 *      responses:
 *        200:
 *          description:Profile Updated successfully
 *        400:
 *          description:Bad Request  
 */
router.put('/update', protect, updateProfile);


module.exports = router;