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

const getPostComments = async (req, res) => {
  const { postId } = req.params;

  const { data, error, count } = await supabase
    .from("comments")
    .select("*, profiles(id,username, avatar_url)", { count: "exact" })
    .eq("post_id", postId)
    .order("created_at", { ascending: false });

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json({ total_comments: count, comments: data });
};


// UPDATE a comment
const updateComment = async (req, res) => {
  const userId = req.user.id
  const { id } = req.params
  const { content } = req.body

  if (!content) return res.status(400).json({ error: 'Content is required' })

  // check if comment belongs to user
  const { data: existing } = await supabase
    .from('comments')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single()

  if (!existing) return res.status(403).json({ error: 'Not authorized to update this comment' })

  const { data, error } = await supabase
    .from('comments')
    .update({ content, updated_at: new Date() })
    .eq('id', id)
    .select()
    .single()

  if (error) return res.status(400).json({ error: error.message })
  res.status(200).json({ message: 'Comment updated!', comment: data })
}

// DELETE a comment
const deleteComment = async (req, res) => {
  const userId = req.user.id
  const { id } = req.params

  // check if comment belongs to user
  const { data: existing } = await supabase
    .from('comments')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single()

  if (!existing) return res.status(403).json({ error: 'Not authorized to delete this comment' })

  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', id)

  if (error) return res.status(400).json({ error: error.message })
  res.status(200).json({ message: 'Comment deleted!' })
}

module.exports = { createComment, getPostComments, updateComment, deleteComment }