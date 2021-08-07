'use strict';
module.exports = app => {
  return async (ctx, next) => {
    console.log(111);
    // const message = ctx.args[0];
    ctx.socket.emit('connect', 'connected!');

    await next();
    // execute when disconnect.
    // console.log(ctx.socket.id);
    const user_id = await app.redis.get(`${ctx.socket.id}`);
    // console.log(user_id);
    // const data = await app.redis.get(`${user_id}`);
    // console.log(data);
    await app.redis.del(`${user_id}`);
    await app.redis.del(`${ctx.socket.id}`);
    console.log('disconnection!');
  };
};
