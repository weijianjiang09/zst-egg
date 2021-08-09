/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-08-02 17:22:50
 * @LastEditors: Andy
 * @LastEditTime: 2021-08-09 09:56:07
 */
'use strict';
/**
 * @Controller Address
 */
const Controller = require('../base');

class AddressController extends Controller {

  /**
   *@router get /punctuality/api/order/address/user/page
   *@summary 地址分页查询 个人查询
   * @Description 
   * @request body AddressPage
   * @response 200 resAddressPage
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
    *@router get /punctuality/api/shop/address/admin/page
    *@summary 地址分页查询 管理
    * @Description 
    * @request body AddressPageAdmin
    * @response 200 resAddressPage 
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
    *@router post /punctuality/api/order/address/create
    *@summary 创建地址
    * @Description 
    * @request body AddressCreate
    * @response 200 baseResponse
    */
  async create() {
    const { ctx } = this;
    const body = ctx.request.body;

    ctx.validate({
      name: { type: 'string', required: true },
      address: { type: 'string', required: true },
      phone_number: { type: 'string', required: true },
      sex: { type: 'string', required: true },
    }, body);

    const res = await ctx.service.order.address.create(body);
    if (res) {
      this.success('添加成功');
    } else {
      this.error('添加失败 ' + (res.msg || ''));
    }
  }
  /**
   *@router post /punctuality/api/order/address/update
   *@summary 修改地址
   * @Description 
   * @request body AddressUpdate
   * @response 200 baseResponse
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
    *@router post /punctuality/api/order/address/delete
    *@summary 删除地址
    * @Description 
    * @request body AddressDelete
    * @response 200 baseResponse
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
