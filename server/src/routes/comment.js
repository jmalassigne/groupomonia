const express = require('express');
const commentCtrl = require('../middleware/comment');
const permission = require('../utils/permission');

const router = express.Router();

router.post('/create/', commentCtrl.createComment);
router.delete('/delete-comment/',permission.verifyUserBeforeDeleteComment, commentCtrl.deleteComment)

module.exports = router;