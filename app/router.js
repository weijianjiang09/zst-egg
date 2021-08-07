/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-07-28 15:58:23
 * @LastEditors: Andy
 * @LastEditTime: 2021-08-07 23:31:43
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
  //

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
  

  //查询订单 
  router.get('/punctuality/api/order/order/page', jwt, controller.order.order.page);
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


  
  // 测试
  router.get('/punctuality/api/test/test', jwt, controller.test.test.test);
};