/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-10-04 22:59:08
 * @LastEditors: Andy
 * @LastEditTime: 2022-03-24 22:11:13
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
    return await ctx.model.Order.PostPrice.findAll({where})
     
  }

  async create(body) {
    const { app, ctx } = this;

    const { userid } = ctx.state.user;
    body.user_id = userid;
    body.created_id = userid;
    body.updated_id = userid;
    try {
      await ctx.model.Order.PostPrice.create(body);
    } catch (error) {
      console.log(error);
      return { success: false };
    }
    }

  async change(body){
    const { ctx } = this;
    console.log(body);
    
    const { userid } = ctx.state.user;
    body.updated_at = ctx.helper.formatTime(new Date());

    body.updated_id = userid;
    body.upt_act = 'U';
    body.price = Number(body.price)
    try {
      await ctx.model.Order.PostPrice.update(body, {
        where: {
          id: body.id,
        },
      });
      return { success: true, msg: "修改成功" };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }

  async delete(body){
    const { ctx } = this;
    console.log(body);
    
    const { userid } = ctx.state.user;
    body.updated_at = ctx.helper.formatTime(new Date());

    body.updated_id = userid;
    body.upt_act = 'D';
    try {
      await ctx.model.Order.PostPrice.update(body, {
        where: {
          id: body.id,
        },
      });
      return { success: true, msg: "删除成功" };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }
}

module.exports = PostPriceService;