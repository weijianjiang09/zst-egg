/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-08-07 10:52:00
 * @LastEditors: Andy
 * @LastEditTime: 2021-11-09 14:53:21
 */
'use strict';
/**
 * @Controller Order
 */
const Controller = require('../base');

class OrderController extends Controller {
   /**
   *@router get /punctuality/api/order/order/page
   *@summary 订单查询
   * @Description 历史订单，根据需求自行传入所需的值
   * @request body OrderPage
   * @response 200 resOrderPage
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
   *@router get /punctuality/api/order/order/pageNow
   *@summary 订单查询
   * @Description 进行中订单，根据需求自行传入所需的值
   * @request body OrderPage
   * @response 200 resOrderPage
   */
  async page_now() {
    const { ctx } = this;
    const query = ctx.query;
    ctx.validate({
      limit: { type: 'string', required: true },
      page: { type: 'string', required: true },
    }, query);

    this.success(await ctx.service.order.order.page_now(query),"查询成功");
  }
  /**
   *@router get /punctuality/api/order/order/pageUser
   *@summary 订单查询
   * @Description 进行中订单，根据需求自行传入所需的值
   * @request body OrderPageUser
   * @response 200 resOrderPage
   */
  async page_user() {
    const { ctx } = this;
    const query = ctx.query;
    ctx.validate({
      limit: { type: 'string', required: true },
      page: { type: 'string', required: true },
    }, query);

    this.success(await ctx.service.order.order.page_user(query),"查询成功");
  }
    /**
   *@router get /punctuality/api/order/order/pagePostman
   *@summary 订单查询
   * @Description 骑手自行定义查询，按照传入的status
   * @request body OrderPageUser
   * @response 200 resOrderPage
   */
  async pagePostman() {
    const { ctx } = this;
    const query = ctx.query;
    ctx.validate({
      limit: { type: 'string', required: true },
      page: { type: 'string', required: true },
      status:{type:"string" , required: true},
      id:{type:"string" , required: true }
    }, query);

    this.success(await ctx.service.order.order.pagePostman(query),"查询成功");
  }
   /**
   * @router post /punctuality/api/order/order/create
   * @summary 订单创建
   * @Description 前端注意限制菜品的商店限制，菜单只显示本店的菜品
   * @request body OrderCreate
   * @response 200 baseResponse
   */
  async create() {
    const { ctx } = this;
    const body = ctx.request.body;

    ctx.validate({
      order_id:{type:'string',required: true},
      address_id: { type: 'integer', required: true },
      commodity :{ type: 'array', required: true },
      shop_id: { type: 'integer', required: true },
      over_time:{type:"number", required: true },
      postPrice:{type:'number', required: true},
    }, body);

    const res = await ctx.service.order.order.create(body);
    if (res.success) {
      this.success('添加成功');
    } else {
      this.error('添加失败 ' + (res.msg || ''));
    }
  }
   /**
   * @router post /punctuality/api/order/order/updateStatus
   * @summary 订单状态修改
   * @Description 我们接单或者退单用的接口
   * @request body OrderUpdateStatus
   * @response 200 baseResponse
   */
  async update_status() {
    const { ctx } = this;
    const body = ctx.request.body;

    ctx.validate({
      order_id: { type: 'string', required: true },
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
   * @router post /punctuality/api/order/order/updatePostman
   * @summary 订单状态修改
   * @Description 骑手点送达使用的接口
   * @request body OrderUpdatePostman
   * @response 200 baseResponse
   */
  async update_postman() {
    const { ctx } = this;
    const body = ctx.request.body;

    ctx.validate({
      order_id: { type: 'string', required: true },
    }, body);

    const res = await ctx.service.order.order.update_postman(body);
    if (res.success) {
      this.success('',res.msg);
    } else {
      this.error('修改失败 ' + (res.msg || ''));
    }
  }
  /**
   * @router post /punctuality/api/order/order/updateGrab
   * @summary 订单状态修改
   * @Description 骑手抢单
   * @request body OrderUpdateGrab
   * @response 200 baseResponse
   */
  async update_grab() {
    const { ctx } = this;
    const body = ctx.request.body;

    ctx.validate({
      order_id: { type: 'string', required: true },
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
   * @router post /punctuality/api/order/order/refundOrder
   * @summary 订单状态修改
   * @Description 用户申请退单
   * @request body refundOrder
   * @response 200 baseResponse 
   */
  async refundOrder() {
    const { ctx } = this;
    const body = ctx.request.body;

    ctx.validate({
      order_id: { type: 'string', required: true },
      cause:{ type: 'string', required: true },
    }, body);

    const res = await ctx.service.order.order.refundOrder(body);
    if (res.success) {
      this.success('',res.msg);
    } else {
      this.error('申请失败请刷新' + (res.msg || ''));
    }
  }
   /**
   * @router post /punctuality/api/order/order/updateReception
   * @summary 订单状态修改
   * @Description 骑手变更为派送中
   * @request body OrderUpdateReception
   * @response 200 baseResponse
   */
  async update_reception() {
    const { ctx } = this;
    const body = ctx.request.body;

    ctx.validate({
      order_id: { type: 'string', required: true },
    }, body);

    const res = await ctx.service.order.order.update_reception(body);
    if (res.success) {
      this.success('',res.msg);
    } else {
      this.error('有问题我不说' + (res.msg || ''));
    }
  }
  /**
   * @router post /punctuality/api/order/order/delete
   * @summary 订单删除 后台用
   * @Description 我测试用的
   * @request body OrderDelete
   * @response 200 baseResponse
   */
  async delete() {
    const { ctx } = this;
    const body = ctx.request.body;

    ctx.validate({
      order_id: { type: 'string', required: true },
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
