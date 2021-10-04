/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-07-31 17:19:23
 * @LastEditors: Andy
 * @LastEditTime: 2021-09-17 13:20:19
 */
'use strict';

const Service = require('egg').Service;

class ShopService extends Service {
  async page(query) {
    const { app, ctx } = this;
    const { limit, page } = query;
    const Op = app.Sequelize.Op;
    const where = { upt_act: { [Op.ne]: 'D' } };
    if (query.location) {
      where.location = { [Op.like]: `%${query.location}%` };
    }
    if (query.name) {
      where.name = { [Op.like]: `%${query.name}%` };
    }
    if (query.opening) {
      where.opening = { [Op.like]: `%${query.opening}%` };
    }
    if (query.shop_id){
      where.shop_id = query.shop_id;
    }
    return await ctx.model.Shop.Shop.findAndCountAll({
      distinct: true, // 不加distinct，count和实际不符
      where,
     
      include: [{
          required: false,
          model: ctx.model.Shop.Commodity,
          where:{ upt_act: { [Op.ne]: 'D' }},
          include: {
            model: ctx.model.Shop.Type,
            required: false,
            attributes: ['type_id', 'type_name', 'shop_id'],
          }
      }, {
        model: ctx.model.Shop.Type,
        required: false,//加上此参数,指定为外连接,能保证空数据时不过滤父元素
        where:{ upt_act: { [Op.ne]: 'D' }},
        attributes: ['shop_id', 'type_id', 'type_name'],
      },],
      offset: (page - 1) * limit,
      limit: parseInt(limit),
      order: [['created_at', 'desc']],
      
    });
  }

  async create(body) {
    const { ctx ,app} = this;

    const { userid } = ctx.state.user;
    const Op = app.Sequelize.Op;
    const where = { upt_act: { [Op.ne]: 'D' } };
    body.created_id = userid;
    body.updated_id = userid;
    // body.opening = '0'
    let TypeArray = body.typeArray
  
    try {
      await ctx.model.Shop.Shop.create(body);
      return  await ctx.model.transaction(async t => {
        
        let shopData = await ctx.model.Shop.Shop.findAll({
          order:[['shop_id', 'DESC']],
          limit:1,
          raw: true
        })
        console.log(shopData[0].shop_id);
        TypeArray.forEach(element => {
          element.created_id = userid
          element.shop_id=shopData[0].shop_id
        });
        return await ctx.model.Shop.Type.bulkCreate(TypeArray,{ transaction: t })
      })

    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async update(body) {
    const { ctx ,app} = this;
    const { userid } = ctx.state.user;
    const Op = app.Sequelize.Op;
    const where = { upt_act: { [Op.ne]: 'D' } };
    body.updated_at = ctx.helper.formatTime(new Date());
    body.updated_id = userid;
    body.upt_act = 'U';
    let TypeArray = body.typeArray
    try {
      let dataInfo = await ctx.model.Shop.Type.findAll({
        where,
        raw: true
      });
      var result = [];
      for(var i = 0; i < TypeArray.length; i++){
        if(TypeArray[i].type_id!=undefined){
          let obj = TypeArray[i];
          obj.upt_act = 'U';
          result.push(obj);
        }else{
          let obj = TypeArray[i];
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
            obj.updated_at = ctx.helper.formatTime(new Date());
            obj.updated_id = userid;
            result.push(obj);
          }
        }
      }
      for(var i = 0; i < dataInfo.length; i++){
          let obj = dataInfo[i];
          var type_name = obj.type_name;
          var shop_id = obj.shop_id;
          var isExist = false;
          for(var j = 0; j < TypeArray.length; j++){
              var aj = TypeArray[j];
              var n = aj.type_name;
              var ng = aj.shop_id;
              if(n == type_name&&shop_id==ng){
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
      await ctx.model.Shop.Type.bulkCreate(result, {updateOnDuplicate:['type_name','updated_id','updated_at','upt_act']}).then(result => {
        result.forEach(item => {
            // console.log("item:",item)
        });
      }).catch(err => {
          console.log("err:",err)
      });
      return await ctx.model.Shop.Shop.update(body, {
        where: {
          shop_id: body.shop_id,
          
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async delete({ shop_id }) {
    const { app, ctx } = this;
    const body = {
      upt_act: 'D', // 假删
      updated_at: ctx.helper.formatTime(new Date()),
      updated_id: ctx.state.user.userid,
    };
    try {
      const Op = app.Sequelize.Op;
      const exit = await ctx.model.Shop.Commodity.findAll({
        where: {shop_id:shop_id ,  upt_act: { [Op.ne]: 'D' } },
      });
      console.log(exit)
      if (exit!='') {
        return { success: false, msg: '有菜品绑定该商店，无法删除！' };
      }
      await ctx.model.Shop.Shop.update(body, {
        where: { shop_id },
      });
      let dataInfo = await ctx.model.Shop.Type.findAll({
        where:{ shop_id:shop_id },
        raw: true
      });
      dataInfo.forEach(element => {
        element.upt_act = 'D'
        element.updated_at = ctx.helper.formatTime(new Date())
        element.updated_id= ctx.state.user.userid
      });
      await ctx.model.Shop.Type.bulkCreate(dataInfo, {updateOnDuplicate:['type_name','updated_id','updated_at','upt_act']}).then(result => {
        result.forEach(item => {
            // console.log("item:",item)
        });
      }).catch(err => {
          console.log("err:",err)
      });
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }
}

module.exports = ShopService;
