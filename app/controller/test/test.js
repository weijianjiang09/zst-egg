/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-08-06 23:32:43
 * @LastEditors: Andy
 * @LastEditTime: 2021-10-10 10:51:13
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
    async testType(){
      const { app, ctx } = this;
      const Op = app.Sequelize.Op;
      const where = { upt_act: { [Op.ne]: 'D' } };
      const body = ctx.request.body;
      // console.log(body);
      let dataInfo = await ctx.model.Shop.Type.findAll({
        where,
        raw: true
      });
      // console.log(dataInfo);

      // body.data.forEach(elements => {
      //   if(elements.type_id==undefined){
      //     dataInfo.forEach(element => {
      //       if(elements.shop_id==element.shop_id&&element.type_name==elements.type_name){
      //         data.push(elements)
      //       }
      //     });
      //   }
      //   data.push(elements)
      // })
      let newData = [];
    //   var array1 = [ 
    //     {"Num": "A "  },
    //     {"Num": "B" }
    // ];
    // var array2 = [
    //      {"Num": "A ","Name": "t1 " }, 
    //      {"Num": "B","Name": "t2"},
    //      {"Num": "C " ,"Name": "t3 ",age:'222'},
    //      {"Num": "D" ,"Name": "t4 ",age:'3333'}
    // ];
    var result = [];
    for(var i = 0; i < body.data.length; i++){
      if(body.data[i].type_id!=undefined){
        let obj = body.data[i];
        result.push(obj);
      }else{
        let obj = body.data[i];
        var type_name = obj.type_name;
        var shop_id = obj.shop_id;
        var isExist = false;
        for(var j = 0; j < dataInfo.length; j++){
            var aj = dataInfo[j];
            var n = aj.type_name;
            var ng = aj.shop_id;
            if(n == type_name&&shop_id==ng){
                isExist = true;
                break;
            }
        }
        if(!isExist){
            result.push(obj);
        }
      }
        
    }
    console.log(result);
     
      // console.log(newData);
      await ctx.model.Shop.Type.bulkCreate(result, {updateOnDuplicate:['type_name']}).then(result => {
        result.forEach(item => {
            // console.log("item:",item)
        });
      }).catch(err => {
          console.log("err:",err)
      });
    }

    async testTime(){
      const { app, ctx } = this;
      const Op = app.Sequelize.Op;
      const where = { upt_act: { [Op.ne]: 'D' } };
      const body = ctx.request.body;
      console.log(body.end_time,body.start_time,ctx.helper.formatTime(new Date()));
      console.log(body.end_time<ctx.helper.formatTime(new Date()),ctx.helper.formatTime(new Date())<body.start_time,);
      
    }
}

module.exports = TestController;

