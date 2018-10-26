'use strict';
/**
 * Copyright (c) 2018 kimshareclub. All Rights Reserved
 * Version 1.0.0
 * @author kim
 */

const httpsClient = require('./https/httpsClient.js')
const util = require('./util/util.js')
const TRANS_HOST = 'fanyi-api.baidu.com'
const TRANS_PATH = '/api/trans/vip/translate'

const Translate = {
  text: (app_id, app_key, from, to, query) => {
    let salt = (new Date).getTime()
    const temp = app_id + query + salt + app_key
    const sign = util.genMD5(temp)
    let params = {
      q: query,
      appid: app_id,
      salt: salt,
      from: from,
      to: to,
      sign: sign
    }
  	let requestInfo = {
  		params,
      isJson: false,
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
  		host: TRANS_HOST,
  		path: TRANS_PATH
  	}
  	return httpsClient.sendPost(requestInfo)
  }
}

module.exports = Translate
