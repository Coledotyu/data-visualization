const { Resource }  = require('../../models')

class ResourceService {
  
  async fetchResourceList(ctx, next, cb) {
    const page = parseInt(ctx.query.page) || 1
    return await Resource.find({}).skip(page * 10 - 10).sort({ _id: -1 }).limit(10)
  }

  async createResource(ctx, next, cb) {
    const { url, fileType, name, size } = ctx.request.body
    return await Resource.create({ url, fileType, name, size })
  }
  
  async searchResource(ctx, next, cb) {
    return await FilterWord.find({ _id: ctx.query._id })
  }
  
}

module.exports = new ResourceService()
