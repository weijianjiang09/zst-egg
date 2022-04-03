/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-11-09 16:11:08
 * @LastEditors: Andy
 * @LastEditTime: 2021-11-12 23:25:30
 */
'use strict';
const base = require('../base');

module.exports = app => {
  const { STRING, INTEGER, Date, FLOAT ,DECIMAL} = app.Sequelize;

  const Specification = app.model.define('specification',
    Object.assign(base(app), {
      specification_id:{ type: INTEGER, primaryKey: true, autoIncrement: true },
      
      shop_id: { type: INTEGER, allowNull: false },
      commodity_id: { type: INTEGER, allowNull: false },
      type:{type: STRING(64), },
      name: { type: STRING(64), },
      price:{ type: DECIMAL(10,2) },
      checkbox: STRING(2),
    }));
    Specification.associate = () => {
      Specification.hasOne(app.model.Shop.Shop, { foreignKey: 'shop_id' });
      Specification.hasOne(app.model.Shop.Commodity, { foreignKey: 'commodity_id' });
    }
  return Specification;
};