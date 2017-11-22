const exec = require('child_process').exec
const { FilterWord } = require('../models')

exports.generateWordCould = async (wordPath, wordCloudPath) => {
  const ret = await FilterWord.find({})
  const words = ret.map((item) => { return '\\"'+item.word+'\\"' })
  const wordsString = '"'+`(${words.join(',')})`+'"'
  const rCronScript = `Rscript ./scripts/word_cloud.R ${wordPath} ${wordCloudPath} ${wordsString}` 

  return new Promise((resolve, reject) => {
    exec(rCronScript, (error, stdout, stderr) => {
    	if(error) return reject(error)
    	resolve(stderr || stdout)
  	})
  })
}
