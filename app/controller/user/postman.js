/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-08-04 14:09:24
 * @LastEditors: Andy
 * @LastEditTime: 2021-09-05 22:52:01
 */
'use strict';
/**
 * @Controller Postman
 */
const Controller = require('../base');

class PostmanController extends Controller {
  /**
   * @router get /punctuality/api/user/postman/getPostmanInfo
   * @summary 个人
   * @Description 查询骑手个人
   * @request 
   * @response 200 getPostmanInfo
   */  
  async getPostmanInfo(){
    const { ctx } = this;
  
    this.success(await ctx.service.user.postman.getPostmanInfo(),"查询成功！");
  }
  /**
   *@router get /punctuality/api/user/postman/page
   *@summary 分页查询
   * @Description 
   * @request body PostmanPage
   * @response 200 resPostmanPage
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
   *@router post /punctuality/api/user/postman/create
   *@summary 创建骑手
   * @Description 
   * @request body PostmanCreate
   * @response 200 baseResponse
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
   *@router post /punctuality/api/user/postman/updateMsg
   *@summary 更新骑手信息 通用
   * @Description 
   * @request body PostmanUpdate_msg
   * @response 200 baseResponse
   */
  async update_msg() {
    const { ctx } = this;
    const body = ctx.request.body;

    ctx.validate({
      id: { type: 'integer', required: true },
    }, body);

    const res = await ctx.service.user.postman.update_msg(body);
    if (res.success) {
      this.success('','修改成功');
    } else {
      this.error('修改失败 ' + (res.msg || ''));
    }
  }
 /**
   *@router post /punctuality/api/user/postman/updateAttestation
   *@summary 认证
   * @Description 
   * @request body PostmanUpdateAttestation
   * @response 200 baseResponse
   */
  async updateAttestation() {
    const { ctx } = this;
    const body = ctx.request.body;

    ctx.validate({
      id: { type: 'integer', required: true },
    }, body);

    const res = await ctx.service.user.postman.updateAttestation(body);
    if (res.success) {
      this.success('',"认证成功");
    } else {
      this.error('修改失败 ' + (res.msg || ''));
    }
  }
 /**
   *@router post /punctuality/api/user/postman/delete
   *@summary 删除
   * @Description 
   * @request body PostmanDelete
   * @response 200 baseResponse
   */
  async delete() {
    const { ctx } = this;
    const body = ctx.request.body;

    ctx.validate({
      id: { type: 'integer', required: true },
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
