/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-10-09 10:54:03
 * @LastEditors: Andy
 * @LastEditTime: 2022-03-17 15:16:05
 */
'use strict';

const Controller = require('../base');
/**
 * @Controller Coupon
 */
class CouponController extends Controller {
  
  /**
   * @router get /punctuality/api/coupon/coupon/CouponSelect
   * @summary 优惠卷查询
   * @request body CouponSelect
   * @response 200 baseResponse
   */  
  async CouponSelect(){
    const { ctx } = this;
    const query = ctx.query;
    
    ctx.validate({
      type:{type:"string", required: true },
      // user_id:  {type: 'integer'},
      // shop_id: { type: 'integer'},
    }, query);
    let res = await ctx.service.coupon.coupon.CouponSelect(query)
    this.success(res.data,res.msg);
  }

  /**
   * @router post /punctuality/api/coupon/coupon/CouponDelete
   * @summary 优惠卷删除（批量）
   * @request body CouponDelete
   * @response 200 baseResponse
   */  
  async CouponDelete(){
    const { ctx } = this;
    const body = ctx.request.body;
    
    ctx.validate({
      name: { type: 'string', required: true },
    }, body);
    let data = await ctx.service.coupon.coupon.CouponDelete(body)
    if(data.success){
      this.success("",data.msg);
    }else{
      this.error(data.msg);
    }
    
  }

  
  /**
   * @router post /punctuality/api/coupon/coupon/CouponChange
   * @summary 优惠卷修改（批量）
   * @request body CouponChange
   * @response 200 baseResponse
   */  
  async CouponChange(){
    const { ctx } = this;
    const body = ctx.request.body;
    
    ctx.validate({
      name: { type: 'string', required: true },

    }, body);
    console.log(body)
    let data = await ctx.service.coupon.coupon.CouponChange(body)
    if(data.success){
      this.success("",data.msg);
    }else{
      this.error(data.msg);
    }
    
  }

   /**
   * @router post /punctuality/api/coupon/coupon/CouponCreate
   * @summary 批量创建优惠卷
   * @request body CouponCreate
   * @response 200 baseResponse
   */  
  async CouponCreate(){
    const { ctx } = this;
    const body = ctx.request.body;
    
    ctx.validate({
      length:{ type: 'integer', required: true },
      end_time: { type: 'string', required: true },
      start_time:{type: 'string', required: true  },
      price:{type: 'number', required: true },
      BasePrice:{type: 'number', required: true },
      name :{type: 'string', required: true },
    }, body);
    let res = await ctx.service.coupon.coupon.CouponCreate(body)
    if(res.success){
      this.success("",res.msg);
    }else{
      this.error(res.msg);
    }
  }
   /**
   * @router post /punctuality/api/coupon/coupon/CouponExchange
   * @summary 优惠卷兑换
   * @request body CouponExchange
   * @response 200 baseResponse
   */  
  async CouponExchange(){
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.validate({
      coupon_code:{ type: 'string', required: true },
    },body)

    let res = await  ctx.service.coupon.coupon.CouponExchange(body)
    if (res.success) {
      this.success('',res.msg)
    }else{
      this.error(res.msg)
    }
  }
}


module.exports = CouponController;