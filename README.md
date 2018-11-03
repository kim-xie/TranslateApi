# TranslateApi 百度翻译api接口

**该接口的最大优势是支持多语音合成，不使用原生百度语音合成api**

# 如何使用？

### 将代码克隆到本地
1、git clone https://github.com/mr-kings/TranslateApi

2、npm install

3、将index.js中的以下参数替换成自己在百度开发者平台申请到的参数：
// token、tts、asr Api
const USER_ID = "11688325"
const API_KEY = "VKEOyyzOONs7NSnzhDnZdSjAw"
const SECRET_KEY = "0hmY5jBAKGxpdC9TDf7d4FCeF811tVxsX"

// fanyi Api
const APP_ID = "20180828000199769"
const APP_KEY = "sZmjLHRI691Ge8kGIUtz"

4、api 测试接口
node test.js

