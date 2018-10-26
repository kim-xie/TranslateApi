'use strict';
/**
 * Copyright (c) 2018 kimshareclub. All Rights Reserved
 * Version 1.0.0
 * @author kim
 */

const httpsClient = require('../https/httpsClient.js')
const AUTH_HOST = 'openapi.baidu.com'
const AUTH_PATH = '/oauth/2.0/token'

const Auth = {
  getAccessToken(ak, sk) {
    let params = {
      grant_type: 'client_credentials',
      client_id: ak,
      client_secret: sk
    }
  	let requestInfo = {
  		params,
  		host: AUTH_HOST,
  		path: AUTH_PATH
  	}
  	return httpsClient.sendGet(requestInfo)
  }
}

module.exports = Auth
