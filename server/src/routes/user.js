const express = require('express');
const userCtrl = require('../middleware/user');

const router = express.Router();

router.post('/login', userCtrl.login);
router.post('/signup', userCtrl.signup);
router.delete('/delete-account/:id', userCtrl.deleteAccount);

module.exports = router;