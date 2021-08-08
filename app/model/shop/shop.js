/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-07-31 14:43:29
 * @LastEditors: Andy
 * @LastEditTime: 2021-08-08 10:40:14
 */
'use strict';
const base = require('../base');

module.exports = app => {
  const { STRING, INTEGER, FLOAT } = app.Sequelize;

  const Shop = app.model.define('shop',
    Object.assign(base(app), {
      shop_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(32),
      location: STRING(32),
      img_url: STRING(128),
      time: STRING(128),
      opening: STRING(2),
      minimum: FLOAT,
      price: FLOAT,
      notice: STRING(255),
    }));
  Shop.associate = () => {
    Shop.belongsTo(app.model.Order.Order, { foreignKey: 'shop_id' });
    Shop.belongsTo(app.model.Shop.Commodity, { foreignKey: 'shop_id' });
    // Shop.hasMany(app.model.Order.Evaluate, { foreignKey: 'shop_id' });
  };
  return Shop;
};