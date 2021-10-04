/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-09-15 15:52:08
 * @LastEditors: Andy
 * @LastEditTime: 2021-09-17 11:48:54
 */
'use strict';
const base = require('../base');

module.exports = app => {
  const { STRING, INTEGER, FLOAT,DECIMAL } = app.Sequelize;

  const Type = app.model.define('type',
    Object.assign(base(app), {
      type_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      shop_id:{type: INTEGER,},
      type_name: STRING(64),
    }));
    Type.associate = () => {
      Type.hasMany(app.model.Shop.Commodity, { foreignKey: 'type_id' });
      Type.hasOne(app.model.Shop.Shop, { foreignKey: 'shop_id' });
    };
  return Type;
};