const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const PORT = 3001;

dotenv.config();


const app = express();
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/profile', profileRoutes)

app.get('/', (req,res) => {
    res.send("Hello")
})

app.listen(PORT, () => console.log(`Server is running on the ${PORT}`))