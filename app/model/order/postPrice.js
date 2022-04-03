/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-10-04 17:22:32
 * @LastEditors: Andy
 * @LastEditTime: 2021-10-05 20:42:07
 */
'use strict';
const base = require('../base');
module.exports = app => {
  const { INTEGER, STRING,DECIMAL } = app.Sequelize;

  const PostPrice = app.model.define('post_price',
    Object.assign(base(app), {
      id:{type:INTEGER(11), primaryKey: true, autoIncrement: true, allowNull: false} ,
      name: STRING(32),
      price:{ type: DECIMAL(10,2) },
    }));
  return PostPrice;
};
