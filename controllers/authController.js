const supabase = require("../config/supabase");

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ message: "User created", user: data.user });
};


const signIn = async (req,res) => {
    const {email, password} = req.body;
    const {data, error} = await supabase.auth.signInWithPassword({email, password});

    if(error) return res.status(401).json({error : error.message})

    res.status(200).json({message: 'Logged in !!', session : data.session})    
} 


const signOut =  async (req,res) => {
    const {error} = await supabase.auth.signOut();

    if(error) return res.status(400).json({error : error.message})

    res.status(200).json({message : 'Logged out successfully'})   
}


const getMe = async (req,res) => {
    const token = req.headers.authorization?.split(' ')[1]
    const {data, error} = await supabase.auth.getUser(token);

    if(error) return res.status(401).json({error : 'Unauthorized'});

    res.status(200).json({user: data.user});
}



module.exports = {signUp, signIn, signOut, getMe}