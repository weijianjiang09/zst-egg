/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-10-07 08:41:35
 * @LastEditors: Andy
 * @LastEditTime: 2021-10-25 22:41:07
 */
'use strict';
const base = require('../base');

module.exports = app => {
  const { STRING, INTEGER, DATE ,DECIMAL} = app.Sequelize;

  const Coupon = app.model.define('coupon',
    Object.assign(base(app), {
      coupon_code: { type:STRING(128) , primaryKey: true, autoIncrement: true, allowNull: false },
      user_id: { type: INTEGER, },
      shop_id: { type: INTEGER, },
      isUse:{ type:STRING(4),defaultValue: '0'},
      price:{type:DECIMAL(10,2)},
      BasePrice:{type:DECIMAL(10,2)},
      end_time:{type:DATE},
      start_time:{type:DATE},
      name:{type:STRING(64)}
    }));
  Coupon.associate = () => {
    // Coupon.hasOne(app.model.User.User, { foreignKey: 'user_id' });
    Coupon.hasOne(app.model.Shop.Shop, { foreignKey: 'shop_id' });
  }
  return Coupon;
};
