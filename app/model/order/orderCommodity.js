/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-07-31 16:21:56
 * @LastEditors: Andy
 * @LastEditTime: 2021-09-15 15:55:36
 */
'use strict';

module.exports = app => {
  const { INTEGER, STRING,DECIMAL } = app.Sequelize;

  const OrderCommodity = app.model.define('order_commodity', {
    order_id: STRING(64),
    commodity_id: INTEGER(11),
    number: INTEGER(11),
    specification: STRING(128),
    price:{ type: DECIMAL(10,2) },
  });

  OrderCommodity.associate = () => {
    OrderCommodity.hasOne(app.model.Order.Order, { foreignKey: 'order_id' });
  }
  OrderCommodity.associate = () => {
    OrderCommodity.belongsTo(app.model.Shop.Commodity, { foreignKey: 'commodity_id' });
  }
  return OrderCommodity;
};
