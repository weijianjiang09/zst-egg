/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-07-28 16:09:05
 * @LastEditors: Andy
 * @LastEditTime: 2021-08-13 20:18:20
 */
'use strict';

const { Controller } = require('egg');
class BaseController extends Controller {
    /**
   * 规范化响应数据
   * @param success Bool 结果
   * @param message String 提示消息
   * @param result Object 结果对象
   * @returns {{data,  type: string, message}|{data, type: string, message}}
   */
  success(data,message) {
    this.ctx.body = {
      code: 200,
      success: true,
      message,
      data,
    };
  }
    /**
   * 规范化响应数据
   * @param success Bool 结果
   * @param message String 提示消息
   * @returns {{  type: string, message}|{type: string, message}}
   */
  error(message) {
    this.ctx.body = {
      code: 200,
      success: false,
      message,
    };
  }
}
module.exports = BaseController;
