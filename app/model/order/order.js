/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-07-31 11:14:51
 * @LastEditors: Andy
 * @LastEditTime: 2021-08-07 22:35:23
 */
'use strict';
const base = require('../base');

module.exports = app => {
  const { STRING, INTEGER ,DATE} = app.Sequelize;

  const Order = app.model.define('order',
    Object.assign(base(app), {
      order_id: { type: INTEGER, primaryKey: true, autoIncrement: true ,allowNull: false },
      user_id:{type:INTEGER,},
      address_id:{type:INTEGER,},
      shop_id:{type:INTEGER,},
      id:{type:INTEGER,},
      remark:STRING(255),
      end_time:DATE,
      overtime:{type:INTEGER,},
      status: STRING(2),
    }));
    Order.associate = () => {
      Order.belongsTo(app.model.User.Postman, { foreignKey: 'id' });
      Order.belongsTo(app.model.Shop.Shop, { foreignKey: 'shop_id' });
      Order.belongsTo(app.model.Order.Address, { foreignKey: 'address_id' });
      Order.belongsTo(app.model.User.User, { foreignKey: 'user_id' });
      Order.hasMany(app.model.Order.OrderCommodity, { foreignKey: 'order_id' });
      Order.belongsToMany(app.model.Shop.Commodity, {
        through: app.model.Order.OrderCommodity,
        foreignKey: 'order_id',
        otherKey: 'commodity_id',
      });
    }
  return Order;
};
