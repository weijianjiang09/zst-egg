/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-08-01 16:34:13
 * @LastEditors: Andy
 * @LastEditTime: 2021-08-08 00:03:42
 */
'use strict';
const WXBizDataCrypt = require('./../../extend/WXBizDataCrypt');
const { Op } = require('sequelize');
const Service = require('egg').Service;

class UserService extends Service {
  /**
   * 校验账户状态
   * @param where 账户id
   * @return {Promise<{valid, result, message}>}
   */
  async status(where) {
    const { app, ctx } = this;
    const result = await app.model.User.User.findOne({ where });
    if (result) {
      const deleted = result.upt_act === 'D';
      if (deleted) {
        return { success: true, msg: '账号被删除' };
      }
      return { success: true, msg: '账号存在' };

    }
    return { success: false, msg: '账号不存在' };

  }


  /**
   * 微信登录接口
   * 小程序上传微信临时登录码(code),后端利用此码请求微信服务器进行验证,验证码只能使用一次
   * @param data  小程序上传的数据
   * @return {Promise<{valid, result, message}>}
   */
  async wxLogin(data) {
    console.log('微信第一次登录', data);
    const { ctx, app } = this;
    const { appid, secret, code, userInfo } = data; // 解构赋值
    // 拼接微信登录验证请求URL
    const url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code';
    console.log(url)
    try {
      // 请求微信服务器,登录验证.并获取用户加密的信息
      const decryptData = await ctx.curl(url, { dataType: 'json' });
      console.log('用户加密的信息', decryptData);

      // 验证失败,登录失败
      if (decryptData.data.errcode) {
        console.log('验证失败');
        return {
          success: false, msg: {
            msg: '登录失败,服务器错误',
            code: decryptData.data.errcode,
            errmsg: decryptData.data.errmsg,
          }
        }
      }
      // 验证成功,获取会话密钥和用户小程序唯一ID
      const { session_key, openid } = decryptData.data;
      // 声明结果对象
      const result = {};
      let sex = '未知';
      if (userInfo.gender == '1') {
        sex = '男';
      } else if (userInfo.gender == '2') {
        sex = '女';
      }
      // 生成新用户信息
      const userData = {
        user_name: userInfo.nickName,
        avatar_url: userInfo.avatarUrl,
        // phone_number: phoneNumber,
        sex,
        open_id: openid,
        upt_act: 'I',
        updated_id: 0, // 0表示用户微信操作
      };
      // 通过openid验证账户是否存在,不存在则创建新的用户信息
      const isCreate = await app.model.User.User.findOrCreate({
        where: { open_id: openid, upt_act: { [Op.not]: 'D' } },
        defaults: userData,
      });
      // 用户名同步更新
      if (isCreate[0].dataValues.user_name != userInfo.nickName) {
        await app.model.User.User.update({ user_name: userInfo.nickName }, {
          where: {
            open_id: openid, upt_act: { [Op.not]: 'D' },
          },
        });
      }
      
      // 结果对象赋值
      result.valid = true;
      // result.message = deData.message; // 微信登录验证消息
      result.session_key = session_key;
      result.isCreate = isCreate[1]; // 此次登录是否新建了账号
      // 用户信息
      result.userInfo = await app.model.User.User.findOne({
        where: { open_id: openid, upt_act: { [Op.not]: 'D' } },
        attributes: { exclude: ['upt_act', 'updated_id'] },
        include: [
          {
            model: app.model.Order.Address  ,
            required: false,
          },
        ],
      });
      // 登录令牌,有效期: 7 天
      result.token = app.jwt.sign({
        openid, // 小程序openid
        open_id: openid,
        userid: result.userInfo.user_id
      }, app.config.jwt.secret, { expiresIn: 60 * 60 * 24 * 7 });
      return { success: true, msg: result };
    } catch (e) {
      console.log('捕捉错误', e);
      return { success: false, msg: '登录失败,服务器错误' };
    }
  }

  /**
     * 用户更新数据
     * @param data  更新的数据集
     * @param where 数据库检索
     * @return {Promise<{valid: boolean, result: *, message: string}|{valid: boolean, message: string}>}
     */
  async update(data) {
    const { ctx, app } = this;
    // 修改个人信息
    const where = {upt_act: { [Op.not]: 'D' } }
    where.user_id = data.user_id
    const result = await app.model.User.User.update(data, { where });
    if (result) {
      return {success: true,msg:'修改个人信息成功'};
    }
    return {success:false, msg:'修改个人信息失败,服务器错误'};

  }

  /**
     * 微信登录接口(使用token)
     * @param data  登录数据
     * @param where 数据库索引
     * @return {Promise<{}>}
     */
  async wxLoginByToken(data, where) {
    console.log('微信登录', data, 'where', where);

    const result = {}; // 声明结果集
    // 查找用户
    const userInfo = await this.app.model.User.User.findOne({
      where: { user_id: where.user_id, upt_act: { [Op.not]: 'D' } },
      attributes: { exclude: ['upt_act', 'updated_id'] },
      include: [
        {
          model: db.club_counselor,
        },
      ],
    });


    if (userInfo) {
      return this.initResult(true, '登录成功', userInfo);
    }
    return this.initResult(false, '登录失败,账号未注册', userInfo);

  }
}

module.exports = UserService;
