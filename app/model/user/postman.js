/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-07-31 15:04:28
 * @LastEditors: Andy
 * @LastEditTime: 2021-08-07 15:29:32
 */
'use strict';
const base = require('../base');

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Postman = app.model.define('postman',
    Object.assign(base(app), {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true , },
      user_id: { type: INTEGER },
      name: STRING(64),
      phone_number: STRING(32),
      sex: STRING(2),
      upt_act: STRING(2),
      attestation: STRING(2),
      now: INTEGER,
      overtime: INTEGER,
      history: INTEGER,
    }));
  Postman.associate = () => {
    Postman.hasOne(app.model.User.User, { foreignKey: 'user_id' });
    Postman.hasMany(app.model.Order.Order, { foreignKey: 'id' });
  };
  return Postman;
};