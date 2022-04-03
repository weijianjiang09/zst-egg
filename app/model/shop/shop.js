/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-07-31 14:43:29
 * @LastEditors: Andy
 * @LastEditTime: 2021-11-11 15:56:11
 */
'use strict';
const base = require('../base');

module.exports = app => {
  const { STRING, INTEGER, FLOAT } = app.Sequelize;

  const Shop = app.model.define('shop',
    Object.assign(base(app), {
      shop_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(64),
      location: STRING(32),
      img_url: STRING(128),
      time: STRING(128),
      number:{type:INTEGER},
      msg:{type:STRING(255)},
      opening: STRING(2),
      notice: STRING(255),
    }));
  Shop.associate = () => {
    Shop.belongsTo(app.model.Order.Order, { foreignKey: 'shop_id' });
    Shop.hasMany(app.model.Shop.Commodity, { foreignKey: 'shop_id' });
    Shop.hasMany(app.model.Shop.Type, { foreignKey: 'shop_id' });
    Shop.hasMany(app.model.Shop.Evaluate, { foreignKey: 'shop_id' });
    Shop.hasMany(app.model.Shop.Specification, { foreignKey: 'shop_id' });
  };
  return Shop;
};