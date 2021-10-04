/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-10-04 19:53:56
 * @LastEditors: Andy
 * @LastEditTime: 2021-10-04 23:25:49
 */
'use strict';
/**
 * @Controller Order
 */
const Controller = require('../base');

class PostPriceController extends Controller {
  async select(){
    const { ctx } = this;
    let res = await ctx.service.order.postPrice.select()
    if (res) {
      this.success(res);
    } else {
      this.error('查询失败！');
    }
  }
  async change(){
    
  }
}

module.exports = PostPriceController;