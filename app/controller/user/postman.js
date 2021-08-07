/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-08-04 14:09:24
 * @LastEditors: Andy
 * @LastEditTime: 2021-08-07 10:40:25
 */
'use strict';

const Controller = require('../base');

class PostmanController extends Controller {
  /**
   * @name: 蒋炜楗
   * @msg: 查询个人信息
   * @param {*}
   * @return {*}
   */  
  async getPostmanInfo(){
    const { ctx } = this;
    
    this.success(await ctx.service.user.postman.getPostmanInfo(),"查询成功！");
  }
  /**
   * @name: 蒋炜楗
   * @msg: 分页查询
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

    this.success(await ctx.service.user.postman.page(query),"查询成功！");
  }
  /**
   * @name: 蒋炜楗
   * @msg: 创建骑手
   * @param {*}
   * @return {*}
   */  
  async create() {
    const { ctx } = this;
    const body = ctx.request.body;

    ctx.validate({
      sex: { type: 'string', required: true },
      name: { type: 'string', required: true },
      phone_number: { type: 'string', required: true },
    }, body);

    const res = await ctx.service.user.postman.create(body);
    if (res.success) {
      this.success('','添加成功');
    } else {
      this.error('添加失败 ' + (res.msg || ''));
    }
  }
  /**
   * @name: 蒋炜楗
   * @msg: 更新骑手信息 通用
   * @param {*}
   * @return {*}
   */  
  async update_msg() {
    const { ctx } = this;
    const body = ctx.request.body;

    ctx.validate({
      postman_id: { type: 'integer', required: true },
    }, body);

    const res = await ctx.service.user.postman.update_msg(body);
    if (res.success) {
      this.success('','修改成功');
    } else {
      this.error('修改失败 ' + (res.msg || ''));
    }
  }
  /**
   * @name: 蒋炜楗
   * @msg: 骑手认证
   * @param {*}
   * @return {*}
   */  
  async updateAttestation() {
    const { ctx } = this;
    const body = ctx.request.body;

    ctx.validate({
      postman_id: { type: 'integer', required: true },
      attestation: {type: 'string', required: true}
    }, body);

    const res = await ctx.service.user.postman.updateAttestation(body);
    if (res.success) {
      this.success('',"认证成功");
    } else {
      this.error('修改失败 ' + (res.msg || ''));
    }
  }
  /**
   * @name: 蒋炜楗
   * @msg: 删除
   * @param {*}
   * @return {*}
   */  
  async delete() {
    const { ctx } = this;
    const body = ctx.request.body;

    ctx.validate({
      postman_id: { type: 'integer', required: true },
    }, body);
    const success = await ctx.service.user.postman.delete(body);
    if (success) {
      this.success('删除成功');
    } else {
      this.error('删除失败');
    }
  }

}

module.exports = PostmanController;
