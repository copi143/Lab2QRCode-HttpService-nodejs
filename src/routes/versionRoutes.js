const express = require('express');
const VersionController = require('../controllers/versionController');

const router = express.Router();
const versionController = new VersionController();

// 版本检查接口
router.post('/update/check_version', versionController.checkVersion);

module.exports = router;