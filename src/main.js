'use strict';
/**
 * Copyright (c) 2018 kimshareclub. All Rights Reserved
 * Version 1.0.0
 * @author kim
 */

const url = require('url')
const http = require('http')
const path = require('path')
const querystring = require("querystring")
const Translator = require('./index.js')

// 创建http服务
http.createServer((req, res) => {
	// 设置接收数据编码格式为 UTF-8
  req.setEncoding('utf-8')
  let postData = ""
  // 数据块接收中
  req.addListener("data", postDataChunk => {
      postData += postDataChunk
  })
  // 数据接收完毕，执行回调函数
  req.addListener("end", () => {
      console.log('数据接收完毕')
			let objectData = JSON.parse(postData)
			const from = objectData.from
			const to = objectData.to
			const text = objectData.text
			const fileName = objectData.fileName
			textTranslate(from, to, text, fileName)
			.then(getAudio)
			.then(result => {
				//console.log(result);
				res.setHeader("Access-Control-Allow-Origin", "*")
				res.writeHead(200, {
            "Content-Type": "text/plain;charset=utf-8"
        })
				res.write(JSON.stringify(result))
				res.end()
			})
			.catch(error => {
				console.log(error)
				res.writeHead(500, {
            "Content-Type": "text/plain;charset=utf-8"
        })
				res.end()
			})
  })
}).listen('8888', "localhost", function(){
    console.log("HTTP服务器启动中，监听端口：8888......")
})


// 获取token
// Translator.getToken().then((success) => {
// 	// 成功返回数据
// 	console.log("getToken: "+ JSON.stringify(success))
// }).catch((error) => {
// 	// 数据获取失败
// 	console.log(error)
// })

// 文本翻译
// Translator.translate('en', 'yue', 'i like english').then((success) => {
// 	// 成功返回数据
// 	console.log("translate: "+ JSON.stringify(success))
// }).catch((error) => {
// 	// 数据获取失败
// 	console.log(error)
// })

// 语音合成
/**
 * zh  -- 中文
 * en  -- 英文
 * cte -- 粤语
 * th  -- 泰语
 * jp  -- 日语
 * kor -- 韩语
 */
// Translator.text2audio('zh', '我喜欢英语', path.resolve('src/temp/tts.mp3')).then((success) => {
// 	// 成功返回数据
// 	console.log("text2audio: "+ JSON.stringify(success))
// }).catch((error) => {
// 	// 数据获取失败
// 	console.log(error)
// })

// 语音识别
/**
 * zh  -- 中文
 * en  -- 英文
 * yue -- 粤语
 * si  -- 四川话
 */
// Translator.audio2text(path.resolve('src/temp/tts.mp3'),'24.5d36b085f655168903771cd33eb20e68.2592000.1542984779.282335-11688323', 'zh').then((success) => {
// 	// 成功返回数据
// 	console.log("audio2Text: "+ JSON.stringify(success))
// }).catch((error) => {
// 	// 数据获取失败
// 	console.log(error)
// })

// 获取token
function getToken(){
	return new Promise((resolve, reject) => {
		Translator.getToken().then(success => {
			const access_token = success.access_token
			resolve(access_token)
		}).catch((error) => {
			console.log(error)
			reject(error)
		})
	})
}

// 获取语音
function getAudio(result){
	return new Promise((resolve, reject) => {
		Translator.text2audio(result.to, result.dst, result.fileName).then((success) => {
			console.log("text2audio: success")
			resolve(result)
		}).catch((error) => {
			console.log(error)
			reject(error)
		})
	})
}

// 文本翻译
function textTranslate(from, to, text, fileName){
	return new Promise((resolve, reject) => {
		Translator.translate(from, to, text).then((success) => {
			console.log("translate: "+ JSON.stringify(success))
			const dst = success.trans_result[0].dst
			if(to === 'yue'){
				to = 'cte'
			}
			let result = {
				dst,
				to,
				fileName: path.resolve(fileName),
				data: JSON.stringify(success)
			}
			resolve(result)
		}).catch((error) => {
			console.log(error)
			reject(error)
		})
	})
}

// 语音翻译
function audioTranslate(fileName, from, to){
	return new Promise((resolve, reject) => {
		Translator.getToken().then((success) => {
			const access_token = success.access_token
			Translator.audio2text(fileName, access_token, from).then((success) => {
				console.log("audio2Text: "+ JSON.stringify(success))
				const text = success.result[0]
				Translator.translate(from, to, text).then((success) => {
					console.log("translate: "+ JSON.stringify(success))
					const dst = success.trans_result[0].dst
					if(to === 'yue'){
						to = 'cte'
					}
					Translator.text2audio(to, dst, fileName).then((success) => {
						console.log("text2audio: success")
						resolve()
					})
				})
			})
		}).catch((error) => {
			console.log(error)
			reject(error)
		})
	})
}

// 先文本翻译拿到语音，再进行语音翻译
// textTranslate('en', 'zh', 'i like english too', path.resolve('src/temp/tts.mp3')).then((success) => {
// 	audioTranslate(path.resolve('src/temp/tts.mp3'), 'zh', 'en')
// })

// textTranslate('zh', 'th', '哈喽', path.resolve('src/temp/tts.mp3'))
