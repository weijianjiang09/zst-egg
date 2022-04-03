/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-07-31 14:49:27
 * @LastEditors: Andy
 * @LastEditTime: 2021-11-09 23:36:32
 */
'use strict';
const base = require('../base');

module.exports = app => {
  const { STRING, INTEGER, Date, FLOAT ,DECIMAL} = app.Sequelize;

  const Commodity = app.model.define('commodity',
    Object.assign(base(app), {
      commodity_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      shop_id: { type: INTEGER, allowNull: false },
      type_id:{ type: INTEGER},
      name: { type: STRING(64), },
      img_url: STRING(128),
      packagePrice:{ type: DECIMAL(10,2) },
      price:{ type: DECIMAL(10,2) },
      description: STRING(255),
      putaway: STRING(2),
    }));

  Commodity.associate = () => {
    // Commodity.hasOne(app.model.Shop.Type, { foreignKey: 'type_id' });
    Commodity.hasOne(app.model.Shop.Shop, { foreignKey: 'shop_id' });
    Commodity.hasMany(app.model.Shop.Specification, { foreignKey: 'commodity_id' });
  }
  Commodity.associate = () => {
    Commodity.belongsTo(app.model.Shop.Type, { foreignKey: 'type_id' });
    Commodity.hasMany(app.model.Order.OrderCommodity, { foreignKey: 'commodity_id' });
    Commodity.belongsToMany(app.model.Order.Order, {
      through: app.model.Order.OrderCommodity,
      foreignKey: 'commodity_id',
      otherKey: 'order_id',
    });
  };
  return Commodity;
};