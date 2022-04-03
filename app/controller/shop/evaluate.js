
/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-10-07 23:08:31
 * @LastEditors: Andy
 * @LastEditTime: 2021-10-12 00:04:35
 */
'use strict';

const Controller = require('../base');
/**
 * @Controller Evaluate
 */
class EvaluateController extends Controller {
  
  /**
   * @router get /punctuality/api/shop/evaluate/ShopEvaluateSelect
   * @summary 店铺评论查询
   * @request body typeSelect
   * @response 200 baseResponse
   */  
  async ShopEvaluateSelect(){
    const { ctx } = this;
    const query = ctx.query;
    
    ctx.validate({
      shop_id: { type: 'string', required: true },
    }, query);

    this.success(await ctx.service.shop.evaluate.ShopEvaluateSelect(query),"查询成功！");
  }

  /**
   * @router get /punctuality/api/shop/evaluate/EvaluateSelect
   * @summary 评论查询（精确）
   * @request body EvaluateSelect
   * @response 200 baseResponse
   */  
  async EvaluateSelect(){
    const { ctx } = this;
    const query = ctx.query;
    
    ctx.validate({
      shop_id: { type: 'integer', required: true },
      evaluate:{type:'string',required:true},
    }, query);

    this.success(await ctx.service.shop.evaluate.ShopEvaluateSelect(query),"查询成功！");
  }

  /**
   * @router post /punctuality/api/shop/evaluate/ShopEvaluateDelete
   * @summary 店铺用户删除评论
   * @request body ShopEvaluateDelete
   * @response 200 baseResponse
   */  
  async ShopEvaluateDelete(){
    const { ctx } = this;
    const body = ctx.request.body;
    
    ctx.validate({
      evaluate_id: { type: 'integer', required: true },
    }, body);
    let data = await ctx.service.shop.evaluate.ShopEvaluateDelete(body)
    if(data.success){
      this.success("",data.msg);
    }else{
      this.error(data.msg);
    }
    
  }

   /**
   * @router post /punctuality/api/shop/evaluate/ShopEvaluateDelete
   * @summary 店铺用删除评论(后台)
   * @request body ShopEvaluateDelete
   * @response 200 baseResponse
   */  
  async ShopEvaluateDeleteAdmin(){
    const { ctx } = this;
    const body = ctx.request.body;
    
    ctx.validate({
      evaluate_id: { type: 'integer', required: true },
    }, body);
    let data = await ctx.service.shop.evaluate.ShopEvaluateDelete(body)
    if(data.success){
      this.success("",data.msg);
    }else{
      this.error(data.msg);
    }
    
  }

   /**
   * @router post /punctuality/api/shop/evaluate/ShopEvaluateCreate
   * @summary 店铺用户评论
   * @request body ShopEvaluateCreate
   * @response 200 baseResponse
   */  
  async ShopEvaluateCreate(){
    const { ctx } = this;
    const body = ctx.request.body;
    
    ctx.validate({
      order_id:{ type: 'string', required: true },
      evaluate: { type: 'string', required: true },
      shop_id: { type: 'string', required: true },
      // img_url:{type: 'string', }
    }, body);
    let data = await ctx.service.shop.evaluate.ShopEvaluateCreate(body)
    if(data.success){
      this.success("",data.msg);
    }else{
      this.error(data.msg);
    }
  }
}


module.exports = EvaluateController;
