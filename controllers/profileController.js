const supabase = require('../config/supabase');


const getProfile = async (req,res) => {
    const {id} = req.params;

    const {data, error} = await supabase.from('profiles').select('*').eq('id', id).single();

    if(error) return res.status(404).json({error : 'Profile not found'});

    res.status(200).json({profile : data});
}


const updateProfile = async() => {
    const userId = req.user.id;
    const {username, full_name, bio, avatar_url} = req.body;

    const {data, error} = await supabase.from('profiles').update({
      username,
      full_name,
      bio,
      avatar_url,
      updated_at : new Date()  
    }).eq('id', userId).select().single()

    if(error) return res.status(400).json({error : error.message})

    res.status(200).json({message : 'Profile Updated !', profile : data}) 
    
}


module.exports = {getProfile, updateProfile}