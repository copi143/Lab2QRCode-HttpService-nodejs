
const http = require('http');
const express = require('express');
const ConfigLoaderClass = require('./src/configLoader');

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Lab2QRCode API' });
});

app.get('/status', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

const server = http.createServer(app);

// 加载配置文件监听ip与端口
const configLoader = new ConfigLoaderClass();
const serverConfig = configLoader.getServerConfig();
const PORT = serverConfig.port || 8080;
const HOST = serverConfig.host || '127.0.0.1';

server.listen(PORT, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
});
