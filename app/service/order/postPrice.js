/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-10-04 22:59:08
 * @LastEditors: Andy
 * @LastEditTime: 2021-10-04 23:15:00
 */
'use strict';

const Service = require('egg').Service;

class PostPriceService extends Service {
  async select(){
    const { app, ctx } = this;
    const Op = app.Sequelize.Op;
    let where =  {
      upt_act: { [Op.ne]: 'D' },
    }
    return priceArr = await  ctx.model.Order.PostPrice.findAll({where})
   
  }
}

module.exports = PostPriceService;