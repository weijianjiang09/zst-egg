'use strict';

const fs = require('fs');
const path = require('path');
// 故名思意 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
// 管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');
const moment = require('moment');

const Controller = require('../base');
/**
 * @Controller file
 */
class FileController extends Controller {
  /**
    * 1: 抄表导入模板.xlsx
    */
  async downloadTemp() {
    const { app, ctx } = this;
    const { port, hostname } = app.config.cluster.listen;

    switch (ctx.params.type) {
      case '1':
        ctx.body = `${hostname}:${port}/public/excel/抄表导入模板.xlsx`;
        break;
      default:
        ctx.body = '';
    }
  }
  /**
   * @Description 图片上传(form表单上传图片)
   * @Router POST /api/file
   * @Response 200 fileUrl ok
   */
  async upload() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();

    // 基础的目录
    const uplaodBasePath = 'app/public/uploads';
    // 生成文件名
    const filename = `${Date.now()}${Number.parseInt(
      Math.random() * 1000
    )}${path.extname(stream.filename).toLocaleLowerCase()}`;
    // 生成文件夹
    const dirname = moment(Date.now()).format('YYYY/MM/DD');
    function mkdirsSync(dirname) {
      if (fs.existsSync(dirname)) {
        return true;
      }
      if (mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
      }

    }
    mkdirsSync(path.join(uplaodBasePath, dirname));
    // 生成写入路径
    const target = path.join(uplaodBasePath, dirname, filename);
    // 写入流
    const writeStream = fs.createWriteStream(target);
    try {
    // 异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
    // 如果出现错误，关闭管道
      await sendToWormhole(stream);
      this.error();
    }
    console.log(dirname, filename);
    const { port, hostname } = this.app.config.cluster.listen;
    const respath = [ 'http://', hostname, ':', port, '/public/uploads/', dirname, '/', filename ].join('');
    ctx.body = { url: respath };
  }
}

module.exports = FileController;
