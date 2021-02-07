const express = require('express');
const userRoutes = require('./routes/user');
const userArticles = require('./routes/article');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/groupomonia/users', userRoutes);
app.use('/groupomonia/articles', userArticles);

module.exports = app;