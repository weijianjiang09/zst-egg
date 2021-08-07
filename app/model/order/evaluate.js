/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-07-31 15:02:11
 * @LastEditors: Andy
 * @LastEditTime: 2021-07-31 17:08:27
 */
'use strict';
const base = require('../base');

module.exports = app => {
  const { STRING, INTEGER ,DATE} = app.Sequelize;

  const Evaluate = app.model.define('evaluate',
    Object.assign(base(app), {
      evaluate_id: { type: INTEGER, primaryKey: true, autoIncrement: true ,allowNull: false },
      shop_id:{type:INTEGER,},
      order_id:{type:INTEGER,},
      img_url:STRING(128),
      evaluate:STRING(255),
    }));
    Evaluate.associate = () => {
      Evaluate.hasOne(app.model.Shop.Shop, { foreignKey: 'shop_id' });
      // Evaluate.hasOne(app.model.Order.Order, { foreignKey: 'order_id' });
    }
  return Evaluate;
};