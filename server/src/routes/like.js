const express = require('express');
const likeCtrl = require('../middleware/like');

const router = express.Router();

router.post('/create', likeCtrl.createLike);
router.delete('/delete-like', likeCtrl.deleteLike)

module.exports = router;