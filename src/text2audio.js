'use strict';
/**
 * Copyright (c) 2018 kimshareclub. All Rights Reserved
 * Version 1.0.0
 * @author kim
 */

const httpsClient = require('./https/httpsClient.js')
const util = require('./util/util.js')
const TRANS_HOST = 'fanyi.baidu.com'
const TRANS_PATH = '/gettts'

const TextToAudio = {
  getAudio: (lan, text, ouputPath) => {
    let params = {
      lan: lan,
      text: text,
      spd: '3',
      source: 'web'
    }
  	let requestInfo = {
  		params,
      ouputPath,
  		host: TRANS_HOST,
  		path: TRANS_PATH
  	}
  	return httpsClient.getTextToAudio(requestInfo)
  }
}

module.exports = TextToAudio
