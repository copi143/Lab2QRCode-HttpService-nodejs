const http = require('http');
const express = require('express');
const ConfigLoaderClass = require('./src/configLoader');
const mainRoutes = require('./src/routes/mainRoutes');
const versionRoutes = require('./src/routes/versionRoutes');

const app = express();

// 中间件：解析JSON请求体
app.use(express.json());

// 使用路由
app.use('/', mainRoutes);        // 主路由（根路径和状态检查）
app.use('/', versionRoutes);     // 版本检查路由

const server = http.createServer(app);

// 加载配置文件监听ip与端口
const configLoader = new ConfigLoaderClass();
const serverConfig = configLoader.getServerConfig();
const PORT = serverConfig.port || 8080;
const HOST = serverConfig.host || '127.0.0.1';

server.listen(PORT, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
});