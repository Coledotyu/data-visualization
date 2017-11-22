const API_ROUTE = '../admin/controllers/v1/'
const Helpers = {}

module.exports = Helpers

Helpers.toFn = (api, ctx, next, cb) => {  
  try {
    const [module, method] = api.split('.')
    return require(`${API_ROUTE}${module}`)(ctx, next, cb)[method]
  } catch(err) { 
    throw err
  }
}

Helpers.mergeParams = (ctx) => {
  return Object.assign(ctx.param, ctx.query, ctx.request.body)
}

//TODO: need add next()
Helpers.response = (ctx, data = {}) => {
  ctx.body = {
    code: ~[-1, 0, 1].indexOf(data.code) ? data.code : 0,
    message: data.message || '数据获取成功',
    data: data.data || []
  }
}
