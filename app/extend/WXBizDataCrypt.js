/*
 * @Descripttion: 
 * @version: 
 * @Author: 蒋炜楗
 * @Date: 2021-07-28 16:09:50
 * @LastEditors: Andy
 * @LastEditTime: 2021-08-02 15:46:35
 */
var crypto = require('crypto')

function WXBizDataCrypt(appId, sessionKey) {
    this.appId = appId
    this.sessionKey = sessionKey
}

WXBizDataCrypt.prototype.decryptData = function (encryptedData, iv) {
    // base64 decode
    var sessionKey = new Buffer.from(this.sessionKey, 'base64')
    encryptedData = new Buffer.from(encryptedData, 'base64')
    iv = new Buffer.from(iv, 'base64')

    try {
        // 解密
        var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
        // 设置自动 padding 为 true，删除填充补位
        decipher.setAutoPadding(true)
        var decoded = decipher.update(encryptedData, 'binary', 'utf8')
        // var decoded = decipher.update(encryptedData, '', 'utf8')
        decoded += decipher.final('utf8')

        decoded = JSON.parse(decoded)

    } catch (err) {
        throw new Error('Illegal Buffer:' + err)
    }

    if (decoded.watermark.appid !== this.appId) {
        throw new Error('Illegal Buffer :  appid错误')
    }

    return decoded
}

module.exports = WXBizDataCrypt
