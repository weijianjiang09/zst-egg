/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-07-31 21:01:04
 * @LastEditors: Andy
 * @LastEditTime: 2021-08-08 00:22:47
 */
'use strict';
/**
 * @Controller Commodity
 */
const Controller = require('../base');

class CommodityController extends Controller {
  /**
   * @name: 蒋炜楗
   * @msg: 
   * @param {*}
   * @return {*}
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
   * @name: 蒋炜楗
   * @msg: 
   * @param {*}
   * @return {*}
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
    if (res) {
      this.success('添加成功');
    } else {
      this.error('添加失败 ' + (res.msg || ''));
    }
  }
  /**
   * @name: 蒋炜楗
   * @msg: 
   * @param {*}
   * @return {*}
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
   * @name: 蒋炜楗
   * @msg: 
   * @param {*}
   * @return {*}
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
   * @name: 蒋炜楗
   * @msg: 
   * @param {*}
   * @return {*}
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
