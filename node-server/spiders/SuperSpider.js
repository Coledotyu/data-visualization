const fs = require('fs')
const parallelLimit = require('async/parallelLimit')
const { httpProxyXmlGet } = require('../common/http_proxy')
const ProgressBar = require('progress')

class SuperSpider {
  constructor (name, days, urlPath, wordPath, jsonPath) {
    this.name = name
    this.urlPath = urlPath
    this.wordPath = wordPath
    this.jsonPath = jsonPath
    this.jsonWriteStream = fs.createWriteStream(this.jsonPath)
    this.urlWriteStream = fs.createWriteStream(this.urlPath)
    this.worldWriteStream = fs.createWriteStream(this.wordPath)
    this.timeFromNow = new Date().getTime() - days * 24 * 3600 * 1000
    this.progressBar = null
  }
  spide () {}
  handleCommentData (content) {
    return content
  }
  handleJsonData (content) {
    return content
  }
  readCommentJson () {
    this.urlWriteStream.close()
    const data = fs.readFileSync(this.urlPath, 'utf-8').split('\n')
    if (data && !data[data.length - 1]) {
      data.pop()
    }
    return data.map((item) => JSON.parse(item))
  }
  fetchComments (requestLimit, timeout) {
    return new Promise((resolve) => {
      let commentJson = this.readCommentJson()
      const promises = commentJson.map((json, index) => { return this.fetchComment(json, timeout) })
      this.progressBar = new ProgressBar('comment fetching [:bar] :current/:total :percent :etas', {
        complete: '=',
        incomplete: ' ',
        width: 20,
        total: promises.length
      })
      parallelLimit(promises, requestLimit, () => {
        this.worldWriteStream.close()
        resolve()
      })
    })
  }
  fetchComment (json, timeout) {
    return (cb) => {
      if (!json) {
        return cb()
      }
      httpProxyXmlGet({
        url: json.commentUrl,
        headers: { 'Connection': 'Close' },
        timeout: timeout
      }).then((content) => {
        this.worldWriteStream.write(this.handleCommentData(content) + '\n')
        let str = this.handleJsonData(content, json)
        if (str) {
          this.jsonWriteStream.write(str + '\n')
        }
        this.progressBar.tick()
        cb()
      }).catch((e) => {
        this.console(`fetch${this.name}Comment`, e)
        cb()
      })
    }
  }
  console (...x) {
    let args = [this.name].concat(x)
    console.log.apply(null, args)
  }
 /**
  * 公用方法可以写在这个类 static
  */
}

module.exports = SuperSpider
