const fs = require('fs')
const esClient = require('../common/elasticsearch')

exports.readWordJSON = (path) => {
  let arr = fs.readFileSync(path, 'utf8').split('\n')

  return arr.filter(item => !!item).map(item => JSON.parse(item))
}

exports.deleteSpiderData = (index = 'spider') => {
  esClient.indices.delete({ index }, (err, response) => {
    if(err){
      console.log(err)
    }
  })
}

exports.jsonsToDB = (jsons, index, type) => {
  let bulkBody = []
  jsons.forEach((item) => {
    bulkBody.push({
      index: {
        _index: index,
        _type: type
      }
    })
    bulkBody.push(item)
  })

  esClient.bulk({ body: bulkBody })
  .then(res => {
    console.log(res)
  })
}
