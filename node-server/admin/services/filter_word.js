const { FilterWord }  = require('../../models')

class FilterWordService {
  
  async fetchWordList(ctx, next, cb) {
    const page = parseInt(ctx.query.page) || 1
    return await FilterWord.find({}).skip(page * 10 - 10).sort({ _id: -1 }).limit(10)
  }

  async createFilterWord(ctx, next, cb) {
    const wordArray = ctx.request.body.words.split(/\||;/).map((item) => { return { word: item } })
    return await FilterWord.create(wordArray)
  }

  async removeFilterWord(ctx, next, cb) {
    return await FilterWord.remove({ _id: ctx.request.body._id })
  }

  async searchOneWord(ctx, next, cb) {
    return await FilterWord.find({ word: ctx.query.word })
  }
  
}

module.exports = new FilterWordService()
