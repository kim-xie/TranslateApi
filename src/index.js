const auth = require('./auth/auth.js')
const translate = require('./translate.js')
const text2audio = require('./text2audio.js')
const audio2text = require('./audio2text.js')

// token、tts、asr Api
const USER_ID = "11688323"
const API_KEY = "VKEOyyzOONs7NSnzhDnZdSjA"
const SECRET_KEY = "0hmY5jBAKGxpdC9TDf7d4FCeF811tVsX"

// fanyi Api
const APP_ID = "20180828000199759"
const APP_KEY = "sZmjLHRI691Ge6kGIUtz"

/**
 * 翻译工具类
 * @type {Object}
 */
const Translator = {
	/**
	 * 获取token -- getAccessToken
	 * 第一个参数 -- API_KEY
	 * 第二个参数 -- SECRET_KEY
	 */
	getToken: () => {
		return auth.getAccessToken(API_KEY, SECRET_KEY)
	},
	/**
	 * 文本翻译 -- fanyi
	 * 第一个参数 -- app_id
	 * 第二个参数 -- app_key
	 * 第三个参数 -- 源语言
	 * 第四个参数 -- 目标语言
	 * 第五个参数 -- 翻译文本
	 */
	translate: (from, to, text) => {
		return translate.text(APP_ID, APP_KEY, from, to, text)
	},
	/**
	 * 语音合成 -- text2audio
	 * 第一个参数 -- 语言
	 * 第二个参数 -- 文本
	 * 第三个参数 -- 语音合成地址
	 */
	text2audio: (lang, text, fileName) => {
		return text2audio.getAudio(lang, text, fileName)
	},
	/**
	 * 语音识别 -- audio2Text
	 * 第一个参数 -- 用户id
	 * 第二个参数 -- token
	 * 第三个参数 -- 语音地址
	 * 第四个参数 -- 识别语言
	 */
	audio2text: (fileName, token, lang) => {
		return audio2text.getText(USER_ID, token, fileName, lang)
	}
}

module.exports = Translator
