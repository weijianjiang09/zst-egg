/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-08-06 22:17:16
 * @LastEditors: Andy
 * @LastEditTime: 2021-08-08 10:39:29
 */
'use strict';
const Subscription = require('egg').Subscription;

class Postman extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      cron: '0 0 0 * * *', //每天零点执行
      type: 'all', // 指定所有的 worker 都需要执行  
      immediate: true,
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const { app, ctx } = this;
    const Op = app.Sequelize.Op;
    const where = { upt_act: { [Op.ne]: 'D' } };
    let data = await ctx.model.User.Postman.findAll({
      where,
      raw: true
    });
    data.forEach(element => {
      // element.history=element.history+element.now
      element.now = 0;
      element.updated_id = '0' //表示系统自动更新
      element.updated_at = ctx.helper.formatTime(new Date());
    });
    // console.log(data)
    await ctx.model.User.Postman.bulkCreate(data, { updateOnDuplicate: ['now', 'history', 'updated_id', 'updated_at'] }).then(result => {
      result.forEach(item => {
        // console.log("item:",item)
      });
    }).catch(err => {
      console.log("err:", err)
    });
  }
}

module.exports = Postman;