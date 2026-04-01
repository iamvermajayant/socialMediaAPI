const supabase = require('../config/supabase')

// FOLLOW a user
const followUser = async (req, res) => {
  const followerId = req.user.id
  const { userId } = req.params

  // cannot follow yourself
  if (followerId === userId) return res.status(400).json({ error: 'You cannot follow yourself' })

  // check if user exists
  const { data: user } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', userId)
    .single()

  if (!user) return res.status(404).json({ error: 'User not found' })

  // check if already following
  const { data: existing } = await supabase
    .from('follows')
    .select('*')
    .eq('follower_id', followerId)
    .eq('following_id', userId)
    .single()

  if (existing) return res.status(400).json({ error: 'Already following this user' })

  const { data, error } = await supabase
    .from('follows')
    .insert({ follower_id: followerId, following_id: userId })
    .select()
    .single()

  if (error) return res.status(400).json({ error: error.message })
  res.status(201).json({ message: 'User followed!', follow: data })
}

// UNFOLLOW a user
const unfollowUser = async (req, res) => {
  const followerId = req.user.id
  const { userId } = req.params

  // check if following
  const { data: existing } = await supabase
    .from('follows')
    .select('*')
    .eq('follower_id', followerId)
    .eq('following_id', userId)
    .single()

  if (!existing) return res.status(400).json({ error: 'You are not following this user' })

  const { error } = await supabase
    .from('follows')
    .delete()
    .eq('follower_id', followerId)
    .eq('following_id', userId)

  if (error) return res.status(400).json({ error: error.message })
  res.status(200).json({ message: 'User unfollowed!' })
}

// GET followers of a user
const getFollowers = async (req, res) => {
  const { userId } = req.params

  const { data, error, count } = await supabase
    .from('follows')
    .select('*, profiles!follower_id(id, username, avatar_url)', { count: 'exact' })
    .eq('following_id', userId)

  if (error) return res.status(400).json({ error: error.message })
  res.status(200).json({ total_followers: count, followers: data })
}

// GET following of a user
const getFollowing = async (req, res) => {
  const { userId } = req.params

  const { data, error, count } = await supabase
    .from('follows')
    .select('*, profiles!following_id(id, username, avatar_url)', { count: 'exact' })
    .eq('follower_id', userId)

  if (error) return res.status(400).json({ error: error.message })
  res.status(200).json({ total_following: count, following: data })
}

module.exports = { followUser, unfollowUser, getFollowers, getFollowing }