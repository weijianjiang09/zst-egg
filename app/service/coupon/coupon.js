/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-10-09 11:19:40
 * @LastEditors: Andy
 * @LastEditTime: 2022-03-17 15:32:14
 */
'use strict';
const uuid4 = require('uuid4')
const Service = require('egg').Service;

class CouponService extends Service {

  async CouponSelect(data){
    const { app, ctx } = this;
    const Op = app.Sequelize.Op;
    const { userid } = ctx.state.user;
    const where = { upt_act: { [Op.ne]: 'D' } };
    if(data.type=='user'){
      where.user_id = userid
      let res = await ctx.model.Coupon.Coupon.findAll({where})
      return {success:true,data:res,msg:""}
    }
    // if(data.user_id){
    //   where.user_id=data.user_id
    // }
    if (data.type=='shop') {
      where.shop_id = data.shop_id
      let res = await ctx.model.Coupon.Coupon.findAll({where})
      return {success:true,data:res,msg:""}
    }
    if (data.type=='admin'){
        let res = await ctx.model.Coupon.Coupon.count({
      where,
      raw:true,
      // order: [[ 'created_at', 'desc' ]],
      attributes:['name','price','end_time','start_time',"shop_id","BasePrice"], 
      group:['name','price','end_time','start_time',"shop_id","BasePrice"],
    })
    
    let shop_res = await ctx.model.Shop.Shop.findAll({where,raw:true, attributes:['name','shop_id']})
    res.forEach(element => {
      let flag = false
      let name = ''
      for (let index = 0; index < shop_res.length; index++) {
        const elements = shop_res[index];
        if(elements.shop_id==element.shop_id){
            flag = true
            name = elements.name
          //  console.log(flag)
            break
        }else{
          flag = false
        }
      }
      
      if(flag){
        element.ShopName = name
      }
    });
    console.log(res);
    return {data:res,success:true,msg:""}
    }
    // let sss = await ctx.model.Coupon.Coupon.findAll({
    //   where,
    //   group:'name',
    //   // attributes:['name'], 
    // })
    // log(sss)
  
  }

  async CouponExchange(body){
    const { app, ctx } = this;
    const Op = app.Sequelize.Op;
    let where = { upt_act: { [Op.ne]: 'D' } };
    const { userid } = ctx.state.user;
    body.user_id = userid
    try {
      await ctx.model.Coupon.Coupon.update(body,{
        coupon_code:body.coupon_code
      })
      return {success:true,msg:"兑换成功"}
    } catch (error) {
      return {success:false,msg:"兑换失败"}
    }    
  }

  async CouponDelete(body){
    const { app, ctx } = this;
    const Op = app.Sequelize.Op;
    // const { userid } = ctx.state.user;
    const where = { upt_act: { [Op.ne]: 'D' } };
    where.name = body.name
    try {
      // body.updated_id = userid;
      body.upt_act ="D"
      body.updated_at = ctx.helper.formatTime(new Date());
      await ctx.model.Coupon.Coupon.update(body,{
        where,
      })
      return {success:true,msg:"删除成功！"}
    } catch (error) {
      console.log(error)
      return {success:false,msg:"删除失败！"}
    }
  }

  async CouponChange(body){
    const { app, ctx } = this;
    const Op = app.Sequelize.Op;
    // const { userid } = ctx.state.user;

    let where = { upt_act: { [Op.ne]: 'D' } };
    where.name = body.name
    try {
      // body.updated_id = userid;
      body.upt_act ="U"
      body.updated_at = ctx.helper.formatTime(new Date());
      if(body.newName){
        body.name = body.newName
      }
      await ctx.model.Coupon.Coupon.update(body,{
        where,
      })
      return {success:true,msg:"修改成功！"}
    } catch (error) {
      console.log(error)
      return {success:false,msg:"修改失败！"}
    }
  }

  async CouponCreate(body){
    const { app, ctx } = this;
    const Op = app.Sequelize.Op;
    let array = []
    let shop_id = null
    let end_time  = body.end_time
    let start_time = body.start_time
    let price = body.price
    let BasePrice = body.BasePrice
    let name = body.name
    let length = body.length

    if (body.shop_id) {
      shop_id = body.shop_id
    }

    for (let index = 0; index < length; index++) {
      let coupon_code = uuid4()

      array.push({
        coupon_code,
        shop_id,
        end_time,
        start_time,
        price,
        BasePrice,
        name
      })
    }
    return await ctx.model.transaction(async t => {
      const res = await ctx.model.Coupon.Coupon.bulkCreate(array, { transaction: t })
      return { success: res.length > 0 ,msg:"创建成功"};
    })
  }
  
}

module.exports = CouponService;