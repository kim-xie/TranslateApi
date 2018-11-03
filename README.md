## TranslateApi 百度翻译api接口

**该接口的最大优势是支持多语音合成，不使用原生百度语音合成api**

### 如何使用？

1、```git clone https://github.com/mr-kings/TranslateApi```

2、```npm install```

3、将index.js中的以下参数替换成自己在百度开发者平台申请到的参数：
```
// token、tts、asr Api
const USER_ID = "11688325"
const API_KEY = "VKEOyyzOONs7NSnzhDnZdSjAw"
const SECRET_KEY = "0hmY5jBAKGxpdC9TDf7d4FCeF811tVxsX"

// fanyi Api
const APP_ID = "20180828000199769"
const APP_KEY = "sZmjLHRI691Ge8kGIUtz"
```

4、api接口测试
```
cd TranslateApi
npm test
```

5、接口说明

5.1、获取token：
```
const Translator = require('./index.js')

Translator.getToken().then((success) => {
 	// 成功返回数据
 	console.log("getToken: "+ JSON.stringify(success))
}).catch((error) => {
 	// 数据获取失败
 	console.log(error)
})

```

5.2、文本翻译：
```
const Translator = require('./index.js')

# from -- 源语言
# to   -- 目标语言
# text -- 源语言文本
# 此接口使用的是百度翻译原生api，所以可以参考原生文档：http://api.fanyi.baidu.com/api/trans/product/apidoc

Translator.translate(from, to, text).then((success) => {
 	// 成功返回数据
 	console.log("translate: "+ JSON.stringify(success))
}).catch((error) => {
 	// 数据获取失败
 	console.log(error)
})

```

5.3、语音合成：
```
const Translator = require('./index.js')

# lang -- 要合成语音的语言
# text -- 要合成语音的文本
# fileName -- 合成语音后的文件名称（绝对路径：path.resolve('src/temp/tts.mp3')）
# 此接口采用web端百度翻译接口，它支持的语言和百度翻译支持的语言一样，唯一的区别是粤语
# 百度翻译的粤语是 -- yue
# 此语音合成粤语是 -- cte

Translator.text2audio(lang, text, fileName).then((success) => {
 	// 成功返回数据
 	console.log("text2audio: "+ JSON.stringify(success))
}).catch((error) => {
 	// 数据获取失败
 	console.log(error)
})

```

5.4、语音识别:
```
const Translator = require('./index.js')

# fileName -- 合成语音后的文件名称（绝对路径：path.resolve('src/temp/tts.mp3')）
# token -- 百度语音识别所需token
# lang -- 要识别的语言
# 本接口采用的是百度语音识别原生接口，文档请参考：http://ai.baidu.com/docs#/ASR-API/top
# 本接口支持的lang有：
* zh  -- 中文
* en  -- 英文
* yue -- 粤语
* si  -- 四川话

Translator.audio2text(fileName, token, lang).then((success) => {
 	// 成功返回数据
 	console.log("audio2Text: "+ JSON.stringify(success))
}).catch((error) => {
 	// 数据获取失败
 	console.log(error)
})

```
