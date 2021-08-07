/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-07-31 17:19:23
 * @LastEditors: Andy
 * @LastEditTime: 2021-08-02 15:12:11
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
    return await ctx.model.Shop.Shop.findAndCountAll({
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
    body.opening = '0'
    
    try {
      return await ctx.model.Shop.Shop.create(body);
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
      const exit = await ctx.model.Shop.Shop.findAll({
        include: {
          model: ctx.model.Shop.Commodity,
          where: { shop_id },
        },
        where: { upt_act: { [Op.ne]: 'D' } },
      });
      if (exit) {
        return { success: false, msg: '有菜品绑定该商店，无法删除！' };
      }
      await ctx.model.Shop.Shop.update(body, {
        where: { shop_id },
      });
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }
}

module.exports = ShopService;
