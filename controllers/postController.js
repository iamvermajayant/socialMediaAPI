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

const getAllPosts = async (req, res) => {
  const { data, error } = await supabase
    .from("posts")
    .select('*, profiles(id, username, avatar_url)')
    .order("created_at", { ascending: false });

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json({ post: data });
};

const getPostById = async (req,res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles(id, username, avatar_url)")
    .eq("id", id)
    .single();

  if (error) return res.status(404).json({ error: "post not found" });

  res.status(200).json({ post: data });
};

const updatePost = async(req, res) => {
  const {id} = req.params;
  const userId = req.user.id; 

  const {content, image_url} = req.body;

  const {data : existing} = await supabase.from('posts').select('*').eq('id',id).select().single()

  if(error) return res.status(400).json({error : error.message})

  res.status(200).json({
    message : 'Post Updated', post :data
  })
};

const deletePost = async (req, res) => {
  const {id} = req.params;
  const userId = req.user.id;

  const {data : existing} = await supabase.from('posts').select('*').eq('id', id).eq('user_id' , userId).single();

  if(!existing) return res.status(403).json({error : 'Not authorized to delete this post'})

  const {error} = await supabase.from('posts').delete().eq('id',id)

  if(error) return res.status(400).json({error : error.message});

  res.status(200).json({message : 'Post deleted'})
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
