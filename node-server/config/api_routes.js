module.exports.routes = [

  { verb: 'GET', 		path: '/filterword/fetchAll', fn: 'filter_word.fetchWordList', 		desc: '获取所有筛选词' },
  { verb: 'PUT', 		path: '/filterword/create', 	fn: 'filter_word.createFilterWord', desc: '新增筛选词' },
  { verb: 'DELETE', path: '/filterword/remove', 	fn: 'filter_word.removeFilterWord', desc: '删除筛选词' },
  { verb: 'GET',    path: '/filterword/searchOne',fn: 'filter_word.searchOneWord',    desc: '查询筛选词' },

  { verb: 'POST', path: '/update/:type/wordcloud',fn: 'word_cloud.updateWordCloud', desc: '重新生成词云' },
  { verb: 'POST', path: '/update/:type/wordfile', fn: 'word_cloud.updateWordFile', 	desc: '重新生成爬虫文件' },
  { verb: 'GET',  path: '/fetchAll/wordlist', 		fn: 'word_cloud.fetchWordList',   desc: '获取词频列表' },
  { verb: 'GET',  path: '/search/keywordList', 		fn: 'word_cloud.fetchKeyWordList',desc: '获取关键词列表' },

  { verb: 'PUT',  path: '/resource/upload',    fn: 'resource.createResource',   desc: '保存文件URl' },
  { verb: 'GET',  path: '/resource/fetchList', fn: 'resource.fetchResourceList',desc: '获取URl列表' },

]
