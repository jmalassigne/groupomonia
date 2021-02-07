const express = require('express');
const articleCtrl = require('../middleware/article');

const router = express.Router();

router.post('/create', articleCtrl.createMessage);
router.get('/list', articleCtrl.listMessages);
router.get('/find/:id', articleCtrl.findMessage);
router.delete('/delete/:id', articleCtrl.deleteMessage);

module.exports = router;