const fs = require('fs')
const _ = require('lodash')
const xqPath = require('../spiders/configs/XueQiu.config').wordCloudPath
const gbPath = require('../spiders/configs/GuBa.config').wordCloudPath

// 求词频合集
exports.generateWordFrequencyList = async () => {
  try {
    const xqData = composeWordFrequency(xqPath)
    const gbData = composeWordFrequency(gbPath)
   	return mergeCompose(xqData, gbData) 
  } catch (err) {
    console.log(err)
  }
}

function composeWordFrequency(path) {
  const wordHtml = fs.readFileSync(path, 'utf-8')
  const wordHtmlFormat = fetchWordFreq(wordHtml)
  
  const wordHtmlKeys = wordHtmlFormat.word
  const wordHtmlValues = wordHtmlFormat.freq

  return wordHtmlKeys.map((item, index) => {
    return {
      word: item,
      freq: wordHtmlValues[index] 
    }
  })
}

function fetchWordFreq(wordHtml) {
  const format = /<script type="application\/json" data-for="htmlwidget-(.*)">(.*)<\/script>/g
  wordHtml.match(format)
  return JSON.parse(RegExp.$2).x
}

function mergeCompose(xqData, gbData) {
	const data = []
	xqData.concat(gbData).forEach((item, index) => {
  	const xqCount = _.find(xqData, { word: item.word })
 		const gbCount = _.find(gbData, { word: item.word })  
  	const element = { 
  		word: item.word,
    	xqCount: xqCount ? xqCount.freq : 0,
    	gbCount: gbCount ? gbCount.freq : 0,
    	totalCount: (xqCount ? xqCount.freq : 0) + (gbCount ? gbCount.freq : 0)
  	}   
  	if(!_.find(data, { word: item.word })) {
  		data.push(element)
  	}   
	})

	return data 
}
