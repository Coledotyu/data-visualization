const config = require('../config').database.redis
const redis = require('redis')
const redisClient = redis.createClient(config.port, config.host, config.options)

module.exports = redisClient

/**
 * 写入缓存 用 JSON.stringify 转换后写入缓存
 * @param {String} key 缓存使用的 cacheKey
 * @param {Object} value 需要被缓存的值
 **/
module.exports.writeCache = function(key, value) {
  if(!value && !value.length) return
  redisClient.set(key, JSON.stringify(value), function(err) {
    if(err) console.log(err)
  })
}		
/**
 * 读取缓存, 并用 JSON.parse 转换
 * @param {String} key
 **/
module.exports.readCache = function(key) {
  return new Promise(function(resolve, reject) {
    redisClient.get(key, function(err, value) {
      if (err) return reject(err)
      try {
        value = value && JSON.parse(value)
      } catch(error) {
        value = null
        return reject(error)
      }
      resolve(value)
    })
  })
}
 /**
 * 读取缓存 HASH, 返回Obj
 * @param {String} key 
 **/

module.exports.readHashCache = function(key) {
  return new Promise(function(resolve, reject) {
    redisClient.hgetall(key, function(err, obj) {
      if (err) return reject(err)
      resolve(obj)
    })
  })
}
 /**
 * 写入缓存 HASH, 返回Obj
 * @param {String} key 
 * @param {Object} value
 **/
module.exports.writeHashCache = function(key, obj) {
  redisClient.hmset(key, obj,function(err, res) {
    if(err)console.log(err)
  })
}
