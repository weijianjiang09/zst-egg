/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-07-31 21:01:22
 * @LastEditors: Andy
 * @LastEditTime: 2021-08-01 15:54:18
 */
'use strict';

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
      order: [[ 'created_at', 'desc' ]],
    });
  }


  async create(body) {
    const { ctx } = this;

    const { userid } = ctx.state.user;
    body.created_id = userid;
    body.updated_id = userid;
    body.putaway = '0'
    
    try {
      return await ctx.model.Shop.Commodity.create(body);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async update(body) {
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
