/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-08-07 10:52:00
 * @LastEditors: Andy
 * @LastEditTime: 2021-08-07 23:35:55
 */
'use strict';

const Controller = require('../base');

class OrderController extends Controller {
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

    this.success(await ctx.service.order.order.page(query),"查询成功");
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
      address_id: { type: 'integer', required: true },
      commodity :{ type: 'array', required: true },
      shop_id: { type: 'integer', required: true },
    }, body);

    const res = await ctx.service.order.order.create(body);
    if (res.success) {
      this.success('添加成功');
    } else {
      this.error('添加失败 ' + (res.msg || ''));
    }
  }
  /**
   * @name: 蒋炜楗
   * @msg: 修改状态后端用
   * @param {*}
   * @return {*}
   */
  async update_status() {
    const { ctx } = this;
    const body = ctx.request.body;

    ctx.validate({
      order_id: { type: 'integer', required: true },
      status :{ type: 'string', required: true }
    }, body);

    const res = await ctx.service.order.order.update_status(body);
    if (res.success) {
      this.success('',res.msg);
    } else {
      this.error('修改失败 ' + (res.msg || ''));
    }
  }
  /**
   * @name: 蒋炜楗
   * @msg: 骑手接口
   * @param {*}
   * @return {*}
   */  
  async update_postman() {
    const { ctx } = this;
    const body = ctx.request.body;

    ctx.validate({
      order_id: { type: 'integer', required: true },
      
    }, body);

    const res = await ctx.service.order.order.update_postman(body);
    if (res.success) {
      this.success('',res.msg);
    } else {
      this.error('修改失败 ' + (res.msg || ''));
    }
  }
  /**
   * @name: 蒋炜楗
   * @msg: 抢单
   * @param {*}
   * @return {*}
   */  
  async update_grab() {
    const { ctx } = this;
    const body = ctx.request.body;

    ctx.validate({
      order_id: { type: 'integer', required: true },
      id:{ type: 'integer', required: true },
    }, body);

    const res = await ctx.service.order.order.update_grab(body);
    if (res.success) {
      this.success('',res.msg);
    } else {
      this.error('手速慢了,单子已被人领走了 ' + (res.msg || ''));
    }
  }
  /**
   * @name: 蒋炜楗
   * @msg: 删除接口
   * @param {*}
   * @return {*}
   */
  async delete() {
    const { ctx } = this;
    const body = ctx.request.body;

    ctx.validate({
      order_id: { type: 'integer', required: true },
    }, body);
    const msg = await ctx.service.order.order.delete(body);
    if (msg) {
      this.success('','删除成功');
    } else {
      this.error('删除失败');
    }
  }

  /**
   * 通过角色获取对应的用户
   */
  async getUsersByRole() {
    const { ctx } = this;
    const query = ctx.query;
    ctx.validate({
      role_code: { type: 'string', required: true },
    }, query);
    const res = await ctx.service.sys.user.getUsersByRole(query.role_code, query.name);
    if (res) {
      this.success(res);
    } else {
      this.error('查询失败！');
    }
  }
}

module.exports = OrderController;
