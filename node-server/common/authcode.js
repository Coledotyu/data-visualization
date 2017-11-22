const crypto = require('crypto')

const AuthCode = {
  md5: function(str){
    const hash = crypto.createHash('md5')
    return hash.update(new Buffer(str, 'utf8')).digest('hex')
  },

  /**
   * 加密解密认证
   * @param str 加密/解密字符串
   * @param operation 加密解密方式 ENCODE/DECODE
   * @param key 加密解密key，默认不需要传
   * @returns {string} 返回结果
   */
  authcode: function(str, operation, key){
    operation = operation ? operation : 'DECODE'
    key = this.md5(key ? key : this.md5('ytxquatesapp'))
    str = operation == 'DECODE' ? str.replace(/###/g, '+') : str

    const strbuf = operation == 'DECODE' 
                  ? (new Buffer(str, 'base64'))
                  : (new Buffer(this.md5(str + key).substr(0, 8) + str))

    const box = new Array(256)
    
    let i = 0
    let j = 0
    let k = 0

    for(i = 0; i < 256; i++){
      box[i] = i
    }
    
    // 加解密部分
    for (i = 0; i < strbuf.length; i++){
      k = (k + 1) % 256
      j = (j + box[k]) % 256
      tmp = box[k]
      box[k] = box[j]
      box[j] = tmp
      
      // 从密匙簿得出密匙进行异或
      strbuf[i] = strbuf[i] ^ (box[(box[k] + box[j]) % 256])
    }
    
    let authcode = '' 
    
    switch(operation){
      case 'DECODE':
        authcode = strbuf.toString()
        if ( strbuf.toString().substr(0, 8) === this.md5(strbuf.toString().substr(8)+key).substr(0, 8)){
          authcode = authcode.substr(8)
        } else {
          authcode = ''
        }
        break
      case 'ENCODE':
        const regex = new RegExp('=', 'g')
        authcode = strbuf.toString('base64').replace(regex, '')
        break
    }

    return authcode
  },

  decode: function(str, key){
    return this.authcode(str, 'DECODE', key)
  },

  encode: function(str, key){
    return this.authcode(str, 'ENCODE', key)
  }
}

module.exports = AuthCode
