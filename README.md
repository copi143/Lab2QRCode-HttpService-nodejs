# lab2qrcode-httpservice-nodejs

## 启动服务

```shell
git clone https://github.com/Mq-b/Lab2QRCode-HttpService-nodejs
cd Lab2QRCode-HttpService-nodejs
npm install
npm start
```

## 项目架构

本项目采用三层架构模式

### 目录结构

```txt
Lab2QRCode-HttpService-nodejs/
├── docs/                         # 文档目录
│   └── 接口文档.md                # API接口文档
├── settings/                     # 配置文件目录
│   └── config.json               # 服务器和应用配置
├── src/                          # 源代码目录
│   ├── configLoader.js           # 配置加载器
│   ├── controllers/              # 控制器层
│   │   └── versionController.js  # 版本检查控制器
│   ├── routes/                   # 路由定义
│   │   ├── mainRoutes.js         # 主路由
│   │   └── versionRoutes.js      # 版本检查路由
│   └── services/                 # 业务逻辑层
│       └── versionService.js     # 版本服务
├── index.js                      # 应用主入口
├── package.json                  # 项目配置
└── package-lock.json             # 依赖锁定
```

### 架构分层

1. **路由层 (routes/)**：定义API端点，映射请求到控制器
2. **控制层 (controllers/)**：处理HTTP请求/响应，验证参数，调用服务层
3. **服务层 (services/)**：封装核心业务逻辑，与HTTP无关

这种模块化管理方式确保各功能模块路由独立，职责分离，便于维护和扩展。
