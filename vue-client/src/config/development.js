export default {
  baseUrl: 'http://127.0.0.1:3001/',
  localUrl: 'http://127.0.0.1:8081',
  uptokenUrl: 'http://139.196.235.210:3000/admin/tool/qiniu',
  qiniuDir: 'dev/',
  timeout: 1500,
  wordCloudConfig: {
    nameList: ['XueQiu', 'GuBa'],
    suffix: '_wordcloud.html'
  },
  filterWorldConfig: {
    fetchAll: 'filterword/fetchAll',
    destroy: 'filterword/remove',
    add: 'filterword/create',
    updateWordCloud: 'update/:type/wordcloud'
  },
  spideConfig: {
    spide: 'update/:type/wordfile'
  }
}
