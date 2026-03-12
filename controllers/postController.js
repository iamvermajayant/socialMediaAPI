const supabase = require("../config/supabase");

const createPost = async (req, res) => {
  const userId = req.user.id;
  const { content, image_url } = req.body;

  if (!content) return res.status(400).json({ error: "Content in required" });

  const { data, error } = await supabase
    .from("posts")
    .insert({ user_id: userId, content, image_url })
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json({
    message: "Post created",
    post: data,
  });
};

const getAllPosts = () => {};

const getPostById = () => {};

const updatePost = () => {};

const deletePost = () => {};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
