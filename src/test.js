const Translator = require('./index.js')

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
// Translator.text2audio('zh', '我喜欢英语', './temp/tts.mp3').then((success) => {
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
// Translator.audio2text('./temp/tts.mp3','24.5d36b085f655168903771cd33eb20e68.2592000.1542984779.282335-11688323', 'zh').then((success) => {
// 	// 成功返回数据
// 	console.log("audio2Text: "+ JSON.stringify(success))
// }).catch((error) => {
// 	// 数据获取失败
// 	console.log(error)
// })

// 文本翻译
function textTranslate(from, to, text, fileName){
	return new Promise((resolve, reject) => {
		Translator.getToken().then((success) => {
			const access_token = success.access_token
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
textTranslate('en', 'zh', 'i like english too', './temp/tts.mp3').then((success) => {
	audioTranslate('./temp/tts.mp3', 'zh', 'en')
})
