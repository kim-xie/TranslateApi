'use strict';
/**
 * Copyright (c) 2018 kimshareclub. All Rights Reserved
 * Version 1.0.0
 * @author kim
 */
const crypto = require('crypto')
const ffmpeg = require('fluent-ffmpeg')

const Util = {
  genMD5: (text) => {
    return crypto.createHash('md5').update(text).digest('hex')
  },
  formatConvert: (inputPath, outputPath) => {
    return new Promise(function(resolve, reject) {
      ffmpeg(inputPath)
      .audioCodec('pcm_s16le')
      .audioChannels(1)
      .audioBitrate('16k')
      .outputFormat('s16le')
      .on('end', () => {
        console.log('文件转换成功!')
        resolve()
      }).on('error', (err) => {
        console.log('语音转换出现错误: ' + err.message)
        reject(err)
      }).save(outputPath)
    })
  },
  merge: (source, dest) => {
    let merged = {};
    for (let p in dest) {
        merged[p] = dest[p];
    }
    for (let p in source) {
        merged[p] = source[p];
    }
    return merged;
  },
  ensureArray: (arrayLike) => {
      if (this.isArray(arrayLike)) {
          return arrayLike;
      } else {
          return [arrayLike];
      }
  },
  isArray: (obj) => {
      return '[object Array]' === Object.prototype.toString.call(obj);
  },
  isObject: (obj) => {
      return '[object Object]' === Object.prototype.toString.call(obj);
  },
  isFunction: (obj) => {
      return '[object Function]' === Object.prototype.toString.call(obj);
  },
  getExt: (fileName) => {
    return fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
  },
  isNotPcm: (fileName) => {
    const ext = Util.getExt(fileName)
    return ext !== 'pcm'? true : false
  }
}

module.exports = Util
