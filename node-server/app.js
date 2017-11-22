const Koa = require('koa')
const router = require('koa-router')()
const compress = require('koa-compress')
const session = require('koa-session')
const bodyParser = require('koa-bodyparser')
const cors = require('koa-cors')
const views = require('koa-views')
const staticServer = require("koa-static")

const Helpers = require('./common/helper')
const config = require('./config')
const authorization = require('./admin/middlewares/authorization')

 /**
 * 1 预加载数据库
 * 2 载入定时任务
 */ 
require('./models')
require('./schedules')

const app = new Koa()

app.use(async (ctx, next) => {
  if(ctx.path !== '/404') {
    return await next()
  }
  ctx.body = 'Page Not Found'
})

config.routes.forEach((route) => {
  try {
    router[route.verb.toLowerCase()](route.path, async (ctx, next) => {
      await next()
      const apiFn = Helpers.toFn(route.fn, ctx, next, Helpers.response)
      await apiFn(ctx, next, Helpers.response)
    })
  } catch(err) {
    console.error('Request Error: ', err)
  }
})

/**
* cors: 允许跨域
* config.logger.access: 开启请求日志
* session: 设置session 
* bodyParser: 参数解析 
* compress: 压缩包
* authorization: 认证中间件
* staticServer: 静态文件服务
* router: 请求路由
*/
app.use(cors())
app.use(config.logger.access())
app.use(session(app))
app.use(bodyParser())
app.use(authorization)
app.use(staticServer('./views'))
app.use(router.routes())
app.use(router.allowedMethods())
app.use(compress())

app.on('error', (err, ctx) => {
  console.error('Server Error: ', err, ctx)
})

process.on('uncaughtException', (exception) => {
  console.log(exception)
})

process.on('unhandledRejection', (reason) => {
  console.error(reason)
})

app.listen(process.env.PORT || 3001)

module.exports = app
