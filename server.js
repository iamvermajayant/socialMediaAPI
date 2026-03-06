const express = require('express');
const dotenv = require('dotenv');
const PORT = 3001;
dotenv.config();


const app = express();
app.use(express.json());



app.get('/', (req,res) => {
    res.send("Hello")
})

app.listen(PORT, () => console.log(`Server is running on the ${PORT}`))