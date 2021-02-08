const express = require('express');
const articleCtrl = require('../middleware/article');

const router = express.Router();

router.post('/create', articleCtrl.createArticle);
router.get('/list', articleCtrl.listArticles);
router.get('/find/:id', articleCtrl.findArticle);
router.delete('/delete/:id', articleCtrl.deleteArticle);

module.exports = router;