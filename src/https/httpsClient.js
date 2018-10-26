'use strict';
/**
 * Copyright (c) 2018 kimshareclub. All Rights Reserved
 * Version 1.0.0
 * @author kim
 */

const https = require('https')
const querystring = require('querystring')
const fs = require('fs')

const HttpsClient = {
  sendGet: (requestInfo) => {
    // params
    const params = querystring.stringify(requestInfo.params)
    // options
    const options = {
        method: 'GET',
        hostname: requestInfo.host,
        path: requestInfo.path + "?" + params
    }
    return new Promise(function(resolve, reject) {
      https.request(options, function (res) {
        res.on('data', (data) => {
          try {
              resolve(JSON.parse(data.toString()))
          } catch (e) {
              // 无法解析json请求，就返回原始body
              resolve(data.toString())
          }
        })
        res.on('end', () => {

        })
        res.on('error', (e) => {
          reject(e)
        })
      }).on('error', (e) => {
        console.error(e.message)
        reject(e)
      }).end()
    })
  },
  getTextToAudio: (requestInfo) => {
    // params
    const params = querystring.stringify(requestInfo.params)
    // options
    const options = {
        method: 'GET',
        hostname: requestInfo.host,
        path: requestInfo.path + "?" + params
    }
    return new Promise(function(resolve, reject) {
      https.request(options, function (res) {
        let chunks = []
        res.on('data', (data) => {
          chunks.push(data)
          try {
              resolve(JSON.parse(data.toString()))
          } catch (e) {
              // 无法解析json请求，就返回原始body
              resolve(data.toString())
          }
        })
        res.on('end', () => {
          const mybuffer = Buffer.concat(chunks)
          // fs模块写文件
          fs.writeFileSync(requestInfo.ouputPath, mybuffer)
        })
        res.on('error', (e) => {
          reject(e)
        })
      }).on('error', (e) => {
        console.error(e.message)
        reject(e)
      }).end()
    })
  },
  sendPost: (requestInfo) => {
    // params
    let params
    if(requestInfo.isJson){
      params = JSON.stringify(requestInfo.params)
    } else {
      params = querystring.stringify(requestInfo.params)
    }
    // options
    const options = {
        method: 'POST',
        hostname: requestInfo.host,
        path: requestInfo.path,
        json: requestInfo.isJson,
        headers: {
          'Content-Type': requestInfo.contentType,
          'Content-Length': Buffer.byteLength(params)
        }
    }
    return new Promise(function(resolve, reject) {
      const request = https.request(options, function (res) {
        res.on('data', (data) => {
          try {
              resolve(JSON.parse(data.toString()))
          } catch (e) {
              // 无法解析json请求，就返回原始body
              resolve(data.toString())
          }
        })
        res.on('end', () => {

        })
        res.on('error', (e) => {
          reject(e)
        })
      })
      request.on('error', (e) => {
        console.error(e.message)
        reject(e)
      })
      request.write(params)
      request.end()
    })
  }
}

module.exports = HttpsClient
