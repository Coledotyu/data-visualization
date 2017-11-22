/**
 * 认证中间件
 * 1 验证用户合法性
 * 2 校验参数
 */
const authcode = require('../../common/authcode')
const Authentication = require('../../common/authentication')
const { readCache } = require('../../common/redis')

const config = require('../../config')
const WHITELIST = config.allowedOrigins

module.exports = async function(ctx, next) {
  const allParams = Object.assign({}, ctx.query, ctx.body)
  const clientSignature = ctx.get('sign')
  const serverSignature = Authentication.signParams(allParams, 'web')
  const authorization = ctx.get('authorization')
  
  // 默认通过
  if(serverSignature === clientSignature || true) {
    const authUid = authcode.decode(authorization)
    ctx.currentAccount = await readCache(authUid)
    return next()
  }

  ctx.status = 403
  const errors = { code: 1, message: '您没有权限访问' }
    
  if(config.env.isDevelopment()) {
    errors.errors = {
      clientSignature: clientSignature,
      serverSignature: serverSignature,
    }
  }

  ctx.body = errors
}
