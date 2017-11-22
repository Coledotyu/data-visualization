const doUntil = require('async/doUntil')
const SS = require('./SuperSpider')
const config = require('./configs/XueQiu.config')

const { httpProxyXmlGet } = require('../common/http_proxy')

class XueQiuSpider extends SS {
  constructor (days) {
    super('XueQiu', days, config.urlPath, config.wordPath, config.jsonPath)
  }
  spide () {
    return new Promise(async (resolve) => {
      try {
        let time = this.timeFromNow
        for (let i = 0; i < config.category.length; i++) {
          let item = config.category[i]
          // 为了不改变config的原始值，我们用assing做浅copy
          // 找URL，直接把URL存入txt
          await this.setupXueQiuUrls(Object.assign({}, config.commentUrl), item, time)
        }
        await this.fetchComments(config.requestLimit, config.timeout)
      } catch (error) {
        this.console('spide', error)
      } finally {
        resolve()
      }
    })
  }
  handleCommentData (content, json) {
    content = super.handleCommentData(content)
    config.commentFilterReg.forEach((reg) => { content = content.replace(reg, '') })
    return content
  }
  handleJsonData (content, json) {
    content = super.handleJsonData(content)
    let contents = content.match(config.CommentContentMatchRegExp)
    if (!contents || !contents.length) {
      return null
    }
    contents = contents.map(this.contentFilter)
    let times = []
    content.replace(config.CommentContentTimeRegExp, (match, lib) => { times.push(+lib) })
    let likes = []
    content.replace(config.CommentContentLikeRegExp, (match, lib) => {
      let numbers = match.match(/\d+/g)
      likes.push(numbers && numbers.length ? +numbers[0] : 0)
    })
    json.comments = []
    contents.forEach((content, index) => {
      json.comments.push({
        content: content,
        created_at: times.length > index ? times[index] : null,
        likes: likes.length > index ? likes[index] : 0
      })
    })

    return JSON.stringify(json)
  }

  contentFilter (content) {
    content = content.replace('<i>', '')
    content = content.replace('</i>', '')
    content = content.replace(config.CommentHTMLFilterReg, '')
    return content
  }

  async setupXueQiuUrls (page, category, time) {
    let currentPageList = null
    return new Promise((resolve) => {
      doUntil((cb) => {
        let pageUrl = this.composePageUrl(page, category)
        httpProxyXmlGet({
          url: pageUrl,
          headers: { 'Cookie': config.token },
          timeout: config.timeout
        }).then((currentPageListString) => {
          currentPageList = this.saveUrl(pageUrl, page, category, currentPageListString)
          cb()
        }).catch((error) => {
          this.console('setupXueQiuUrls', error)
          cb()
        })
      }, () => { return this.checkPageList(currentPageList, time) }, resolve)
    })
  }
  saveUrl (pageUrl, page, category, currentPageListString) {
    let currentPageList = currentPageListString ? JSON.parse(currentPageListString) : null
    console.log(currentPageList)
    if (currentPageList && currentPageList.list) {
      page.maxId = currentPageList.next_id
      this.composeCommentsJson(pageUrl, page, category, currentPageList)
      .forEach(json => this.urlWriteStream.write(`${JSON.stringify(json)}\n`))
    }
    return currentPageList
  }

  checkPageList (currentPageList, time) {
    return !currentPageList || currentPageList.next_id === -1 ||
    (currentPageList.list && currentPageList.list[0] && JSON.parse(currentPageList.list[0].data).created_at < time)
  }

  composePageUrl (page, category) {
    return `${page.pageUrl}since_id=${page.sinceId}&max_id=${page.maxId}&count=${page.count}&category=${category}`
  }

  composeCommentsJson (pageUrl, page, category, currentPageList) {
    return currentPageList.list.reduce((prev, item) => {
      let data = JSON.parse(item.data)
      let rets = this.composeCommentsUrl(page, data, 20).map((commentUrl) => {
        return {
          fromArticleUrl: `https://xueqiu.com${data.target}`,
          commentUrl: commentUrl,
          category: category,
          topic_title: data.topic_title || null,
          user_name: data.user.screen_name || null,
          view_count: data.view_count || 0,
          comment_count: data.reply_count || 0
        }
      })
      return prev.concat(rets)
    }, [])
  }

  composeCommentsUrl (page, comment, limit = 20) {
    const commentsList = []
    let pageNums = Math.ceil(comment.reply_count / limit)

    while (pageNums) {
      commentsList.push(`${page.pageCommentsUrl}id=${comment.id}&page=${pageNums--}`)
    }

    return commentsList
  }
}

module.exports = XueQiuSpider
