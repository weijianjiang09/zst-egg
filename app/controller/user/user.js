/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-08-01 16:33:58
 * @LastEditors: Andy
 * @LastEditTime: 2021-08-09 11:26:49
 */
/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-08-01 16:33:58
 * @LastEditors: Andy
 * @LastEditTime: 2021-08-08 00:36:45
 */
'use strict';
/**
 * @Controller User
 */
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
   * @router post /punctuality/api/user/user/wxLogin
   * @summary 微信登录
   * @request body wxlogin
   * @response 200 wxLogin 
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
      this.success(res,"登录成功") 
    }else{
      this.error(res) 
    }  
  }
  /**
   * @router post /punctuality/api/user/user/update
   * @summary 修改个人信息
   * @request body wxUpdate
   * @response 200  baseResponse
   */ 
  async update(){
    const {ctx, app} = this
    const Data = ctx.request.body;
    const res = await ctx.service.user.user.update(Data)
    if(res.success){
      this.success('',res.msg) 
    }else{
      this.error(res.msg) 
    }  
  }

  async wxLoginByToken(){
    const {ctx, app} = this
    const { user_id } = ctx.state.user;
    const res = await ctx.service.user.user.wxLoginByToken(user_id)
    if(res.success){
      this.success(res.userInfo,"登录成功") 
    }else{
      this.error(res) 
    }  
  }
}

module.exports = UserController;
