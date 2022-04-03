/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-10-07 23:15:44
 * @LastEditors: Andy
 * @LastEditTime: 2021-10-11 23:41:59
 */
'use strict';

const Service = require('egg').Service;

class EvaluateService extends Service {

  async ShopEvaluateSelect(data){
    const { app, ctx } = this;
    const Op = app.Sequelize.Op;
    const where = { upt_act: { [Op.ne]: 'D' } };

    where.shop_id = parseInt(data.shop_id) 
    return await ctx.model.Shop.Evaluate.findAll({
      where,
      order: [[ 'created_at', 'desc' ]],
    })
  }

  async EvaluateSelect(data){
    const { app, ctx } = this;
    const Op = app.Sequelize.Op;
    const where = { upt_act: { [Op.ne]: 'D' } };
    where.evaluate = { [Op.like]: `%${data.evaluate}%` };
    where.shop_id = parseInt(data.shop_id) 
    return await ctx.model.Shop.Evaluate.findAndCountAll({
      where,
      order: [[ 'created_at', 'desc' ]],
    })
  }

  async ShopEvaluateDelete(body){
    const { app, ctx } = this;
    const Op = app.Sequelize.Op;
    const { userid } = ctx.state.user;
    const where = { upt_act: { [Op.ne]: 'D' } };
    try {
      body.updated_id = userid;
      body.upt_act ="D"
      body.updated_at = ctx.helper.formatTime(new Date());
      where.evaluate_id = parseInt(data.evaluate_id) 
      await ctx.model.Shop.Evaluate.update(body,{
        where,
      })
      return {success:true,msg:"评论删除成功！"}
    } catch (error) {
      console.log(error)
      return {success:false,msg:"评论删除失败！"}
    }
  }

  async ShopEvaluateCreate(body){
    const { app, ctx } = this;
    const { userid } = ctx.state.user;
    let order_id = body.order_id
    try{
      await ctx.model.transaction(async t => {
        
        await ctx.model.Order.Order.update({evaluate_id:order_id},{
          where:{
            order_id:order_id
          }
          ,transaction: t 
        })
        if(body.img_url ==undefined){
          body.img_url=null
        }
        body.user_id = userid
        body.evaluate_id = order_id

        delete body.order_id
        console.log(body)
        await ctx.model.Shop.Evaluate.create(body,{ transaction: t})
      })
      return {success:true,msg:"成功评论"}
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }
  
}

module.exports = EvaluateService;