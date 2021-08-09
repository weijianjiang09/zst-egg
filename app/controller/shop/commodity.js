/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-07-31 21:01:04
 * @LastEditors: Andy
 * @LastEditTime: 2021-08-08 16:41:19
 */
'use strict';
/**
 * @Controller Commodity
 */
const Controller = require('../base');

class CommodityController extends Controller {
   /**
   *@router get /punctuality/api/shop/commodity/page
   *@summary 分页查询
   * @Description 
   * @request body CommodityPage
   * @response 200 resCommodityPage
   */ 
  async page() {
    const { ctx } = this; 
    const query = ctx.query;
    ctx.validate({
      limit: { type: 'string', required: true },
      page: { type: 'string', required: true },
    }, query);

    this.success(await ctx.service.shop.commodity.page(query));
  }

  /**
   *@router post /punctuality/api/shop/commodity/create
   *@summary 创建菜品
   * @Description 
   * @request body CommodityCreate
   * @response 200 baseResponse
   */ 
  
  async create() {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.validate({
      shop_id: { type: 'integer', required: true },
      name: { type: 'string', required: true },
      img_url: { type: 'string', required: true },
    }, body);

    const res = await ctx.service.shop.commodity.create(body);
    if (res.success) {
      this.success('','添加成功');
    } else {
      this.error('添加失败 ' + (res.msg || ''));
    }
  }
  /**
   *@router post /punctuality/api/shop/commodity/update
   *@summary 更新菜品信息
   * @Description 
   * @request body CommodityUpdate
   * @response 200 baseResponse
   */ 
  async update() {
    const { ctx } = this;
    const body = ctx.request.body;

    ctx.validate({
      commodity_id:{ type: 'integer', required: true },
    }, body);

    const res = await ctx.service.shop.commodity.update(body);
    if (res) {
      this.success('修改成功');
    } else {
      this.error('修改失败');
    }
  }
   /**
   *@router post /punctuality/api/shop/commodity/putaway
   *@summary 上下架
   * @Description 
   * @request body CommodityPutaway
   * @response 200 baseResponse
   */ 
  async update_putAway() {
    const { ctx } = this;
    const body = ctx.request.body;

    ctx.validate({
      commodity_id:{ type: 'integer', required: true },
      putaway:{ type: 'string', required: true },
    }, body);

    const res = await ctx.service.shop.commodity.update_putAway(body);
    if (res) {
      this.success('修改成功');
    } else {
      this.error('修改失败');
    }
  }
  /**
   *@router post /punctuality/api/shop/commodity/delete
   *@summary 删除菜品
   * @Description 
   * @request body CommodityDelete
   * @response 200 baseResponse
   */ 
  async delete() {
    const { ctx } = this;
    const body = ctx.request.body;

    ctx.validate({
      commodity_id: { type: 'integer', required: true },
    }, body);
    const res = await ctx.service.shop.commodity.delete(body);
    if (res.success) {
      this.success('删除成功');
    } else {
      this.error('删除失败 ' + (res.msg || ''));
    }
  }

}

module.exports = CommodityController;
