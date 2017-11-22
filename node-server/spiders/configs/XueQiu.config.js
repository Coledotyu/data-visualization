const PROJECT_DIR = process.cwd()

module.exports = {
  commentUrl: {
    pageUrl: 'https://xueqiu.com/v4/statuses/public_timeline_by_category.json?',
    pageCommentsUrl: 'https://xueqiu.com/service/comment/all?',
    sinceId: -1,
    maxId: -1,
    count: 20
  },
  timeout: 3000,
  requestLimit: 10,
  responseTime: 40,
  defaultDelayTime: 30 * 60 * 1000, // 30分钟
  category: [105, 109], // 105:港美 109:沪深
  jsonPath: `${PROJECT_DIR}/data/xueqiu_comments_json.txt`,
  urlPath: `${PROJECT_DIR}/data/xueqiu_comments_url.txt`,
  wordPath: `${PROJECT_DIR}/data/xueqiu_quotation_word.txt`,
  wordCloudPath: `${PROJECT_DIR}/views/xueqiu_wordcloud.html`,
  CommentContentMatchRegExp: /<i>((.|\n|\r|\s)+?)<\/i>/g,
  CommentContentTimeRegExp: /<span data-time="(\d*)" class="time">(.|\n|\r)+?<\/span>/g,
  CommentContentLikeRegExp: /class="btn-like-comment">顶\(?\d*\)?/g,
  CommentHTMLFilterReg: /<[^>]*>|/g,
  commentFilterReg: [
    /<[^>]*>|/g,
    /var count[\s\S]*/g,
    /排序：最近最早顶全部评论\(?\d*\)?/g,
    /\(\):?/g,
    /\d*:?\.?\d*/g,
    /顶\(?\d*\)?打赏\(?\d*\)?回复/g,
    /2016-.........../g,
    /\d\d-\d\d \d\d:\d\d/g,
    /下一页/g
  ],
  token: 'aliyungf_tc=AQAAAAxB3wmUmAgAAkemtMbGYcS3CLsk; s=gd11x6mu3y; webp=1; xq_a_token=876f2519b10cea9dc131b87db2e5318e5d4ea64f; xq_a_token.sig=dfyKV8R29cG1dbHpcWXqSX6_5BE; xq_r_token=709abdc1ccb40ac956166989385ffd603ad6ab6f; xq_r_token.sig=dBkYRMW0CNWbgJ3X2wIkqMbKy1M; u=501495423011552; Hm_lvt_1db88642e346389874251b5a1eded6e3=1494578737,1494812857,1494999413,1495003287; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1495423012'
}
