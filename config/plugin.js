/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-07-28 15:58:23
 * @LastEditors: Andy
 * @LastEditTime: 2021-07-31 11:04:03
 */
'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  swaggerdoc: {
    enable: true, // 是否启用。
    package: 'egg-swagger-doc', // 指定包名称。
  },
  io: {
    enable: true,
    package: 'egg-socket.io',
  },
};
