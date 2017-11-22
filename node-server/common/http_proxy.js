const request = require('request')
const config = require('../config/')
/**
 * 统一 resolve 处理 以code处理结果
 */
module.exports.httpProxy = (proxyUrl, action, params) => {
  return new Promise((resolve, reject) => {
    request.post({
      url: proxyUrl,
      form: params
    }, (err, res, body) => {
      if (err) return resolve({ code: -1, message: '请求失败' })
      try {
        resolve({ data: JSON.parse(body.trim()) })
      } catch(err) {
        resolve({ code: -1, message: '解析失败' })
      }
    }) 
  })  
}

module.exports.httpProxyXmlGet = (options) => {
  return new Promise((resolve, reject) => {
    request.get(options, (err, res, body) => {
      return resolve(body || '')
    }).destroy() 
  }) 
}
