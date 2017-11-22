const _ = require('lodash')
const crypto = require('crypto')

module.exports = {
  token: {
    web: crypto.createHash('md5').update('ytxloginkeywwwytxcom').digest('hex')
  },

  signParams: function(params, type = 'web'){
    const stringToSign = this.generateRawString(params, type)
    return crypto.createHash('md5').update(new Buffer(stringToSign, 'utf8')).digest('hex')
  },

  generateRawString: function(params, type){
    const token = this.token[type]
    return (this.joinValues(Object.keys(params)) + token)
  },

  joinValues: function(obj){
    const self = this
    if(_.isArray(obj)){
      return obj.map(function(item){
        return self.joinValues(item)
      }).join(',')
    }
  }
}
