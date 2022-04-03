/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-11-09 23:49:09
 * @LastEditors: Andy
 * @LastEditTime: 2021-11-12 12:51:53
 */
'use strict';
const Service = require('egg').Service;
const dayjs = require("dayjs")
const moment = require('moment')
const {keepTwoDecimal} = require('../../extend/util')
class SpecificationService extends Service {

  // async page(query){
  //   const { app, ctx } = this;
  //   const { limit, page } = query;
  //   const Op = app.Sequelize.Op;
  //   const where = {
  //     upt_act: { [Op.ne]: 'D' },
  //   };
  // }

  async create(body){
    const { app, ctx } = this;
    const { userid } = ctx.state.user;
    let created_id = userid

    return await ctx.model.transaction(async t => {

      console.log(specificationArr)
      const specificationArr = body.specifications.map(item => {
        return {
          shop_id: body.shop_id,
          commodity_id: body.commodity_id,
          name: item.name,
          type:item.type,
          checkbox:item.checkbox,
          price:item.price,
          created_id
        };
      });
      const res = await ctx.model.Shop.Specification.bulkCreate(specificationArr, { transaction: t });
      return { success: res.length > 0 };
    });
  }

  async update(body){
    const { app, ctx } = this;
    const { userid } = ctx.state.user;
    const where = {
      upt_act: { [Op.ne]: 'D' },
      // shop_id:body.shop_id
    };
    // where.commodity_id = body.commodity_id
    // where.name  = body.name
    // where.specification_id
    try {
      let dataInfo = await ctx.model.Shop.Specification.findAll({
        where:{
          upt_act: { [Op.ne]: 'D' },
          commodity_id:body.commodity_id
        },
        raw: true
      });
      var result = [];
      for(var i = 0; i < specifications.length; i++){
        if(specifications[i].specification_id!=undefined){
          let obj = specifications[i];
          obj.upt_act = 'U';
          result.push(obj);
        }else if(specifications[i].state=="D"){
          let obj = specifications[i];
          obj.updated_at = ctx.helper.formatTime(new Date());
          obj.updated_id = userid;
          obj.upt_act = 'D';
          result.push(obj);
        }else{
          let obj = specifications[i];
          var name = obj.name;
          var type = obj.type;
          var commodity_id = body.commodity_id
          var isExist = false;
          for(var j = 0; j < dataInfo.length; j++){
              var aj = dataInfo[j];
              var n = aj.name;
              var nx = aj.type
              var ng = aj.commodity_id;
              if(n == name&&commodity_id==ng&&nx==type){
                  isExist = true;
                  break;
              }
          }
          if(!isExist){
            obj.updated_at = ctx.helper.formatTime(new Date());
            obj.updated_id = userid;
            obj.commodity_id= body.commodity_id
            obj.shop_id = body.shop_id
            result.push(obj);
          }
        }
      }
      console.log(result);
      const res = await ctx.model.Shop.Specification.update(body,{
        where
      })
    } catch (error) {
      
    }

   
  }
}

module.exports = SpecificationService;