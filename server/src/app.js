const express = require('express');
const userRoutes = require('./routes/user');
const userArticles = require('./routes/article');

const app = express();

app.use('groupomonia/users', userRoutes);
app.use('groupomonia/articles', userArticles);

module.exports = app;