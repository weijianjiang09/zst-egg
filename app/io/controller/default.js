'use strict';
const Controller = require('egg').Controller;
const moment = require('moment');
class DefaultController extends Controller {
  async index() {
    const { ctx, app } = this;
    const message = ctx.args[0];
    const nsp = app.io.of('/');
    const time = moment().format('YYYY-MM-DD HH:mm:ss');
    // console.log(message);
    // console.log(ctx.socket.id);
    const socketID = await app.redis.get(`${message.to}`);
    console.log('************');
    // console.log('from', ctx.socket.id);
    // console.log('************');
    // console.log('to', socketID);
    console.log(nsp.sockets);
    console.log('***************');
    console.log(message);
    await ctx.model.ChatContent.ChatContent.create(message);
    let userid = 0;
    if (message.from !== 0) {
      userid = message.from;
    } else if (message.to !== 0) {
      userid = message.to;
    }

    if (userid !== 0) {
      await ctx.model.Goods.User.update({
        sendtime: time,
      }, { where: { id: userid } });
    }
    if (socketID !== null) {
      // console.log(123);
      await nsp.sockets[socketID].emit('res', message);
    }
    // console.log(socketID);

    // await ctx.socket.emit('res', { name: 'robot', msg: message.msg });
  }
  async login() {
    const { ctx, app } = this;
    const message = ctx.args[0];
    console.log(ctx.socket.id);
    await app.redis.set(`${message.user_id}`, ctx.socket.id);
    await app.redis.set(`${ctx.socket.id}`, message.user_id);
    console.log('login成功');
  }
  async Pending() {
    const { ctx, app } = this;
    const message = ctx.args[0];
    const { Op } = app.Sequelize;
    const nsp = app.io.of('/');
    // console.log(message);
    // console.log(ctx.socket.id);
    const socketID = await app.redis.get(`${-1}`);
    const pending = await ctx.model.Order.Pending.create(message);
    message.id = pending.id;
    if (message.type === 0 && message.number === 2) {
      const remind1 = await ctx.model.Order.Pending.findAll({
        where: {
          order_id: message.order_id,
          type: 0,
          number: 1,
          upt_act: { [Op.ne]: 'D' },
        },
      });
      if (remind1.length !== 0) {
        await ctx.model.Order.Pending.update({ upt_act: 'D' }, { where: { id: remind1[0].id } });
        await nsp.sockets[socketID].emit('reset');
      } else if (socketID !== null) {
        await nsp.sockets[socketID].emit('res', message);
      }
    } else if (socketID !== null) {
      await nsp.sockets[socketID].emit('res', message);
    }
    
  }
  async updateOrder(){
    const { ctx, app } = this;
    const message = ctx.args[0];
    const { Op } = app.Sequelize;
    const nsp = app.io.of('/');
    console.log(message,nsp)
  }
}

module.exports = DefaultController;
