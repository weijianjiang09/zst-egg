/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-08-07 10:51:35
 * @LastEditors: Andy
 * @LastEditTime: 2021-10-03 23:47:32
 */
'use strict';
const Service = require('egg').Service;
const moment = require('moment')

class OrderService extends Service {

  async page(query) {
    // 0未接单 1已接单 2未取货 3派送中 4已送达 5退单 6超时 7已处理超时
    const { app, ctx } = this;
    const { limit, page } = query;
    const Op = app.Sequelize.Op;
    const where = {
      upt_act: { [Op.ne]: 'D' },
      status: { [Op.or]: ['4', '5', '6', '7'], },
    };

    // 这里优先级高于上面的
    // if (query.user_name) {
    //   where.name = { [Op.like]: `%${query.name}%` };
    // }
    // 骑手
    if (query.postman_name) {
      let res = await ctx.model.User.Postman.findOne({
        where:{name : query.postman_name},
        raw: true
      })
      where.id = res.id
    }
    // 用户
    if (query.user_name) {
      let res = await ctx.model.User.User.findOne({
        where:{name : query.user_name},
        raw: true
      })
      where.user_id = res.user_id;
    }
    // 店铺
    if (query.shop_name) {
      let res = await ctx.model.Shop.Shop.findOne({
        where:{name : query.shop_name},
        raw: true
      })
      // console.log(res)
      where.shop_id = res.shop_id;
    }
    // 单号
    if (query.order_id) {
      where.order_id =  { [Op.like]: `%${query.order_id}%`};
    }
    // 状态
    if (query.status) {
      where.status = query.status;
    }
    return await ctx.model.Order.Order.findAndCountAll({
      distinct: true, // 不加distinct，count和实际不符
      include:
        [
          {
            model: ctx.model.User.User,
            required: false,//加上此参数,指定为外连接,能保证空数据时不过滤父元素f
            attributes: ['user_id', 'user_name'],
          },
          {
            model: ctx.model.Order.Address,
            required: true,//加上此参数,指定为外连接,能保证空数据时不过滤父元素
            attributes: ['address_id', 'address', 'phone_number', 'sex', 'name'],
          },
          {
            model: ctx.model.Shop.Shop,
            attributes: ['shop_id', 'name',"img_url"],
            required: true,
          },
          {
            model: ctx.model.User.Postman,
            required: false,
            attributes: ['id', 'name', 'sex', 'phone_number',],
          },
          {
            model: ctx.model.Order.OrderCommodity,
            required: true,
            include: {
              model: ctx.model.Shop.Commodity,
              required: false,
              attributes: ['commodity_id', 'name', 'price','img_url'],
            }
          },
        ],
      where,
      offset: (page - 1) * limit,
      limit: parseInt(limit),
      order: [['created_at', 'desc']],
    });
  }

