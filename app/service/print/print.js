/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-08-06 16:05:46
 * @LastEditors: Andy
 * @LastEditTime: 2021-08-11 10:52:01
 */
'use strict';
const Service = require('egg').Service;
const md5 = require('md5')
const uuid4 = require('uuid4')
const moment = require('moment');
class PrintService extends Service { 
  
  async printOrder(data){
    const {ctx,app} = this;
    const body = ctx.request.body
  
    const date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    const access_token = '2ee5bf5d247a4a10b5eac9cf4baa7796'
    const machine_code = '4004685603'
    let shopping = ''
    console.log(data);
    let i =1
    data.pdata.forEach(element => {
      
      let str = `<FH>口袋${i}</FH>\\r<FH>菜品名 单价 数量 小计</FH>\\r`
      element.data.forEach(element => {
        str+=`<FH>${element.name} ${element.price} ${element.number} ${element.price*element.number}</FH>\\r`
      });
      str+=`<FH>小计:${element.price}</FH>\\r` 
      shopping +=str
      i++;
    });
    let content = `
    <FH2><FB><center>卤制深</center></FB></FH2>\\r
    ${date}\\r
    *********************************
    ${shopping}
    *********************************
    `
    console.log(content);
    
    const origin_id = '1'

    const client_id='1088797278'
    const client_secret ='c5ddcaebb7d76311291be85dc10c675a'
    let timestamp=Date.parse(new Date())/1000;
    const sign =md5(client_id+timestamp+client_secret)

    const id = uuid4()

    const url = 'https://open-api.10ss.net/print/index'
    const  msg = await this.ctx.curl(url,{
      method: 'POST', // 设置请求方式 默认是GET
      dataType: 'json',
      // contentType: 'json', // 默认是 form
      data: {
        client_id,
        access_token,
        sign,
        timestamp,
        id,
        machine_code,
        origin_id,
        content    
      } 
    })

    return msg
  }
}
module.exports = PrintService;
