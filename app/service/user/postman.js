/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-08-04 14:09:42
 * @LastEditors: Andy
 * @LastEditTime: 2021-08-07 10:34:13
 */
'use strict';
const Service = require('egg').Service;
const { Op } = require('sequelize');
class PostmanService extends Service {

  async page(query) {
    const { app, ctx } = this;
    const { limit, page } = query;
    const Op = app.Sequelize.Op;
    const where = { upt_act: { [Op.ne]: 'D' } };
    if (query.postman_id) {
      where.postman_id = query.postman_id;
    }
    if (query.name) {
      where.name = { [Op.like]: `%${query.name}%` };
    }
    if (query.sex) {
      where.sex = query.sex;
    }
    return await ctx.model.User.Postman.findAndCountAll({
      distinct: true, // 不加distinct，count和实际不符
      where,
      offset: (page - 1) * limit,
      limit: parseInt(limit),
      order: [[ 'created_at', 'desc' ]],
    });
  }

  async getPostmanInfo() {
    const { app, ctx } = this;
    const { userid } = ctx.state.user;
    const Op = app.Sequelize.Op;
    const where = { upt_act: { [Op.ne]: 'D' } };
    where.user_id = userid
    return await ctx.model.User.Postman.findOne({
      where,
    });
  }

  async create(body) {
    const { app, ctx } = this;
    const { userid } = ctx.state.user;
    body.created_id = userid;
    body.updated_id = userid;
    body.user_id =  userid;
    body.upt_act = "I"
    body.attestation = '0'
    try {
      const isCreate = await app.model.User.User.findOne({
        where: { user_id: userid, upt_act: { [Op.not]: 'D' } },
      });

      if(isCreate){
        const create = await app.model.User.Postman.findOne({
          where: { user_id: userid, upt_act: { [Op.not]: 'D' } },
        });
        if(create){
          return {msg:"你正在申请，或者已经是",success:false}
        }else{
          return await app.model.User.Postman.create(body);
        }
        
      }else{
        return {msg:"没有这个用户不存在，无法注册成为骑手",success:false}
      }
      // console.log(isCreate)
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }

  async update_msg(body) {
    const { ctx } = this;
    const { userid } = ctx.state.user;
    body.updated_at = ctx.helper.formatTime(new Date());
    body.updated_id = userid;
    body.upt_act = 'U';
    try {
      const msg = await ctx.model.User.Postman.update(body, {
        where: {postman_id:body.postman_id },
      });
      return {success:true , msg:msg}
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }

  async updateAttestation(body) {
    const { ctx } = this;
    const { userid } = ctx.state.user;
    body.updated_at = ctx.helper.formatTime(new Date());
    body.updated_id = userid;
    body.upt_act = 'U';
    try {
      const msg = await ctx.model.User.Postman.update(body, {
        where: {postman_id:body.postman_id },
      });
      return {success:true ,}
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }

  async delete({ postman_id }) {
    const { ctx } = this;
    const body = {
      upt_act: 'D',
      updated_at: ctx.helper.formatTime(new Date()),
      updated_id: ctx.state.user.userid,
    };
    // 更新用户信息
    try {
      return await ctx.model.User.Postman.update(body, {
        where: { postman_id },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  /**
   * @param {*} role_code 角色代码
   * @param {*} name 用户姓名
   */
  async getUsersByRole(role_code, name) {
    const { app, ctx } = this;

    const Op = app.Sequelize.Op;
    const where = { upt_act: { [Op.ne]: 'D' } };
    if (name) {
      where.name = { [Op.like]: `%${name}%` };
    }

    try {
      const users = await ctx.model.Sys.User.findAll({
        attributes: [ 'id', 'name' ],
        include: {
          model: ctx.model.Sys.Role,
          where: { code: role_code },
        },
        where,
      });
      return users;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // async accomplish(body){
  //   const { app, ctx } = this;

  //   const Op = app.Sequelize.Op;
  //   const where = { upt_act: { [Op.ne]: 'D' } };
  //   where.postman_id = body.postman_id
  //   try {
  //     const msg = await ctx.model.Sys.User.update(body.now,{
  //       where
  //     });
  //     return msg;
  //   } catch (error) {
  //     console.log(error);
  //     return null;
  //   }
  // }
}

module.exports = PostmanService;