  async page_now(query) {
    const { app, ctx } = this;
    const { limit, page } = query;
    const Op = app.Sequelize.Op;
    const where = {
      upt_act: { [Op.ne]: 'D' },
      status: { [Op.or]: ['0', '1', '2', '3'], }
    };
    if (query.username) {
      where.name = { [Op.like]: `%${query.name}%` };
    }
    // 骑手
    if (query.postman_name) {
      let res = await ctx.model.User.Postman.findOne({
        where:{name : query.postman_name},
        raw: true
      })
      where.id = res.id
    }
    // 用户
    if (query.user_name) {
      let res = await ctx.model.User.User.findOne({
        where:{name : query.user_name},
        raw: true
      })
      where.user_id = res.user_id;
    }
    // 店铺
    if (query.shop_name) {
      let res = await ctx.model.Shop.Shop.findOne({
        where:{name : query.shop_name},
        raw: true
      })
      // console.log(res)
      where.shop_id = res.shop_id;
    }
    // 单号
    if (query.order_id) {
      where.order_id = query.order_id;
    }
    // 状态
    if (query.status) {
      where.status = query.status;
    }
    return await ctx.model.Order.Order.findAndCountAll({
      distinct: true, // 不加distinct，count和实际不符
      include:
        [
          {
            model: ctx.model.User.User,
            required: false,//加上此参数,指定为外连接,能保证空数据时不过滤父元素f
            attributes: ['user_id', 'user_name'],
          },
          {
            model: ctx.model.Order.Address,
            required: true,//加上此参数,指定为外连接,能保证空数据时不过滤父元素
            attributes: ['address_id', 'address', 'phone_number', 'sex', 'name'],
          },
          {
            model: ctx.model.Shop.Shop,
            attributes: ['shop_id', 'name',"img_url"],
            required: true,
          },
          {
            model: ctx.model.User.Postman,
            required: false,
            attributes: ['id', 'name', 'sex', 'phone_number',],
          },
          {
            model: ctx.model.Order.OrderCommodity,
            required: true,
            include: {
              model: ctx.model.Shop.Commodity,
              required: false,
              attributes: ['commodity_id', 'name', 'price','img_url'],
            }
          },
        ],
      where,
      offset: (page - 1) * limit,
      limit: parseInt(limit),
      order: [['created_at', 'desc']],
    });
  }
  async page_user(query) {
    const { app, ctx } = this;
    const { limit, page } = query;
    const Op = app.Sequelize.Op;
    const { userid } = ctx.state.user;
    const where = {
      user_id:userid,
      upt_act: { [Op.ne]: 'D' },
    };
  
    // 状态
    
    if (query.status) {
      where.status = query.status;
    }
    return await ctx.model.Order.Order.findAndCountAll({
      distinct: true, // 不加distinct，count和实际不符
      include:
        [
          {
            model: ctx.model.User.User,
            required: false,//加上此参数,指定为外连接,能保证空数据时不过滤父元素f
            attributes: ['user_id', 'user_name'],
          },
          {
            model: ctx.model.Order.Address,
            required: true,//加上此参数,指定为外连接,能保证空数据时不过滤父元素
            attributes: ['address_id', 'address', 'phone_number', 'sex', 'name'],
          },
          {
            model: ctx.model.Shop.Shop,
            attributes: ['shop_id', 'name',"img_url"],
            required: true,
          },
          {
            model: ctx.model.User.Postman,
            required: false,
            attributes: ['id', 'name', 'sex', 'phone_number',],
          },
          {
            model: ctx.model.Order.OrderCommodity,
            required: true,
            include: {
              model: ctx.model.Shop.Commodity,
              required: false,
              attributes: ['commodity_id', 'name', 'price','img_url'],
            }
          },
        ],
      where,
      offset: (page - 1) * limit,
      limit: parseInt(limit),
      order: [['created_at', 'desc']],
    });
  }
  async create(body) {
    const { app, ctx } = this;

    const { userid } = ctx.state.user;
    body.user_id = userid;
    body.created_id = userid;
    body.updated_id = userid;
    let No = Date.now();

    let OrderNo = moment().format('YYYYMMDDHHmmss') + ctx.helper.randomString(3) + No;
    body.order_id = OrderNo
   // 0未接单 1已接单 2未取货 3派送中 4已送达 5退单 6超时 7已处理超时
    body.status = "0"
    body.upt_act = "I"
    try {
      // 是否本店菜品交给前端限制
      return await ctx.model.transaction(async t => {
        // 创建用户信息
        const createOrder = await ctx.model.Order.Order.create(body, { transaction: t });
        // console.log(createOrder)
        const OrderCommodityArr = body.commodity.map(item => {
          return {
            order_id: createOrder.order_id,
            commodity_id: item.commodity_id,
            number: item.number,
            specification: item.specification,
            price:item.price
          };
        });
        // 创建订单与菜品
        const res = await ctx.model.Order.OrderCommodity.bulkCreate(OrderCommodityArr, { transaction: t });

        return { success: res.length > 0 };
      });
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }

  async update_status(body) {
    const { ctx } = this;

    const { userid } = ctx.state.user;
    body.updated_at = ctx.helper.formatTime(new Date());
    body.updated_id = userid;
    body.upt_act = 'U';
    try {

      // 更新用户信息
      await ctx.model.Order.Order.update(body, {
        where: {
          order_id: body.order_id,
        },
      });
      // 0未接单 1已接单 2未取货 3派送中 4已送达 5退单 6超时 7已赔付
      if (body.status == '1') {
        return { success: true, msg: "成功接单" };
      } else if (body.status == '5') {
        return { success: true, msg: "成功退单" };
      }else if (body.status == '7') {
        return { success: true, msg: "处理成功" };
      }else {
        return { success: true, msg: "." };
      }

    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }

  async update_postman(body) {
    const { ctx } = this;

    const { userid } = ctx.state.user;
    body.updated_at = ctx.helper.formatTime(new Date());
    body.end_time = ctx.helper.formatTime(new Date());
    body.updated_id = userid;
    body.upt_act = 'U';
    try {
   
        const res = await ctx.model.Order.Order.findOne({
          where: { order_id: body.order_id },
          raw: true
        })
        const postman = await ctx.model.User.Postman.findOne({
          where: { id: res.id },
          raw: true
        })
        console.log(postman)
        let after = new Date(res.created_at).getTime()
        let now = new Date().getTime()
        // 超时逻辑
        // console.log(after,now,now-after,res.overtime*60*1000)
        if (now - after > res.overtime * 60 * 1000) {
          ctx.model.transaction(async t => {
            body.status = '6'
            await ctx.model.Order.Order.update(body, {
              where: {
                order_id: body.order_id,
              },
              transaction: t 
            });
            await ctx.model.User.Postman.update({overtime:postman.overtime+1,now:postman.now+1}, {
              where: {
                id: postman.id,
              },
              transaction: t 
            });
          })
          return { success: true, msg: "你的单本单超时" };
        } else {
          body.status = '4'
          ctx.model.transaction(async t => {
            await ctx.model.Order.Order.update(body, {
              where: {
                order_id: body.order_id,
              },
              transaction: t 
            });
            await ctx.model.User.Postman.update({now:postman.now+1,history:postman.history+1}, {
              where: {
                id: postman.id,
              },
              transaction: t 
            });
          });
          return { success: true, msg: "正常送达" };
        }
     
      
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }
 // 0未接单 1已接单 2未取货 3派送中 4已送达 5退单 6超时 7已处理超时
  async refundOrder(body){
    const { ctx } = this;

    const { userid } = ctx.state.user;
    body.updated_at = ctx.helper.formatTime(new Date());
    body.updated_id = userid;
    body.upt_act = 'U';
    try {
        body.status = '6';
        await ctx.model.Order.Order.update(body, {
          where: {
            order_id: body.order_id,
            cause:body.cause
          },
        });
        return { success: true, msg: "申请成功" };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }
  async update_grab(body) {
    const { ctx } = this;

    const { userid } = ctx.state.user;
    body.updated_at = ctx.helper.formatTime(new Date());
    body.updated_id = userid;
    body.upt_act = 'U';
    try {
      const res = await ctx.model.Order.Order.findOne({
        where: { order_id: body.order_id },
        raw: true
      })
      console.log(res.id)
      if (res.id) {
        return { success: false };
      } else {
        body.status = '2';
        console.log(body)
        await ctx.model.Order.Order.update(body, {
          where: {
            order_id: body.order_id,
          },
        });
        return { success: true, msg: "抢单成功" };
      }
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }

  async update_reception(body){
    const { ctx } = this;
    const { userid } = ctx.state.user;
    body.updated_at = ctx.helper.formatTime(new Date());
    body.updated_id = userid;
    body.upt_act = 'U';
    try {
        body.status = '3';
        console.log(body)
        await ctx.model.Order.Order.update(body, {
          where: {
            order_id: body.order_id,
          },
        });
        return { success: true, msg: "派送中" };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }

  async delete({ order_id }) {
    const { ctx } = this;
    const body = {
      upt_act: 'D',
      updated_at: ctx.helper.formatTime(new Date()),
      updated_id: ctx.state.user.userid,
    };
    // 更新用户信息
    try {
      const msg = await ctx.model.Order.Order.update(body, {
        where: { order_id },
      });
      return msg
    } catch (error) {
      console.log(error);
      return null;
    }
  }

}

module.exports = OrderService;
