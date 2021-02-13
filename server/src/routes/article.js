const express = require('express');
const articleCtrl = require('../middleware/article');
const permission = require('../utils/permission');

const router = express.Router();

router.post('/create', articleCtrl.createArticle);
router.get('/list', articleCtrl.listArticles);
router.get('/find/:id', articleCtrl.findArticle);
router.delete('/delete-article/', permission.verifyUserBeforeDeleteArticle ,articleCtrl.deleteArticle);

module.exports = router;