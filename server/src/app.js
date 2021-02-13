const express = require('express');
const userRoutes = require('./routes/user');
const  articlesRoutes = require('./routes/article');
const  likesRoutes = require('./routes/like');
const  commentsRoutes = require('./routes/comment');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/groupomonia/users', userRoutes);
app.use('/groupomonia/articles', articlesRoutes);
app.use('/groupomonia/likes', likesRoutes);
app.use('/groupomonia/comments', commentsRoutes);

module.exports = app;