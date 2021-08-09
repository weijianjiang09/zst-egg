/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-08-02 17:22:41
 * @LastEditors: Andy
 * @LastEditTime: 2021-08-08 17:45:49
 */
'use strict';

const Service = require('egg').Service;

class AddressService extends Service {
  async page(query) {
    const { app, ctx } = this;
    const { limit, page } = query;
    const { userid } = ctx.state.user;
    const Op = app.Sequelize.Op;
    const where = { upt_act: { [Op.ne]: 'D' } };
    where.user_id = userid
    return await ctx.model.Order.Address.findAndCountAll({
      distinct: true, // 不加distinct，count和实际不符
      where,
      offset: (page - 1) * limit,
      limit: parseInt(limit),
      order: [['created_at', 'desc']],
    });
  }

  async page_admin(query) {
    const { app, ctx } = this;
    const { limit, page } = query;
    const Op = app.Sequelize.Op;
    const where = { upt_act: { [Op.ne]: 'D' } };
    if (query.name) {
      where.name = { [Op.like]: `%${query.name}%` };
    }
    if (query.sex) {
      where.sex = { [Op.like]: `%${query.sex}%` };
    }
    if(query.user_id) {
      where.user_id=query.user_id
    }
    return await ctx.model.Order.Address.findAndCountAll({
      distinct: true, // 不加distinct，count和实际不符
      where,
      offset: (page - 1) * limit,
      limit: parseInt(limit),
      order: [['created_at', 'desc']],
    });
  }
  async create(body) {
    const { ctx } = this;

    const { userid } = ctx.state.user;
    body.created_id = userid;
    body.updated_id = userid;
    body.user_id = userid;
    try {
      return await ctx.model.Order.Address.create(body);
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
      return await ctx.model.Order.Address.update(body, {
        where: {
          address_id: body.address_id,
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async delete({ address_id }) {
    const { app, ctx } = this;
    const body = {
      upt_act: 'D', // 假删
      updated_at: ctx.helper.formatTime(new Date()),
      updated_id: ctx.state.user.userid,
    };
    try {
      await ctx.model.Order.Address.update(body, {
        where: { address_id },
      });
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }
}

module.exports = AddressService;
