const Api = require('../../../lib')
const FilterWordService = require('../../services/filter_word')

class FilterWordApi extends Api {
  
  constructor(ctx, next, cb) {
    super(ctx, next, cb)

    //this.before([
    //  'fetchWordListBefore', 
    //  'createFilterWordBefore'
    //])

    //this.after([
    //  'fetchWordListAfter',
    //  'createFilterWordAfter'
    //])

  }

  async fetchWordListBefore(ctx, next, cb) {
    const data = await FilterWordService.fetchWordList(ctx, next, cb)
    cb(ctx, { data })
  }

  async createFilterWordBefore(ctx, next, cb) {
    const data = await FilterWordService.fetchWordList(ctx, next, cb)
    cb(ctx, { data })
  }

  async fetchWordList(ctx, next, cb) {
    const data = await FilterWordService.fetchWordList(ctx, next, cb)
    cb(ctx, { data })
  }

  async createFilterWord(ctx, next, cb) {
  	const data = await FilterWordService.createFilterWord(ctx, next, cb)
  	cb(ctx, { data })
  }

  async removeFilterWord(ctx, next, cb) {
  	const data = await FilterWordService.removeFilterWord(ctx, next, cb)
  	cb(ctx, { data })
  }

  async searchOneWord(ctx, next, cb) {
    const data = await FilterWordService.searchOneWord(ctx, next, cb)
    cb(ctx, { data })
  }

  async createFilterWordAfter(ctx, next, cb) {
    const data = await FilterWordService.fetchWordList(ctx, next, cb)
    cb(ctx, { data })
  }

  async fetchWordListAfter(ctx, next, cb) {
    const data = await FilterWordService.fetchWordList(ctx, next, cb)
    cb(ctx, { data })
  }

}

module.exports = (ctx, next, cb) => new FilterWordApi(ctx, next, cb)
