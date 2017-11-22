const Api = require('../../../lib')
const WordCloudService = require('../../services/word_cloud')

class WordCloudApi extends Api {
  
  constructor(ctx, next, cb) {
    super(ctx, next, cb)
  }

  async updateWordCloud(ctx, next, cb) {
    const data = await WordCloudService.updateWordCloud(ctx, next, cb)
    cb(ctx, data)
  }

  async updateWordFile(ctx, next, cb) {
    WordCloudService.updateWordFile(ctx, next, cb)
    cb(ctx, { code: 0, message: "文件生成中" })  
  }
  
  async fetchWordList(ctx, next, cb) {
    const data = await WordCloudService.fetchWordList(ctx, next, cb)
    cb(ctx, { data })
  }

  async fetchKeyWordList(ctx, next, cb) {
    const data = await WordCloudService.fetchKeyWordList(ctx, next, cb)
    cb(ctx, { data })
  }

}

module.exports = (ctx, next, cb) => new WordCloudApi(ctx, next, cb)
