/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-11-09 23:39:39
 * @LastEditors: Andy
 * @LastEditTime: 2021-11-12 13:17:19
 */
'use strict';
/**
 * @Controller Specification
 */
const Controller = require('../base');

class SpecificationController extends Controller {
    /**
   * @router post /punctuality/api/shop/specification/create
   * @summary 规格创建
   * @Description 
   * @request body SpecificationCreate
   * @response 200 baseResponse
   */
  async create(){
    const { ctx } = this;
    const body = ctx.request.body;

    ctx.validate({
      shop_id:{type:'integer',required: true},
      commodity_id: { type: 'integer', required: true },
      specifications :{ type: 'array', required: true },
    }, body);

    const res = await ctx.service.shop.specification.create(body);
    if (res.success) {
      this.success('添加成功');
    } else {
      this.error('添加失败 ' + (res.msg || ''));
    }
  }
  /**
   * @router post /punctuality/api/shop/specification/update
   * @summary 规格更新
   * @Description 
   * @request body SpecificationCreate
   * @response 200 baseResponse
   */
  async update(){
    const { ctx } = this;
    const body = ctx.request.body;

    ctx.validate({
      commodity_id: { type: 'integer', required: true },
      specifications :{ type: 'array', required: true },
    }, body);
    const res = await ctx.service.shop.specification.update(body);
  }
}

module.exports = SpecificationController;