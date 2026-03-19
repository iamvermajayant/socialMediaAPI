const supabase = require("../config/supabase");
const { post } = require("../routes/authRoutes");

//create a comment

const createComment = async (req, res) => {
  const userId = req.user.id;
  const { postId } = req.params;
  const { content } = req.body;

  if (!content) return res.status(400).json({ error: "Content is required" });

  //check if posts exists

  const { data: post } = await supabase
    .from("posts")
    .select("id")
    .eq("id", postId)
    .single();

  if (!post) return res.status(400).json({ error: "Post Not found" });

  const { data, error } = await supabase
    .from("comments")
    .insert({ user_id: userId, post_id: postId, content })
    .select("* , profiles(id, username, avatar_url)")
    .single();

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json({ message: "comment added", comment: data });
};

const getAllComments = async (req, res) => {
  const { postId } = req.params;

  const { data, error, count } = await supabase
    .from("comments")
    .select("*, profiles(id,username, avatar_url)", { count: "exact" })
    .eq("post_id", postId)
    .order("created_at", { ascending: false });

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json({ total_comments: count, comments: data });
};
