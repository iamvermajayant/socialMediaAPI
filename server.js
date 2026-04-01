const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const postRoutes = require('./routes/postRoutes');
const likeRoutes = require('./routes/likeRoutes');
const commentRoutes = require('./routes/commentRoutes');
const followRoutes = require('./routes/followRoutes');
const swaggerUi = require('swagger-ui-express')        // 👈 add
const swaggerSpec = require('./config/swagger')

const PORT = 3001;

dotenv.config();


const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'Social Media API Docs',
  swaggerOptions: {
    persistAuthorization: true   // keeps token after page refresh
  }
}))
app.use('/api/auth',authRoutes);
app.use('/api/profile', profileRoutes)
app.use('/api/posts', postRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/follow', followRoutes);


app.get('/', (req,res) => {
    res.send("Hello")
})

app.listen(PORT, () => console.log(`Server is running on the ${PORT}`))