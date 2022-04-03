/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-07-28 15:58:23
 * @LastEditors: Andy
 * @LastEditTime: 2022-03-24 22:28:49
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt, io } = app;

  router.post('/punctuality/api/user/login', controller.sys.user.login);
  router.get('/punctuality/api/user/info', jwt, controller.sys.user.getCurUserInfo);

  router.post('/punctuality/api/change/psw', jwt, controller.sys.user.changePsw);
  router.post('/punctuality/api/reset/psw', jwt, controller.sys.user.resetPsw);
  // 文件上传
  router.post('/punctuality/api/file', controller.sys.file.upload);
  // 图像上传
  router.post('/punctuality/api/upload/image', controller.sys.file.upload);
  router.get('/punctuality/api/user/page', jwt, controller.sys.user.page);
  router.post('/punctuality/api/user/create', jwt, controller.sys.user.create);
  router.post('/punctuality/api/user/update', jwt, controller.sys.user.update);
  router.post('/punctuality/api/user/delete', jwt, controller.sys.user.delete);

  router.get('/punctuality/api/role/query', jwt, controller.sys.role.query);
  router.get('/punctuality/api/role/page', jwt, controller.sys.role.page);
  router.post('/punctuality/api/role/create', jwt, controller.sys.role.create);
  router.post('/punctuality/api/role/update', jwt, controller.sys.role.update);
  router.post('/punctuality/api/role/delete', jwt, controller.sys.role.delete);

  // 查询所有菜单
  router.get('/punctuality/api/menu/query/tree', jwt, controller.sys.menu.queryTree);
  // 添加菜单
  router.post('/punctuality/api/menu/create', jwt, controller.sys.menu.create);
  // 修改菜单
  router.post('/punctuality/api/menu/update', jwt, controller.sys.menu.update);
  // 删除菜单
  router.post('/punctuality/api/menu/delete', jwt, controller.sys.menu.delete);
  // 更新角色菜单
  router.post('/punctuality/api/role/menu/update', jwt, controller.sys.menu.setRoleMenu);
  // 根据角色id查询菜单
  router.get('/punctuality/api/role/menu', jwt, controller.sys.menu.getRoleMenu);
  // 获取当前用户菜单
  router.get('/punctuality/api/user/menu', jwt, controller.sys.menu.getCurUserMenu);
  // 通过角色获取对应的用户
  router.get('/punctuality/api/users/by/role', jwt, controller.sys.user.getUsersByRole);

  // 创建店铺
  router.post('/punctuality/api/shop/shop/create', jwt, controller.shop.shop.create);
  // 更新店铺
  router.post('/punctuality/api/shop/shop/update', jwt, controller.shop.shop.update);
  // 删除店铺
  router.post('/punctuality/api/shop/shop/delete', jwt, controller.shop.shop.delete);
  // 查询店铺
  router.get('/punctuality/api/shop/shop/page', jwt, controller.shop.shop.page);

  // 查询订单
  router.get('/punctuality/api/shop/commodity/page', jwt, controller.shop.commodity.page);
  // 添加菜品
  router.post('/punctuality/api/shop/commodity/create', jwt, controller.shop.commodity.create);
  // 更新菜品信息
  router.post('/punctuality/api/shop/commodity/update', jwt, controller.shop.commodity.update);
   // 上下架菜品
  router.post('/punctuality/api/shop/commodity/putaway', jwt, controller.shop.commodity.update_putAway);
  // 删除菜品信息
  router.post('/punctuality/api/shop/commodity/delete', jwt, controller.shop.commodity.delete);

  // 账号状态验证
  // router.post
  // 微信登录
  router.post('/punctuality/api/user/user/wxLogin',controller.user.user.wxLogin)
  // 修改个人信息
  router.post('/punctuality/api/user/user/update',jwt,controller.user.user.update)
  // 查询用户信息
  router.get('/punctuality/api/user/user/page',jwt,controller.user.user.page)

  

  // 后台骑手查询
  router.get('/punctuality/api/user/postman/admin/page', jwt, controller.user.postman.page);
  // 骑手创建
  router.post('/punctuality/api/user/postman/create',jwt,controller.user.postman.create)
  // 删除骑手
  router.post('/punctuality/api/user/postman/delete',jwt,controller.user.postman.delete)
  // 更新信息
  router.post('/punctuality/api/user/postman/updateMsg',jwt,controller.user.postman.update_msg)
  // 认证
  router.post('/punctuality/api/user/postman/updateAttestation',jwt,controller.user.postman.updateAttestation)
  //个人信息
  router.get('/punctuality/api/user/postman/getPostmanInfo',jwt,controller.user.postman.getPostmanInfo)

  // 用户查询地址
  router.get('/punctuality/api/order/address/user/page', jwt, controller.order.address.page);
  // 后台管理地址
  router.get('/punctuality/api/shop/address/admin/page', jwt, controller.order.address.page_admin);
  // 添加地址
  router.post('/punctuality/api/order/address/create', jwt, controller.order.address.create);
  // 更新地址
  router.post('/punctuality/api/order/address/update', jwt, controller.order.address.update);
  // 删除地址
  router.post('/punctuality/api/order/address/delete', jwt, controller.order.address.delete);
  

  //查询订单 已完成
  router.get('/punctuality/api/order/order/page', jwt, controller.order.order.page);
  // 查询订单 未完成
  router.get('/punctuality/api/order/order/pageNow', jwt, controller.order.order.page_now);
  //骑手查询 
  router.get('/punctuality/api/order/order/pagePostman', jwt, controller.order.order.pagePostman);
  //用户查询 
  router.get('/punctuality/api/order/order/pageUser', jwt, controller.order.order.page_user);
  // 创建订单
  router.post('/punctuality/api/order/order/create', jwt, controller.order.order.create);
  //修改状态
  router.post('/punctuality/api/order/order/updateStatus', jwt, controller.order.order.update_status);
  //修改骑手
  router.post('/punctuality/api/order/order/updatePostman', jwt, controller.order.order.update_postman);
  // 删除
  router.post('/punctuality/api/order/order/delete', jwt, controller.order.order.delete);
  // 抢单
  router.post('/punctuality/api/order/order/updateGrab', jwt, controller.order.order.update_grab);
  // 转为派送中
  router.post('/punctuality/api/order/order/updateReception', jwt, controller.order.order.update_reception);
  //申请退款
  router.post('/punctuality/api/order/order/refundOrder',jwt, controller.order.order.refundOrder);

  //菜品规格
  router.post('/punctuality/api/shop/specification/update',jwt, controller.shop.specification.update);

  // 商店类型搜索
  router.get('/punctuality/api/shop/type/select', jwt, controller.shop.type.typeSelect);
  // 确认分类下是否还有菜品
  router.get('/punctuality/api/shop/type/commodityIS', jwt, controller.shop.type.commoditySelect);

  //配送费
  router.get('/punctuality/api/order/postPrice/select', jwt, controller.order.postPrice.select);
  // 修改
  router.post('/punctuality/api/order/postPrice/change', jwt, controller.order.postPrice.change);
  //添加
  router.post('/punctuality/api/order/postPrice/create', jwt, controller.order.postPrice.create);
  // 删除
  router.post('/punctuality/api/order/postPrice/delete', jwt, controller.order.postPrice.delete);

  // 商店评论查询
  router.get('/punctuality/api/shop/evaluate/ShopEvaluateSelect', jwt, controller.shop.evaluate.ShopEvaluateSelect);
  // 以内容模糊查询
  router.get('/punctuality/api/shop/evaluate/EvaluateSelect', jwt, controller.shop.evaluate.EvaluateSelect);
  // 评论删除 
  router.post('/punctuality/api/shop/evaluate/ShopEvaluateDelete', jwt, controller.shop.evaluate.ShopEvaluateDelete);
  // 评论
  router.post('/punctuality/api/shop/evaluate/ShopEvaluateCreate', jwt, controller.shop.evaluate.ShopEvaluateCreate);

  // 查询优惠卷
  router.get('/punctuality/api/coupon/coupon/CouponSelect', jwt, controller.coupon.coupon.CouponSelect);
  // 优惠卷创建
  router.post('/punctuality/api/coupon/coupon/CouponCreate', jwt, controller.coupon.coupon.CouponCreate);
  // 删除优惠卷
  router.post('/punctuality/api/coupon/coupon/CouponDelete', jwt, controller.coupon.coupon.CouponDelete);
  // 兑换优惠卷
  router.post('/punctuality/api/coupon/coupon/CouponExchange', jwt, controller.coupon.coupon.CouponExchange);
  
  // 支付
  router.post('/punctuality/api/pay/pay',jwt, controller.pay.pay.CreatePaymentInfo);
  // 退款
  router.post('/punctuality/api/pay/refund', jwt,controller.pay.pay.refund);

  // 测试
  router.get('/punctuality/api/test/test', jwt, controller.test.test.test);
  // type 测试
  router.post('/punctuality/api/test/testType', jwt, controller.test.test.testType);
  // 时间测试
  router.post('/punctuality/api/test/testTime',controller.test.test.testTime);
};