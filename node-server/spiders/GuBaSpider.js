const parallelLimit = require('async/parallelLimit')
const doUntil = require('async/doUntil')
const moment = require('moment')

const SS = require('./SuperSpider')
const config = require('./configs/GuBa.config')
const { httpProxyXmlGet } = require('../common/http_proxy')

const {
  ArticleRegExp
  ,ArticlePageDateRegExp
  ,ArticleViewCountRegExp
  ,ArticleCommentCountRegExp
  ,ArticleAuthRegExp
  ,ArticleTitleRegExp
  ,ArticlePageUrlRegExp
  ,CommentMatchRegExp
  ,CommentTimeRegExp
  ,CommentContentRegExp
  ,CommentFilterRegExp
  ,CommentLikeRegExp 
} = config.regs

const PageDateFormat = 'MM-DD HH:mm'
const CommentDateFormat = 'YYYY-MM-DD HH:mm:ss'

class GuBaSpider extends SS {
  constructor (articledays, commentDays = 90, articleUrlCountLimit = 5000) {
    super('GuBa', articledays, config.urlPath, config.wordPath, config.jsonPath)
    this.commentTimeFromNow = new Date().getTime() - commentDays * 24 * 3600 * 1000
    this.articleUrlCountLimit = articleUrlCountLimit
    this.articleCommentUrlCount = 0
  }
  spide () {
    return new Promise(async (resolve) => {
      await this.setupCommentUrls(this.timeFromNow)
      await this.fetchComments(config.requestLimit, config.timeout)
      resolve()
    })
  }
  handlePretreatment (content) {
    let matches = this.matchComments(content)
    let comments = matches.map((comment) => {
      if (!comment) {
        return null
      }
      return {
        content: this.matchCommentContent(comment),
        created_at: this.matchCommentTime(comment),
        likes: this.matchCommentLike(comment)
      }
    }).filter((item) => item !== null && item.created_at > this.commentTimeFromNow && item.content && item.content.length > 1)
    return comments
  }

