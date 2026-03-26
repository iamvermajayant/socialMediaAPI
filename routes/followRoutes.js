const express = require('express')
const {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing
} = require('../controllers/followController')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/:userId',              protect, followUser)    // protected
router.delete('/:userId',            protect, unfollowUser)  // protected
router.get('/:userId/followers',              getFollowers)  // public
router.get('/:userId/following',              getFollowing)  // public

module.exports = router