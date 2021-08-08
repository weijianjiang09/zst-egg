/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-07-31 14:21:36
 * @LastEditors: Andy
 * @LastEditTime: 2021-08-08 10:39:51
 */
'use strict';
const base = require('../base');

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Address = app.model.define('address',
    Object.assign(base(app), {
      address_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: INTEGER, },
      address: STRING(128),
      name: STRING(32),
      sex: STRING(2),
      phone_number: STRING(32),
    }));
  Address.associate = () => {
    Address.belongsTo(app.model.Order.Order, { foreignKey: 'address_id' });
    Address.hasOne(app.model.User.User, { foreignKey: 'user_id' });
  };
  return Address;
};