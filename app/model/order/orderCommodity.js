/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-07-31 16:21:56
 * @LastEditors: Andy
 * @LastEditTime: 2021-08-07 15:36:37
 */
'use strict';

module.exports = app => {
  const { INTEGER ,STRING} = app.Sequelize;

  const OrderCommodity = app.model.define('order_commodity', {
    order_id: INTEGER(11),
    commodity_id: INTEGER(11),
    number:INTEGER(11),
    specification:STRING(128),
  });

  OrderCommodity.associate = () => {
    OrderCommodity.hasOne(app.model.Order.Order, { foreignKey: 'order_id' });
  }
  OrderCommodity.associate = () => {
    OrderCommodity.belongsTo(app.model.Shop.Commodity, { foreignKey: 'commodity_id' });
  }
  return OrderCommodity;
};
