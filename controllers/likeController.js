const supabase = require("../config/supabase");

const likePost = async (req, res) => {
  const userId = req.user.id;
  const { postId } = req.params;

  const { data: post } = await supabase
    .from("posts")
    .select("id")
    .eq("id", postId)
    .single();

  if (!post) return res.status(404).json({ error: "Post not found" });

  const { data: existing } = await supabase
    .from("likes")
    .select("id")
    .eq("user_id", userId)
    .eq("post_id", postId)
    .single();

  if (existing) return res.status(400).json({ error: "Post already liked" });

  const { data, error } = await supabase
    .from("likes")
    .insert({ user_id: userId, post_id: postId })
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json({ message: "Post liked !", like: data });
};

const unlikePost = async (req, res) => {
  const userId = req.user.id;
  const { postId } = req.params;

  const { data: existing } = await supabase
    .from("likes")
    .select(id)
    .eq("user_id", userId)
    .eq("post_id", postId)
    .single();

  if (!existing)
    return res.status(400).json({ error: "You have not liked this post" });

  const { error } = await supabase
    .from("likes")
    .delete()
    .eq("user_id", userId)
    .eq("post_id", postId);

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json({ message: "Post Unliked!" });
};

const getPostLikes = async (req, res) => {
  const { postId } = req.params;

  const { data, error, count } = await supabase
    .from("likes")
    .select("*, profiles(id,username, avatar_url)", { count: "exact" })
    .eq("post_id", postId);

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json({ total_likes: count, likes: data });
};

module.exports = { likePost, unlikePost, getPostLikes };
