const fs = require('fs');
const path = require('path');

/**
 * 配置加载器类
 */
class ConfigLoader {
  /**
   * 构造函数
   * @param {string} configPath - 配置文件路径
   */
  constructor(configPath = path.join(__dirname, '..', 'settings', 'config.json')) {
    this.configPath = configPath;
    this.config = null;
  }

  /**
   * 加载配置文件
   * @returns {Object} 配置对象
   */
  loadConfig() {
    try {
      const configFile = fs.readFileSync(this.configPath, 'utf8');
      this.config = JSON.parse(configFile);
      return this.config;
    } catch (error) {
      throw new Error(`Failed to load config file: ${error.message}`);
    }
  }

  /**
   * 获取服务器配置
   * @returns {Object} 服务器配置对象
   */
  getServerConfig() {
    if (!this.config) {
      this.loadConfig();
    }
    return this.config.server;
  }

  /**
   * 获取特定配置项
   * @param {string} key - 配置项键名
   * @returns {*} 配置项值
   */
  getConfigValue(key) {
    if (!this.config) {
      this.loadConfig();
    }
    
    return this.config[key];
  }
}

module.exports = ConfigLoader;