/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-07-31 14:49:27
 * @LastEditors: Andy
 * @LastEditTime: 2021-08-07 15:36:34
 */
'use strict';
const base = require('../base');

module.exports = app => {
  const { STRING, INTEGER ,Date,FLOAT} = app.Sequelize;

  const Commodity = app.model.define('commodity',
    Object.assign(base(app), {
      commodity_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      shop_id:{type:INTEGER,allowNull: false },  
      name: STRING(64),
      img_url: STRING(128),
      price:FLOAT,
      description: STRING(255),
      putaway:STRING(2),
    }));

    Commodity.associate = () => {
      Commodity.hasMany(app.model.Shop.Shop, { foreignKey: 'shop_id' });
    }
    Commodity.associate = () => {
      Commodity.hasMany(app.model.Order.OrderCommodity, { foreignKey: 'commodity_id' });
      Commodity.belongsToMany(app.model.Order.Order, {
        through: app.model.Order.OrderCommodity,
        foreignKey: 'commodity_id',
        otherKey: 'order_id',
      });
    };
  return Commodity;
};