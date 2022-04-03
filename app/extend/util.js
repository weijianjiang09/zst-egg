/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-08-11 19:19:00
 * @LastEditors: Andy
 * @LastEditTime: 2021-10-17 18:48:52
 */
'use strict';
const crypto = require('crypto');
const fs = require('fs')
const path = require('path')
module.exports = {

  randomString(len) {
    // isFinite 判断是否为有限数值
    if (!Number.isFinite(len)) {
      throw new TypeError('Expected a finite number');
    }
    return crypto.randomBytes(Math.ceil(len / 2)).toString('hex').slice(0, len);
  },
  keepTwoDecimal(num) {
    var result = parseFloat(num);
    if (isNaN(result)) {
      return false;
    }
    result = Math.round(num * 100) / 100;
    return result;
   },
   //四舍五入保留2位小数（不够位数，则用0替补）
  keepTwoDecimalFull(num) {
    var result = parseFloat(num);
    if (isNaN(result)) {
    alert('传递参数错误，请检查！');
    return false;
    }
    result = Math.round(num * 100) / 100;
    var s_x = result.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
    pos_decimal = s_x.length;
    s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
    s_x += '0';
    }
    return s_x;
  }




}