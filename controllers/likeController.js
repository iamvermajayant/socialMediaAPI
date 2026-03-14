const supabase = require("../config/supabase");

const likePost = async () => {
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

const unlikePost = async () => {};

const getPostLikes = async () => {};

module.exports = { likePost, unlikePost, getPostLikes };
