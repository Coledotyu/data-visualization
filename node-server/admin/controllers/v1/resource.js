const Api = require('../../../lib')
const ResourceService = require('../../services/resource')

class ResourceApi extends Api {
  
  constructor(ctx, next, cb) {
    super(ctx, next, cb)
  }

  async fetchResourceList(ctx, next, cb) {
    const data = await ResourceService.fetchResourceList(ctx, next, cb)
    cb(ctx, { data })
  }

  async createResource(ctx, next, cb) {
  	const data = await ResourceService.createResource(ctx, next, cb)
  	cb(ctx, { data })
  }

  async searchResource(ctx, next, cb) {
    const data = await ResourceService.searchResource(ctx, next, cb)
    cb(ctx, { data })
  }
}

module.exports = (ctx, next, cb) => new ResourceApi(ctx, next, cb)
