const { generateWordCould } = require('../../scripts/generate_word_cloud')
const { generateWordFrequencyList } = require('../../scripts/generate_word_frequency_list')

const esClient = require('../../common/elasticsearch')

class WordCloudService {
  
  async updateWordCloud(ctx, next, cb) {
    try {
      const { wordPath, wordCloudPath } = require(`../../spiders/configs/${ctx.params.type}.config`)
      const message = await generateWordCould(wordPath, wordCloudPath)
      return { message }
    } catch (err) {
      return { code: -1, message: err.toString() }
    }
  }

  async updateWordFile(ctx, next, cb) {
    try {
      const spider = require(`../../spiders/${ctx.params.type}Spider`)
      const days = ctx.params.type === 'XueQiu' ? 90 : 1/96
			return await (new spider(days)).spide()  
    } catch (err) {
      console.log(err.toString())
    }
  }

  async fetchWordList(ctx, next, cb) {
    try {
      const data = await generateWordFrequencyList()
      const page = ctx.query.page || 1
      return data.sort((a, b) => { return b[ctx.query.sort] - a[ctx.query.sort] }).slice(page * 10 - 10, page * 10)
    } catch (err) {
      return { code: -1, message: err.toString() }
    }
  }

  async fetchKeyWordList(ctx, next, cb) {
    const page = ctx.query.page || 1
    const [size, from, query, sort] = [10, page * 10, { match: { "comments.content": ctx.query.keyword || '雪球' } }, {}]
    sort[ctx.query.sort] = 'desc'
    const data = await esClient.search({ index: 'spider', 
      body: {
        size, from, query, sort 
      } 
    })
    return data.hits.hits
  }
}

module.exports = new WordCloudService()
