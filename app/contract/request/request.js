/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-07-28 16:12:31
 * @LastEditors: Andy
 * @LastEditTime: 2021-08-09 11:10:31
 */
'use strict';
module.exports = {
  // userdata: {
  //   user_id: { type: 'integer', description: '用户id' },
  // },
  wxlogin: {
    appid: { type: 'string', description: '微信小程序的appid', required: true },
    secret: { type: 'string', description: '微信小程序的密钥', required: true },
    code: { type: 'string', description: '微信小程序wx.login返回的code', required: true },
    userInfo: {
      type: 'object', example: {
        user_name: "xxx",
        avatar_url: "....",
        // phone_number: phoneNumber,
        sex: "",
      }, description: '用户数据', required: true
    },
  },
  wxUpdate:{
    userInfo: {
      type: 'object', example: {
        user_name: "xxx",
        avatar_url: "....",
        // phone_number: phoneNumber,
        sex: "",
      }, description: '用户数据', required: true
    },
  },
  ShopCreate:{ 
    name :{ type: 'string', required: true,description: "商铺名" },
    location: { type: 'string', required: true,description: "位置" },
    img_url:{type: 'string', required: true,description: "图片路径"},
    notice:{type: 'string',description: "公告" },
    time:{type: 'string',description: "营业时间" ,example:"8:30:00,20:30:00" }
  },
  ShopUpdate:{ 
    shop_id :{type: 'integer', required: true,description: "商铺ID" },
    name :{ type: 'string', required: true,description: "商铺名" },
    location: { type: 'string', required: true,description: "位置" },
    img_url:{type: 'string', required: true,description: "图片路径"},
    notice:{type: 'string',description: "公告" },
    time:{type: 'string',description: "营业时间" ,example:"8:30:00,20:30:00" }
  },
  ShopDelete:{ 
    shop_id :{type: 'integer', required: true,description: "商铺ID" },
  },
  ShopPage:{
    limit: { type: 'string', required: true, example: 10 ,description:"条数" },
    page: { type: 'string', required: true, example: 1 ,description: "页数"},
    name: { type: 'string',  example: "xxxx" ,description: "名字"},
    opening: { type: 'string', example: 1 ,description: "是否营业 1是 0否"},
    location: { type: 'string', example: "xxxxxxxx" ,description: "位置"}
  },
  CommodityPage:{
    limit: { type: 'string', required: true, example: 10 ,description:"条数" },
    page: { type: 'string', required: true, example: 1 ,description: "页数"},
    name: { type: 'string',  example: "xxxx" ,description: "名字"},
    shop_id :{type: 'integer', description: "商铺ID" },
    commodity_id :{type: 'integer',description: "菜品ID" },
  },
  CommodityCreate:{
    shop_id :{type: 'integer',required: true, description: "商铺ID" },
    name :{type: 'string',required: true, description: "菜品名" },
    img_url :{type: 'string',required: true, description: "图片路径" },
    price :{type: 'integer', description: "菜品单价"},
    description:{type: 'string',description: "菜品描述" }
  },
  CommodityUpdate:{
    commodity_id :{type: 'integer',required: true,description: "菜品ID" },
    shop_id :{type: 'integer', description: "商铺ID" },
    name :{type: 'string', description: "菜品名" },
    img_url :{type: 'string', description: "图片路径" },
    price :{type: 'integer', description: "菜品单价"},
    description:{type: 'string',description: "菜品描述" },
    putaway:{type: 'string',description: "是否上架 0下架 1上架" },
  },
  CommodityPutaway:{
    commodity_id :{type: 'integer',required: true,description: "菜品ID" },
    putaway:{type: 'string',description: "是否上架 0下架 1上架" },
  },
  CommodityDelete:{
    commodity_id :{type: 'integer',required: true,description: "菜品ID" },
  },
  PostmanPage: {
    limit: { type: 'string', required: true, example: 10 ,description:"条数" },
    page: { type: 'string', required: true, example: 1 ,description: "页数"},
    name: { type: 'string', example: "xxx" ,description: "名字 （筛选条件可传可不传）"},
  },
  PostmanCreate:{
    name:{type: 'string',required: true,description: "名字" },
    phone_number:{type: 'string',required: true,description: "电话号码" },
    sex:{type: 'string',required: true,description: "性别" },
  },
  PostmanUpdate_msg:{
    postman_id:{type: 'integer',required: true,description: "骑手ID"},
    name:{type: 'string',required: true,description: "名字" },
    phone_number:{type: 'string',description: "电话号码" },
    sex:{type: 'string',description: "性别" },
    now:{type: 'integer',description: "今日送达" },
    overtime:{type: 'integer',description: "总超时单数" },
    history:{type: 'integer',description: "历史总单数" },
  },
  PostmanUpdateAttestation:{
    postman_id:{type: 'integer',required: true,description: "骑手ID"},
    attestation:{type: 'integer',required: true,description: "认证 0未认证 1已认证"},
  },
  PostmanDelete:{
    postman_id:{type: 'integer',required: true,description: "骑手ID"},
  },
  AddressPage:{
    limit: { type: 'string', required: true, example: 10 ,description:"条数" },
    page: { type: 'string', required: true, example: 1 ,description: "页数"},
  },
  AddressPageAdmin:{
    limit: { type: 'string', required: true, example: 10 ,description:"条数" },
    page: { type: 'string', required: true, example: 1 ,description: "页数"},
    sex:{type: 'string', required: true, example: "0" ,description:"性别筛选"},
    name:{type: 'string', required: true, example: "张" ,description:"名字模糊搜索"},
    user_id:{type: 'integer', required: true, example: 10 ,description:"user_id精确查询"}
  },
  AddressCreate:{
    name:{type: 'string', required: true, example: "xxx",description:"名字"},
    address:{type: 'string', required: true, example: "xxxxxx",description:"地址"},
    phone_number:{type: 'string', required: true, example: "xxxxxx",description:"电话号码"},
    sex:{type: 'string', required: true, example: "0",description:"性别"},
  },
  AddressUpdate:{
    address_id:{type: 'integer', required: true, example: 10 ,description:"address_id"},
    name:{type: 'string',  example: "xxx",description:"名字"},
    address:{type: 'string', example: "xxxxxx",description:"地址"},
    phone_number:{type: 'string',  example: "xxxxxx",description:"电话号码"},
    sex:{type: 'string',  example: "0",description:"性别"},
  },
  AddressDelete:{
    address_id:{type: 'integer', required: true, example: 10 ,description:"address_id"},
  },
  OrderPage:{
    limit: { type: 'string', required: true, example: 10 ,description:"条数" },
    page: { type: 'string', required: true, example: 1 ,description: "页数"},
    id:{type: 'integer',  example: 10 ,description:"骑手ID"},
    user_id:{type: 'integer',  example: 10 ,description:"用户ID"},
    shop_id:{type: 'integer', example: 10 ,description:"商家ID"},
    order_id:{type: 'integer',  example: 10 ,description:"订单ID"},
    status:{type: 'string', example: "1" ,description: "0未接单 1已接单 2等待派送 3派送中 4已送达 5退单 6超时 7已处理超时"},
  },
  OrderCreate:{
    address_id: { type: 'integer', required: true ,description:"地址ID",example:0},
    shop_id: { type: 'integer', required: true ,description:"商店ID",example:0},
    commodity :{ type: 'array',itemType: 'string', required: true ,description:"菜品",example:[{
      order_id: 0,
      commodity_id: 0,
      number: 1,
      specification: 'xxxx'
    },{
      order_id: 0,
      commodity_id: 1,
      number: 1,
      specification: 'xxxx'
    }]},
    remark: { type: 'string',description:"备注",example:"不要香菜"},
  },
  OrderUpdateStatus:{
    order_id:{type: 'integer',  example: 10 ,required: true ,description:"订单ID"},
    status:{type: 'string', example: "1" ,required: true ,description: "0未接单 1已接单 2等待派送 3派送中 4已送达 5退单 6超时 7已处理超时"},
  },
  OrderUpdatePostman:{
    order_id:{type: 'integer',  example: 10 ,required: true ,description:"订单ID"},
  },
  OrderUpdateGrab:{
    order_id:{type: 'integer',  example: 10 ,required: true ,description:"订单ID"},
    id:{type: 'integer',  example: 10 ,required: true ,description:"骑手ID"},
  },
  OrderDelete:{
    order_id:{type: 'integer',  example: 10 ,required: true ,description:"订单ID"},
  }
};
