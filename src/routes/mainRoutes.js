const express = require('express');
const router = express.Router();

// 根路径路由
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Lab2QRCode API' });
});

// 状态检查路由
router.get('/status', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

module.exports = router;