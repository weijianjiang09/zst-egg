/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-07-29 09:38:58
 * @LastEditors: Andy
 * @LastEditTime: 2021-08-08 10:40:36
 */
'use strict';
const base = require('../base');

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const User = app.model.define('user',
    Object.assign(base(app), {
      user_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      open_id: { type: STRING(64), primaryKey: true, },
      avatar_url: STRING(255),
      user_name: STRING(128),
      phone_number: STRING(32),
      sex: STRING(8),
    }));
  User.associate = () => {
    User.hasMany(app.model.Order.Address, { foreignKey: 'user_id' });
    User.belongsTo(app.model.User.Postman, { foreignKey: 'user_id' });
    User.hasMany(app.model.Order.Order, { foreignKey: 'user_id' });
  }

  // User.associate = () => {}

  return User;
};