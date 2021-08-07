/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-08-06 23:32:43
 * @LastEditors: Andy
 * @LastEditTime: 2021-08-07 01:59:16
 */
'use strict';

const Controller = require('../base');

class TestController extends Controller {
    async test(){
      const { app, ctx } = this;
      const Op = app.Sequelize.Op;
      const where = { upt_act: { [Op.ne]: 'D' } };
      let data = await ctx.model.User.Postman.findAll({
        where,
        raw: true
      });
      const array = data
      data.forEach(element => {
        element.history=element.history+element.now
        element.now=0;
        element.updated_id = '0' //表示系统自动更新
      });
      // console.log(data)
      await ctx.model.User.Postman.bulkCreate(data , {updateOnDuplicate:['now','history','updated_id']}).then(result => {
        result.forEach(item => {
            // console.log("item:",item)
        });
      }).catch(err => {
          console.log("err:",err)
      });
    
      this.success(data)
    }
}

module.exports = TestController;
