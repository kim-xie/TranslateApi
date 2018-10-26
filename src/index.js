const auth = require('./auth/auth.js')
const translate = require('./translate.js')
const text2audio = require('./text2audio.js')
const audio2text = require('./audio2text.js')

// token\tts\asr Api
const USER_ID = "11688323"
const API_KEY = "VKEOyyzOONs7NSnzhDnZdSjA"
const SECRET_KEY = "0hmY5jBAKGxpdC9TDf7d4FCeF811tVsX"

// fanyi api
const APP_ID = "20180828000199759"
const APP_KEY = "sZmjLHRI691Ge6kGIUtz"

// getAccessToken
// auth.getAccessToken(API_KEY, SECRET_KEY).then((success) => {
// 	// 成功返回数据
// 	console.log("success: "+ JSON.stringify(success))
// }).catch((error) => {
// 	// 数据获取失败
// 	console.log(error)
// })

// fanyi
// translate.text(APP_ID, APP_KEY, 'zh', 'en', '今天是星期五').then((success) => {
// 	// 成功返回数据
// 	console.log("success: "+ JSON.stringify(success))
// }).catch((error) => {
// 	// 数据获取失败
// 	console.log(error)
// })

// text2audio
text2audio.getAudio('en', 'i like english', './tts.mp3').then((success) => {
	// 成功返回数据
	console.log("success: "+ JSON.stringify(success))
}).catch((error) => {
	// 数据获取失败
	console.log(error)
})

// audio2Text
audio2text.getText(USER_ID, '24.5d36b085f655168903771cd33eb20e68.2592000.1542984779.282335-11688323', './tts.mp3', 'en').then((success) => {
	// 成功返回数据
	console.log("success: "+ JSON.stringify(success))
}).catch((error) => {
	// 数据获取失败
	console.log(error)
})
