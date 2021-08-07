'use strict';
const moment = require('moment');
// app 可以直接第一个形参可以拿到
module.exports = {

  // 时间格式化
  formatTime(date) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  },

};