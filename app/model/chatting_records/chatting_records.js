/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-07-31 14:57:46
 * @LastEditors: Andy
 * @LastEditTime: 2021-07-31 15:01:43
 */
'use strict';
const base = require('../base');

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Chatting_records = app.model.define('chatting_records',
    Object.assign(base(app), {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      from:{type:INTEGER,},
      to: STRING(128),
      value: STRING(255),
      img_url: STRING(255),
    }));
  return Chatting_records;
};