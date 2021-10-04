/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-08-05 16:05:41
 * @LastEditors: Andy
 * @LastEditTime: 2021-08-11 15:00:55
 */
'use strict';
const md5 = require('md5')
const uuid4 = require('uuid4')
const Controller = require('../base');

class PrintController extends Controller {
  async AccessToken(){
    const client_id='1088797278'
    let timestamp=Date.parse(new Date())/1000;
    const id = uuid4()
    console.log(timestamp)
    const client_secret ='c5ddcaebb7d76311291be85dc10c675a'
    const sign =md5(client_id+timestamp+client_secret)
    console.log(sign)
    // `https://open-api.10ss.net/oauth/oauth?client_id=${client_id}&timestamp=${timestamp}&sign=${sign}&id=${id}&grant_type=client_credentials&scope=all`
    const url = 'https://open-api.10ss.net/oauth/oauth'
    const  AccessToken = await this.ctx.curl(url,{
      method: 'POST', // 设置请求方式 默认是GET
      dataType: 'json',
      // contentType: 'json', // 默认是 form
      data: {
        client_id,
        sign,
        timestamp,
        id,
        grant_type:'client_credentials',
        scope:'all'
      } 
    })

    return this.success(AccessToken)
  } 
  /**
   * @name: 蒋炜楗
   * @msg: 获取打印机的权限
   * @param {*}
   * @return {*}
   */  
  async PermanentAuthorization(){
    const {ctx} = this;
    const body = ctx.request.body

    ctx.validate({
      machine_code :{ type: 'string', required: true },
      msign:{ type: 'string', required: true },
      phone:{ type: 'string', required: true },
      print_name:{ type: 'string', required: true }
    }, body);
    
    const client_id='1088797278'
    const client_secret ='c5ddcaebb7d76311291be85dc10c675a'
    let timestamp=Date.parse(new Date())/1000;
    const sign =md5(client_id+timestamp+client_secret)

    const access_token = '2ee5bf5d247a4a10b5eac9cf4baa7796'

    const id = uuid4()
    const machine_code = body.machine_code
    const msign = body.msign
    const phone = body.phone
    const print_name = body.print_name

    // console.log(sign)
    // `https://open-api.10ss.net/oauth/oauth?client_id=${client_id}&timestamp=${timestamp}&sign=${sign}&id=${id}&grant_type=client_credentials&scope=all`
    const url = 'https://open-api.10ss.net/printer/addprinter'
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
        msign,
        phone,
        print_name
      } 
    })

    return this.success(msg)
  } 

  // 打印测试接口
  async print(){

    const {ctx} = this;
    const body = ctx.request.body

    // const access_token = '2ee5bf5d247a4a10b5eac9cf4baa7796'
    // const machine_code = body.machine_code
    // let content = 
    // `<center>
    //   <right>
    //     <FS3>这是测试</FS3>\r
    //     <FS5>内容</FS5>\r
    //     <FS5>2内容</FS5>\r
    //     <FS5>3内容</FS5>
    //   </right>
    // </center>`
    // const origin_id = '1'

    // const client_id='1088797278'
    // const client_secret ='c5ddcaebb7d76311291be85dc10c675a'
    // let timestamp=Date.parse(new Date())/1000;
    // const sign =md5(client_id+timestamp+client_secret)

    // const id = uuid4()

    // const url = 'https://open-api.10ss.net/print/index'
    // const  msg = await this.ctx.curl(url,{
    //   method: 'POST', // 设置请求方式 默认是GET
    //   dataType: 'json',
    //   // contentType: 'json', // 默认是 form
    //   data: {
    //     client_id,
    //     access_token,
    //     sign,
    //     timestamp,
    //     id,
    //     machine_code,
    //     origin_id,
    //     content    
    //   } 
    // })
   let data =  {
      "pdata": 
    [
        {
			"data": 
            [
                {
					"goods_id": 2,
					"name": "12312",
					"avatar_url": "",
					"price": 5,
					"number": 50
				},
				{
					"goods_id": 2,
					"name": "12312",
					"avatar_url": "",
					"price": 5,
					"number": 50
				}
			],
			"price": 56
		},
		{
			"data": 
            [
                {
				"goods_id": 2,
				"name": "12312",
				"avatar_url": "",
				"price": "5",
				"number": "50"
			    }
            ],
			"price": 50
		}
    ],
    "addressId": 1,
    "type": 0,
    "time": "2021-7-10 15:33:01",
    "price": 500
    }
    

    const msg = ctx.service.print.print.printOrder(data)
    return this.success(msg)
  }
}
module.exports = PrintController;