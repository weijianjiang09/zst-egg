/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-08-01 16:33:58
 * @LastEditors: Andy
 * @LastEditTime: 2021-08-08 00:03:48
 */
'use strict';

const Controller = require('../base');

class UserController extends Controller {
  /**
   * @name: 蒋炜楗
   * @msg: 账号状态检测
   * @param {*}
   * @return {*}
   */  
  async status() {
    const {ctx} = this
    const reqData = ctx.request.body
    // validator.equals()
    const res = await ctx.service.aboutUser.wxUserService.status(reqData.where)
    if(res.success){
      this.success(res) 
    }else{
      this.error(res) 
    }  
  }
  /**
   * @name: 蒋炜楗
   * @msg: 微信登录
   * @param {*}
   * @return {*}
   */  
  async wxLogin(){
    const {ctx, app} = this
    const reqData = ctx.request.body;
    ctx.validate({
      appid: { type: 'string', required: true },
      secret: { type: 'string', required: true },
      code: { type: 'string', required: true },
      userInfo:{ type: 'object', required: true },
    }, body);

    const res = await ctx.service.user.user.wxLogin(reqData)
    if(res.success){
      this.success(res) 
    }else{
      this.error(res) 
    }  
  }
  /**
   * @name: 蒋炜楗
   * @msg: 
   * @param {*}
   * @return {*}
   */  
  async update(){
    const {ctx, app} = this
    const Data = ctx.request.body;
    const res = await ctx.service.user.user.update(Data)
    if(res.success){
      this.success(res.msg) 
    }else{
      this.error(res.msg) 
    }  
  }
  
}

module.exports = UserController;
