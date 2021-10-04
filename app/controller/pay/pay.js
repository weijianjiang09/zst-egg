/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-08-12 18:54:55
 * @LastEditors: Andy
 * @LastEditTime: 2021-10-01 18:49:15
 */
const Controller = require('../base');
/**
 * @Controller pay
 */
class PayController extends Controller {
   /**
   * @router post /punctuality/api/pay/pay
   * @summary 支付接口
   * @Description 用户支付
   * @request body CreatePaymentInfo
   * @response 200 baseResponse
   */
  async CreatePaymentInfo() {
    const { app, ctx } = this
    ctx.validate({
      code: { type: 'string', required: true },
      money: { type: 'number', required: true },
    }, ctx.request.body);
    let appid = 'wx5ae968f3adc48899';
    let secret = 'd37c6f877610f4732af3755e054b5b21';
    const { code,money } = ctx.request.body
    const urls = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code';
    // const decryptData = await this.ctx.curl(, { dataType: 'json' });
    const decryptData = await ctx.curl(urls, { dataType: 'json' });
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
    console.log(openid);
    return this.success(await this.service.payment.payment.CreatePaymentInfo(money, openid))
  }
   /**
   * @router post /punctuality/api/pay/refund
   * @summary 退款接口
   * @Description 后台确认退款
   * @request body refundPayment
   * @response 200 baseResponse
   */
  async refund() {
    const { app, ctx } = this
    const body = ctx.request.body

    ctx.validate({
      out_trade_no: { type: 'string', required: true },
      refund_desc: { type: 'string', required: true },
      refund_fee: { type: 'number', required: true },
      PayPrice: { type: 'number', required: true },
    }, body);
    const { out_trade_no, refund_fee, refund_desc, PayPrice } = ctx.request.body
    return this.success(await this.service.payment.payment.refund(out_trade_no, refund_fee, refund_desc, PayPrice))
  }
}

module.exports = PayController;