/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-07-28 16:12:31
 * @LastEditors: Andy
 * @LastEditTime: 2021-08-08 10:38:37
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
  PostmanPage: {
    limit: { type: 'string', required: true, example: 10 },
    page: { type: 'string', required: true, example: 1 },
    name: { type: 'string', required: true, example: "xxx" },
  }
};
