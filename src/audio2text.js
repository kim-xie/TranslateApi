'use strict';
/**
 * Copyright (c) 2018 kimshareclub. All Rights Reserved
 * Version 1.0.0
 * @author kim
 */

const fs = require('fs')
const path = require('path')
const httpsClient = require('./https/httpsClient.js')
const util = require('./util/util.js')
const TRANS_HOST = 'vop.baidu.com'
const TRANS_PATH = '/server_api'
const TEMP_PATH = './temp/16k.pcm'

// 语音识别
const AudioToText = {
  formatConvert: (inputPath) => {
    return new Promise(function(resolve, reject) {
      if(util.isNotPcm(inputPath)){
        util.formatConvert(path.resolve(inputPath), path.resolve(TEMP_PATH)).then(() => {
          resolve(fs.readFileSync(path.resolve(TEMP_PATH)))
        }).catch((error) => {
          reject(error)
        })
      }else{
        resolve(fs.readFileSync(path.resolve(inputPath)))
      }
    })
  },
  getText: (uid, token, audioPath, lang) => {
    return AudioToText.formatConvert(audioPath).then((success) => {
      let speechBuffer = new Buffer.from(success)
      switch (lang) {
         case 'en':
           lang = 1737
           break
         case 'yue':
           lang = 1637
           break
         case 'si':
           lang = 1837
           break
         default:
           lang = 1537
           break
      }
      let params = {
        format: 'pcm', // 语音文件的格式，pcm 或者 wav 或者 amr。不区分大小写
        rate: '16000', // 采样率，16000，固定值
        channel: '1', // 声道数，仅支持单声道，请填写固定值 1
        cuid: uid, // 用户唯一标识，string
        token: token, // token
        dev_pid: lang, // 识别语言
        speech: speechBuffer.toString('base64'), // 本地语音文件的的二进制语音数据 ，需要进行base64编码 与len一起使用
        len: Buffer.byteLength(speechBuffer) // 与speech一起使用
      }
    	let requestInfo = {
    		params,
        isJson: true,
        contentType: 'application/json',
    		host: TRANS_HOST,
    		path: TRANS_PATH
    	}
    	return httpsClient.sendPost(requestInfo)
    }).catch((error) => {
      console.log(error)
      return false
    })
  }
}

module.exports = AudioToText