  handleCommentData (content) {
    content = super.handleCommentData(content)
    return this.handlePretreatment(content).reduce((prev, item) => {
      prev += `${item.content}\n`
      return prev
    }, '')
  }
  handleJsonData (content, json) {
    content = super.handleJsonData(content)
    let comments = this.handlePretreatment(content)
    if (!comments || !comments.length) {
      return null
    }
    json.comments = comments

    return JSON.stringify(json)
  }
  async setupCommentUrls (time) {
    return new Promise((resolve) => {
      let stopFlag = {stop: false}
      let mainIndex = config.mainArticleUrlIndex
      let mainLimit = config.mainArticleUrlLimit
      doUntil((callback) => {
        let tasks = []
        let i = mainIndex
        for (; i <= mainIndex + mainLimit; i++) {
          tasks.push(this.setupCommentUrl(time, i, stopFlag))
        }
        mainIndex = i
        parallelLimit(tasks, mainLimit, callback)
      }, () => { return stopFlag.stop }, resolve)
    })
  }
  setupCommentUrl (time, index, stopFlag) {
    return (cb) => {
      let url = this.composeArticleListPageUrl(config.mainArticleUrl, index, config.mainArticleUrlSuffix)
      this.console(url)
      httpProxyXmlGet({
        url: url,
        timeout: config.timeout
      }).then((currentPage) => {
        if (currentPage) {
          let currentUrlPageInfo = this.handleArticleListPage(url, currentPage, time)
          let urlList = currentUrlPageInfo.urlList
          this.saveArticleUrls(urlList)
          let stop = this.checkArticleListPageInfo(currentUrlPageInfo)
          if (stop) {
            stopFlag.stop = stop
          }
        }
        cb()
      }).catch((error) => {
        this.console('setupUrls', error)
        cb()
      })
    }
  }
  composeArticleListPageUrl (url, index, suffix) {
    return `${url}${index}${suffix}`
  }
  saveArticleUrls (urlList) {
    if (urlList && urlList.length) {
      urlList.forEach((item) => {
        this.urlWriteStream.write(`${JSON.stringify(item)}\n`)
      })
      this.articleCommentUrlCount += urlList.length
    }
  }
  checkArticleListPageInfo (currentUrlPageInfo) {
    currentUrlPageInfo = currentUrlPageInfo || {}
    let { urlList, stop } = currentUrlPageInfo
    return !urlList || !urlList.length || stop || this.articleCommentUrlCount >= this.articleUrlCountLimit
  }
  handleArticleListPage (url, currentPage, time) {
    let articles = currentPage.match(ArticleRegExp)
    let stopCount = 0
    let urlList = articles.map((article) => {
      let currentTime = this.matchArticlePageDate(article)
      if (currentTime < time) {
        stopCount++
      }
      return {
        time: currentTime,
        view_count: this.matchArticleViewCount(article),
        user_name: this.matchArticleAuth(article),
        topic_title: this.matchArticleTitle(article),
        comment_count: this.matchArticleCommentCount(article),
        fromArticleUrl: this.matchArticleUrl(article)
      }
    }).filter((x) => x.comment_count > 0)

    let retUrlList = urlList.reduce((prev, item) => {
      item.commentUrl = item.fromArticleUrl
      let ret = [item]
      let pageCount = Math.ceil(item.comment_count / config.commentCountInOnePage)
      if (pageCount > 1) {
        // 股吧默认从2第2个分页
        for (let i = 2; i <= pageCount; i++) {
          let newItem = Object.assign({}, item)
          newItem.commentUrl = newItem.fromArticleUrl.replace('.html', `_${i}.html`)
          ret.push(newItem)
        }
      }
      return prev.concat(item)
    }, [])
    // 如果有30%的数据都是小于时间的则可以停止了
    return { urlList: retUrlList, stop: stopCount >= urlList.length * config.articleTimeStopPercent }
  }
  matchArticlePageDate (article) {
    let time = 0
    article.match(ArticlePageDateRegExp)

    if (RegExp.$1) {
      time = moment(RegExp.$1, PageDateFormat).toDate().getTime()
    }

    return time
  }
  matchArticleViewCount (article) {
    let viewCount = 0
    article.match(ArticleViewCountRegExp)

    if (RegExp.$2) {
      viewCount = +RegExp.$2
    }

    return viewCount
  }
  matchArticleCommentCount (article) {
    let count = 0
    article.match(ArticleCommentCountRegExp)

    if (RegExp.$1) {
      count = +RegExp.$1
    }

    return count
  }
  matchArticleAuth (article) {
    let auth = null
    article.match(ArticleAuthRegExp)

    if (RegExp.$1) {
      auth = RegExp.$1
    }

    return auth
  }

  matchArticleTitle (article) {
    let title = null
    article.match(ArticleTitleRegExp)

    if (RegExp.$1) {
      title = RegExp.$1
    }

    return title
  }

  matchArticleUrl (article) {
    let url = null
    article.match(ArticlePageUrlRegExp)

    if (RegExp.$1) {
      url = config.domain + RegExp.$1.replace('href=', '').replace(/"/g, '')
    }

    return url
  }

  matchComments (content) {
    content = content.replace(/<div class="zwli clearfix"/g, '</xx><xx><div class="zwli clearfix"')
    content = content.replace(/<div id="zwlist">(\s|\n|\r)+?<\/xx><xx>/g, '<div id="zwlist"><xx>')
    content = content.replace('<script>var num=', '</xx><script>var num=')
    return content.match(CommentMatchRegExp) || []
  }

  matchCommentTime (comment) {
    let time = 0

    comment.match(CommentTimeRegExp)
    if (RegExp.$1) {
      let timeStr = RegExp.$1.replace(/\s+/, ' ')
      time = moment(timeStr, CommentDateFormat).toDate().getTime()
    }

    return time
  }

  matchCommentContent (comment) {
    let content = null

    comment.match(CommentContentRegExp)
    if (RegExp.$1) {
      content = RegExp.$1
      CommentFilterRegExp.forEach((reg) => { content = content.replace(reg, '') })
    }

    return content
  }

  matchCommentLike (comment) {
    let like = 0

    comment.match(CommentLikeRegExp)
    if (RegExp.$1) {
      like = +RegExp.$1
    }

    return like
  }
}

module.exports = GuBaSpider
