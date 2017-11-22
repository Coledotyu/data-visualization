export default {
  baseUrl: '',
  localUrl: '',
  uptokenUrl: '',
  qiniuDir: 'production/',
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
