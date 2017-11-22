const CronJob = require('cron').CronJob

const XueQiuWebCrawler = require('../spiders/configs/XueQiu.config')
const GuBaWebCrawler = require('../spiders/configs/GuBa.config')

const XueQiuSpider = require('../spiders/XueQiuSpider')
const GuBaSpider = require('../spiders/GuBaSpider')

const gwc = require('../scripts/generate_word_cloud')
const { readWordJSON, jsonsToDB, deleteSpiderData } = require('../scripts/readWordJSONToDB')

/**
* 每天 01:00 抓取评论url 生成词频云图, 并同步数据到es提供搜索服务
*/
class GenerateWordCloud {
  constructor() {
    new CronJob('00 00 01 * * *', async () => {
      try {
        await this.execSpiders()
        await this.execWordCloud()
        await this.execImportComments()
      } catch (error) {
        console.log(error)
      }       
    }, null, true, 'Asia/Shanghai')
  }

  async execSpiders(xqTime = 30, gbTime = 1/100) {
    const xueQiuSpider = new XueQiuSpider(xqTime)
    const guBaSpider = new GuBaSpider(gbTime)

    await xueQiuSpider.spide()
    await guBaSpider.spide()
  }

  async execWordCloud() {
    await gwc.generateWordCould(XueQiuWebCrawler.wordPath, XueQiuWebCrawler.wordCloudPath)
    await gwc.generateWordCould(GuBaWebCrawler.wordPath, GuBaWebCrawler.wordCloudPath)
  }

  async execImportComments() {
    await deleteSpiderData('spider')
    await jsonsToDB(readWordJSON(XueQiuWebCrawler.jsonPath), 'spider', 'xueqiu')
    await jsonsToDB(readWordJSON(GuBaWebCrawler.jsonPath), 'spider', 'guba')
  }

}

module.exports = new GenerateWordCloud()
