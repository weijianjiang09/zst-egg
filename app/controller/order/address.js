/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-08-02 17:22:50
 * @LastEditors: Andy
 * @LastEditTime: 2021-08-03 15:44:59
 */
/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-08-02 17:22:50
 * @LastEditors: Andy
 * @LastEditTime: 2021-08-03 10:51:22
 */
'use strict';

const Controller = require('../base');

class AddressController extends Controller {
  
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

    this.success(await ctx.service.order.address.page(query));
  }
  /**
   * @name: 蒋炜楗
   * @msg: 
   * @param {*}
   * @return {*}
   */  
  async page_admin() {
    const { ctx } = this;
    const query = ctx.query;
    ctx.validate({
      limit: { type: 'string', required: true },
      page: { type: 'string', required: true },
    }, query);

    this.success(await ctx.service.order.address.page_admin(query));
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
      name: { type: 'string', required: true },
      address: { type: 'string', required: true },
      phone_number: { type: 'string', required: true },
      sex:{ type: 'string', required: true },
    }, body);

    const res = await ctx.service.order.address.create(body);
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
      address_id: { type: 'integer', required: true },
    }, body);

    const res = await ctx.service.order.address.update(body);
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
      address_id: { type: 'integer', required: true },
    }, body);
    const res = await ctx.service.order.address.delete(body);
    if (res.success) {
      this.success('删除成功');
    } else {
      this.error('删除失败 ' + (res.msg || ''));
    }
  }

}

module.exports = AddressController;
