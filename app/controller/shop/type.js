/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-09-16 16:16:11
 * @LastEditors: Andy
 * @LastEditTime: 2021-09-17 15:00:37
 */
'use strict';

const Controller = require('../base');
/**
 * @Controller Type
 */
class TypeController extends Controller {
  
  /**
   * @router get /punctuality/api/shop/type/select
   * @summary 店铺分类查询
   * @request body typeSelect
   * @response 200 baseResponse
   */  
  async typeSelect(){
    const { ctx } = this;
    const query = ctx.query;
    
    ctx.validate({
      shop_id: { type: 'string', required: true },
    }, query);

    this.success(await ctx.service.shop.type.typeSelect(query),"查询成功！");
  }

  async commoditySelect(){
    const { ctx } = this;
    const query = ctx.query;
    
    ctx.validate({
      type_id: { type: 'string', required: true },
    }, query);
    let data = await ctx.service.shop.type.commoditySelect(query)
    if(data.length>0){
      console.log(data)
      this.error("该分类下还有菜品,无法删除分类！");
    }else{
      this.success(data,"无绑菜品");
    }
    
  }
}


module.exports = TypeController;
