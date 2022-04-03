/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-07-31 21:01:22
 * @LastEditors: Andy
 * @LastEditTime: 2022-03-29 21:13:16
 */
'use strict';
const {keepTwoDecimal} = require('../../extend/util')
const Service = require('egg').Service;

class CommodityService extends Service {
  async page(query) {
    const { app, ctx } = this;
    const { limit, page } = query;
    const Op = app.Sequelize.Op;
    const where = { upt_act: { [Op.ne]: 'D' } };
    if (query.commodity_id) {
      where.commodity_id = { [Op.like]: `%${query.commodity_id}%` };
    }
    if (query.name) {
      where.name = { [Op.like]: `%${query.name}%` };
    }
    if (query.shop_id) {
      where.shop_id = query.shop_id;
    }
    return await ctx.model.Shop.Commodity.findAndCountAll({
      distinct: true, // 不加distinct，count和实际不符
      where,
      offset: (page - 1) * limit,
      limit: parseInt(limit),
      order: [['created_at', 'desc']],
    });
  }


  async create(body) {
    const { app, ctx } = this;
    const Op = app.Sequelize.Op;
    const { userid } = ctx.state.user;
    body.created_id = userid;
    body.updated_id = userid;
    // body.putaway = '0'
    
    try {
      let flag,data
      return await ctx.model.transaction(async t => {
        await ctx.model.Shop.Commodity.findOrCreate({where:{name:body.name,shop_id: body.shop_id , upt_act: 'U' , upt_act: 'I' },defaults: body,transaction: t })
        .then(([user, created]) => {
            // console.log(user.get({
            //   plain: true
            // }))
            
            flag = created
            // console.log(created)
            data = user.get({
              plain: true
            })
          })
          // console.log(data,body.specifications);
          const specificationArr = body.specifications.map(item => {
              return {
                shop_id: data.shop_id,
                commodity_id: data.commodity_id,
                name: item.name,
                type:item.type,
                checkbox:item.checkbox,
                price:keepTwoDecimal(item.price),
                created_id:userid,
              };
          });
          // console.log(specificationArr);
          if(flag){
            const res = await ctx.model.Shop.Specification.bulkCreate(specificationArr, { transaction: t });
            flag = res.length > 0 ? true:false;
          }
          if(flag){
            return { success: true, msg: "添加成功" }
          }else{
            return { success: false, msg: "错误原因该菜品已存在、该商店不存在或者规格有误" }
          }
      })
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async update(body) {
    const { app, ctx } = this;
    const Op = app.Sequelize.Op;
    const { userid } = ctx.state.user;
    body.updated_at = ctx.helper.formatTime(new Date());
    body.updated_id = userid;
    body.upt_act = 'U';
    const specification = body.specifications.map(item => {
      return {
        shop_id: body.shop_id,
        commodity_id: body.commodity_id,
        name: item.name,
        type:item.type,
        checkbox:item.checkbox,
        price:keepTwoDecimal(item.price),
        specification_id:(item.specification_id!=undefined)?item.specification_id:undefined
      };
    });
    let specificationArr = specification
    
    try {
      let where = { upt_act: { [Op.ne]: 'D' },commodity_id:body.commodity_id}
      let dataInfo = await ctx.model.Shop.Specification.findAll({
        where,
        raw: true
      });
      var result = [];
      for(var i = 0; i < specificationArr.length; i++){
       
        if(specificationArr[i].specification_id!=undefined){ // 筛选已有的规格数据
          let obj = specificationArr[i];
          obj.upt_act = 'U';
          result.push(obj);
          // console.log(obj)
        }else{// 未有规格数据
          let obj = specificationArr[i];
          var name = obj.name;
          let type = obj.type
          let checkbox = obj.checkbox
          var commodity_id = obj.commodity_id;
          var isExist = false;
          for(var j = 0; j < dataInfo.length; j++){
              var aj = dataInfo[j];
              var n = aj.name;
              var t = aj.type
              var c = aj.checkbox
              var ng = aj.commodity_id;
              if(n == name&&commodity_id==ng &&t == type &&c== checkbox){
                  isExist = true;
                  break;
              }
          }
          if(!isExist){
            obj.updated_at = ctx.helper.formatTime(new Date());
            obj.upt_act = 'I';
            obj.created_id = userid;
            if(obj.name!=''&&obj.type!=''){
              result.push(obj);
            }
           
          }
        }
      }
      for(var i = 0; i < dataInfo.length; i++){
          let obj = dataInfo[i];
          var name = obj.name;
          var commodity_id = obj.commodity_id;
          let  type = obj.type
          let  checkbox = obj.checkbox
          var isExist = false;
          for(var j = 0; j < specificationArr.length; j++){
              var aj = specificationArr[j];
              var n = aj.name;
              var t = aj.type
              var c = aj.checkbox
              var ng = aj.commodity_id;
              if(n == name&&commodity_id==ng &&t == type &&c== checkbox){
                  isExist = true;
                  break;
              }
          }
          if(!isExist){
            obj.updated_at = ctx.helper.formatTime(new Date());
            obj.updated_id = userid;
            obj.upt_act = 'D';
            result.push(obj);
          }
      }
      console.log(result);
      await ctx.model.Shop.Specification.bulkCreate(result, {updateOnDuplicate:['name','price','type','checkbox','created_id','updated_id','updated_at','upt_act']}).then(result => {
        result.forEach(item => {
            // console.log("item:",item)
        });
      }).catch(err => {
          console.log("err:",err)
      });

      return await ctx.model.transaction(async t => {
       
        // await ctx.model.Shop.Specification.bulkCreate(specificationArr, {updateOnDuplicate:['name','type','price','checkbox','updated_id','updated_at','upt_act'], transaction: t }).then(result => {
        //   result.forEach(item => {
        //       // console.log("item:",item)
        //   });
        // }).catch(err => {
        //     console.log("err:",err)
        // });

        return await ctx.model.Shop.Commodity.update(body, {
          where: {
            commodity_id: body.commodity_id,
          },
          transaction: t
        });
      })
    
   
        
      
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async update_putAway(body) {
    const { ctx } = this;
    const { userid } = ctx.state.user;
    body.updated_at = ctx.helper.formatTime(new Date());
    body.updated_id = userid;
    body.upt_act = 'U';
    try {
      return await ctx.model.Shop.Commodity.update(body, {
        where: {
          commodity_id: body.commodity_id,
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async delete({ commodity_id }) {
    const { app, ctx } = this;
    const body = {
      upt_act: 'D', // 假删
      updated_at: ctx.helper.formatTime(new Date()),
      updated_id: ctx.state.user.userid,
    };
    try {
      await ctx.model.Shop.Commodity.update(body, {
        where: { commodity_id },
      });
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }
}

module.exports = CommodityService;
