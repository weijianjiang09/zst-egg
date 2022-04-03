/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-10-04 19:53:56
 * @LastEditors: Andy
 * @LastEditTime: 2022-03-24 22:28:58
 */
'use strict';
/**
 * @Controller PostPrice
 */
const Controller = require('../base');

class PostPriceController extends Controller {
  /**
   * @router get /punctuality/api/order/postPrice/select
   * @summary 查询配送费
   * @Description 
   *
   * @response 200 PostPriceSelect
   */
  async select(){
    const { ctx } = this;
    let res = await ctx.service.order.postPrice.select()
    if (res) {
      this.success(res);
    } else {
      this.error('查询失败！');
     
    }
  }
 /**
   * @router post /punctuality/api/order/postPrice/create
   * @summary 创建
   * @Description 
   * @request body PostPriceCreate
   * @response 200 baseResponse
   */
  async create(){
    const { ctx } = this; 
    const body = ctx.request.body;
    ctx.validate({
      price: { type: 'number', required: true },
      name:{type: 'string', required: true }
    }, body);
    let res = await ctx.service.order.postPrice.create(body)
    if (res) {
      this.success(res);
    } else {
      this.error('创建失败！');
    }
  }

   /**
   * @router post /punctuality/api/order/postPrice/change
   * @summary 修改
   * @Description 
   * @request body PostPriceChange
   * @response 200 baseResponse
   */
  async change(){
    const { ctx } = this;
    const body = ctx.request.body;

    
    ctx.validate({
      id: { type: 'integer', required: true },
    }, body);
    let res =  await ctx.service.order.postPrice.change(body)
    if (res.success) {
      this.success(res,"查询成功");
    } else {
      this.error('查询失败！');
    }
  }

   /**
   * @router post /punctuality/api/order/postPrice/delete
   * @summary 修改
   * @Description 
   * @request body PostPriceChange
   * @response 200 baseResponse
   */
  async delete(){
    const { ctx } = this;
    const body = ctx.request.body;

    
    ctx.validate({
      id: { type: 'integer', required: true },
    }, body);
    let res =  await ctx.service.order.postPrice.delete(body)
    if (res.success) {
      this.success(res,"删除成功");
    } else {
      this.error('查询失败！');
    }
  }
}

module.exports = PostPriceController;