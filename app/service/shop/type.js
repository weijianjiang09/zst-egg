/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-09-16 15:31:32
 * @LastEditors: Andy
 * @LastEditTime: 2021-09-17 00:32:55
 */
'use strict';

const Service = require('egg').Service;

class TypeService extends Service {
  async typeSelect(data){
    const { app, ctx } = this;
    const Op = app.Sequelize.Op;
    const where = { upt_act: { [Op.ne]: 'D' } };
    where.shop_id = parseInt(data.shop_id) 
    return await ctx.model.Shop.Type.findAll({
      where,
    })
  }
  async commoditySelect(data){
    const { app, ctx } = this;
    const Op = app.Sequelize.Op;
    const where = { upt_act: { [Op.ne]: 'D' } };
    where.type_id = parseInt(data.type_id) 
    return await ctx.model.Shop.Commodity.findAll({
      where,
    })
  }
}

module.exports = TypeService;
