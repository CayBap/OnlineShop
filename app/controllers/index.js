const express = require('express');
const router = express.Router();

router.use('/admin',require(__dirname+'/admin/admin'));
router.use('/',require(__dirname+'/client/client'));

module.exports = router;