/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-10-04 17:22:32
 * @LastEditors: Andy
 * @LastEditTime: 2021-10-04 19:25:39
 */
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
  const PostPrice = app.model.define('post_price', {
    id:{type:INTEGER(11), primaryKey: true, autoIncrement: true, allowNull: false} ,
    name: STRING(32),
    price:{ type: DECIMAL(10,2) },
  });

  return PostPrice;
};
