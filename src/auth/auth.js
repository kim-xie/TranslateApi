'use strict';
/**
 * Copyright (c) 2018 kimshareclub. All Rights Reserved
 * Version 1.0.0
 * @author kim
 */

const HttpsClient = require('../https/HttpsClient.js')

class Auth {
  getAccessToken(ak, sk) {
    let params = {
      grant_type: 'client_credentials',
      client_id: ak,
      client_secret: sk
    }
  }
}

module.exports = Auth
