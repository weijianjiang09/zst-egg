/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-07-28 16:12:31
 * @LastEditors: Andy
 * @LastEditTime: 2021-08-09 10:12:31
 */
'use strict';

module.exports = {
  baseResponse: {
    success: { type: 'boolean', example: true, description: 'true代表成功' },
    message: { type: 'string', example: '请求成功' },
  },
  wxLogin: {
    success: { type: 'boolean', example: true, description: 'true代表成功' },
    result: { type: 'string', example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjM2LCJ1c2VybmFtZSI6ImFkbWluIiwibmFtZSI6Iui2hee6p-euoeeQhuWRmCIsInJvbGVzIjpbXSwiaWF0IjoxNjI4MzU1MTY4LCJleHAiOjE2Mjg5NTk5Njh9.54wTtgRZoJxC0CFCSQw6umjH-PEgzujgqYbBK1Gp0hs", description: '登录成功的返回的token' }
  },
  fileUrl: {
    url: { type: 'string', description: '图片地址' },
  },
  getPostmanInfo: {
    success: { type: 'boolean', example: true, description: 'true代表成功' },
    message: { type: 'string', example: "查询成功！" },
    result: {
      type: 'object', example: {
        "created_at": "2021-08-04 15:08:21",
        "updated_at": "2021-08-08 10:08:44",
        "upt_act": "I",
        "created_id": 20,
        "updated_id": 0,
        "id": 3,
        "user_id": 20,
        "name": "张",
        "phone_number": "1568434884",
        "sex": "0",
        "attestation": "0",
        "now": 0,
        "overtime": 0,
        "history": 3
      },
    },
  },
  resShopPage: {
    success: { type: 'boolean', example: true, description: 'true代表成功' },
    message: { type: 'string', example: '请求成功' },
    result: {
      type: 'object', example: {
        "count": 1, "rows": [
          {
            "created_at": "2021-08-02 15:15:24",
            "updated_at": "2021-08-02 15:15:24",
            "upt_act": "I",
            "created_id": 36,
            "updated_id": 36,
            "shop_id": 5,
            "name": "第一",
            "location": "二楼",
            "img_url": "sssas",
            "time": null,
            "opening": "0",
            "notice": null
          },]
      }
    }
  },
  resCommodityPage: {
    success: { type: 'boolean', example: true, description: 'true代表成功' },
    message: { type: 'string', example: '请求成功' },
    result: {
      type: 'object', example: {
        "count": 1,
        "rows": [
          {
            "created_at": "2021-08-07 13:06:07",
            "updated_at": "2021-08-07 13:06:07",
            "upt_act": "I",
            "created_id": 36,
            "updated_id": 36,
            "commodity_id": 4,
            "shop_id": 4,
            "name": "荔枝肉",
            "img_url": "sadasdasda",
            "price": 8,
            "description": null,
            "putaway": "0"
          },]
      }
    },
  },
  resPostmanPage: {
    success: { type: 'boolean', example: true, description: 'true代表成功' },
    message: { type: 'string', example: '请求成功' },
    result: {
      type: 'object', example: {
        "count": 1,
        "rows": [
          {
            "created_at": "2021-08-04 15:45:56",
            "updated_at": "2021-08-08 15:25:07",
            "upt_act": "U",
            "created_id": 20,
            "updated_id": 0,
            "id": 4,
            "user_id": 20,
            "name": "ssssss",
            "phone_number": "1568434884",
            "sex": "0",
            "attestation": "1",
            "now": 0,
            "overtime": 0,
            "history": 4
          },]
      }
    }
  },
  resAddressPage: {
    success: { type: 'boolean', example: true, description: 'true代表成功' },
    message: { type: 'string', example: '请求成功' },
    result: {
      type: 'object', example: {
        "count": 1,
        "rows": [
          {
            "created_at": "2021-08-03 15:02:46",
            "updated_at": "2021-08-03 15:02:46",
            "upt_act": "I",
            "created_id": 20,
            "updated_id": 20,
            "address_id": 4,
            "user_id": 20,
            "address": "xxxx",
            "name": "张r",
            "sex": "0",
            "phone_number": "1568434884"
          },]
      }
    }
  },
  resOrderPage: {
    success: { type: 'boolean', example: true, description: 'true代表成功' },
    message: { type: 'string', example: '请求成功' },
    result: {
      type: 'object', example: {
        "count": 1,
        "rows": [
          {
            "created_at": "2021-08-07 22:38:24",
            "updated_at": "2021-08-07 23:43:11",
            "upt_act": "U",
            "created_id": 20,
            "updated_id": 20,
            "order_id": 5,
            "user_id": 20,
            "address_id": 3,
            "shop_id": 5,
            "id": 4,
            "remark": null,
            "end_time": "2021-08-07T15:43:11.000Z",
            "overtime": 60,
            "status": "6",
            "user": {
              "user_id": 20,
              "user_name": "风中缥缈默"
            },
            "address": {
              "address_id": 3,
              "address": "xxxx",
              "phone_number": "1568434884",
              "sex": "1",
              "name": "张"
            },
            "shop": {
              "shop_id": 5,
              "name": "第一"
            },
            "postman": {
              "id": 4,
              "name": "ssssss",
              "sex": "0",
              "phone_number": "1568434884"
            },
            "order_commodities": [
              {
                "order_id": 5,
                "commodity_id": 2,
                "number": 1,
                "specification": "",
                "commodity": {
                  "commodity_id": 2,
                  "name": "das",
                  "price": 6
                }
              },
              {
                "order_id": 5,
                "commodity_id": 3,
                "number": 1,
                "specification": "特辣",
                "commodity": {
                  "commodity_id": 3,
                  "name": "鱼香肉丝",
                  "price": 7
                }
              }
            ]
          },]
      }
    }
  }
};
