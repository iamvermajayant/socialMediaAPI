const express = require('express');
const {signUp, signIn, signOut, getMe } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');


const router = express.Router();

router.post('/signup' , signUp);
router.post('/signin', signIn);
router.post('/signout', signOut);
router.get('/me', protect, getMe);

module.exports = router;