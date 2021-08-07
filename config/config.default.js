/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1607324126533_6821';

  // add your middleware config here
  config.middleware = [ 'errorHandler' ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    password_salt: 'ntihcbRbx1mnFKKW38ZI7hoBMKbe35Me',
  };

  config.cluster = {
    listen: {
      port: 7002,
      hostname: '127.0.0.1',
    },
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '8.136.120.148',
    username: 'root',
    password: 'jk123.JWJ',
    port: 3306,
    database: 'zst',
    timezone: '+08:00',
    define: {
      freezeTableName: true,
      timestamps: false,
    },
  };

  exports.swaggerdoc = {
    dirScanner: './app/controller', // 配置自动扫描的控制器路径。
    // 接口文档的标题，描述或其它。
    apiInfo: {
      title: '准时通接口文档', // 接口文档的标题。
      description: 'zst document.', // 接口文档描述。
      version: '1.0.0', // 接口文档版本。
    },
    schemes: [ 'http', 'https' ], // 配置支持的协议。
    consumes: [ 'application/json' ], // 指定处理请求的提交内容类型（Content-Type），例如application/json, text/html。
    produces: [ 'application/json' ], // 指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回。
    securityDefinitions: { // 配置接口安全授权方式。

    },
    enableSecurity: false, // 是否启用授权，默认 false（不启用）。
    // enableValidate: true,    // 是否启用参数校验，默认 true（启用）。
    routerMap: true, // 是否启用自动生成路由，默认 true (启用)。
    enable: true, // 默认 true (启用)。
  };

  config.validate = {
    // convert: false,
    // validateRoot: false,
  };
  exports.io = {
    init: { }, // passed to engine.io
    namespace: {
      // '/': {
      //   connectionMiddleware: [ 'connection' ],
      //   packetMiddleware: [ 'packet' ],
      // },
      // '/example': {
      //   connectionMiddleware: [],
      //   packetMiddleware: [],
      // },
    },
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  config.jwt = {
    secret: '123edasfvbyj6SDG$t35W',
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
