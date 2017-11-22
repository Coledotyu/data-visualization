const PROJECT_DIR = process.cwd()
const domain = 'http://guba.eastmoney.com'
module.exports = {
  domain: domain,
  mainArticleUrl: `${domain}/default_`,
  mainArticleUrlSuffix: '.html',
  mainArticleUrlIndex: 1,
  mainArticleUrlLimit: 10,
  articleTimeStopPercent: 0.3,
  commentCountInOnePage: 30,
  timeout: 3000,
  requestLimit: 10,
  jsonPath: `${PROJECT_DIR}/data/guba_comments_json.txt`,
  urlPath: `${PROJECT_DIR}/data/guba_comments_url.txt`,
  wordPath: `${PROJECT_DIR}/data/guba_quotation_word.txt`,
  wordCloudPath: `${PROJECT_DIR}/views/guba_wordcloud.html`,
  regs: {
    ArticleRegExp: /<li class="(even|first)">((.|\n|\r|\s)+?)<\/li>/g,

    ArticlePageDateRegExp: /<cite class="last">([\d|\s|\-|:]*)<\/cite>/g,

    ArticleViewCountRegExp: /<li class="(even|first)">\n*\r*\s*<cite>(\d*)+?<\/cite>/g,
    ArticleCommentCountRegExp: /<cite>(\d+)<\/cite>\n?\r?\s*<span class="sub">/g,
    ArticleAuthRegExp: /data-poptype="1">(.*)+?<\/a>/g,
    ArticleTitleRegExp: /class="note">((.|\s)+?)<\/a>/g,

    ArticlePageUrlRegExp: /href="(\/news[,|\w|\d]*\.html)"/g,

    CommentMatchRegExp: /<xx>((.|\n|\r|\s)+?)<\/xx>/g,
    CommentTimeRegExp: /<div class="zwlitime">发表于\s*((\d|-|:|\s)+?)<\/div>/g,
    CommentContentRegExp: /<div class="zwlitext stockcodec">((.|\n|\r){3,}?)<\/div>/g,
    CommentLikeRegExp: /<span class="red">(\d)+?<\/span>/g,
    CommentFilterRegExp: [
      /<[^>]*>|/g
    ]
  }
}
