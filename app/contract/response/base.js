/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-07-28 16:12:31
 * @LastEditors: Andy
 * @LastEditTime: 2021-08-08 10:38:42
 */
'use strict';

module.exports = {
  baseResponse: {
    success: { type: 'boolean', example: true, description: 'true代表成功' },
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
};
