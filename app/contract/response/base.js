'use strict';

module.exports = {
  baseResponse: {
    success: { type: 'boolean', example: true, description: 'true代表成功' },
  },
  fileUrl: {
    url: { type: 'string', description: '图片地址' },
  },
};
