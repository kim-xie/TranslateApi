'use strict';
/**
 * Copyright (c) 2018 kimshareclub. All Rights Reserved
 * Version 1.0.0
 * @author kim
 */
const crypto = require('crypto')
const ffmpeg = require('fluent-ffmpeg')

class Util {
  genMD5 (text) {
    return crypto.createHash('md5').update(text).digest('hex');
  },
  formatConvert(inputPath, outputPath) {
    ffmpeg(inputPath)
    .audioCodec('pcm_s16le')
    .audioChannels(1)
    .audioBitrate('16k')
    .outputFormat('s16le')
    .on('end', function() {
      console.log('文件转换成功!')
    }).on('error', function(err) {
      console.log('语音转换出现错误: ' + err.message)
    }).save(outputPath)
  },
  merge: function (source, dest) {
        let merged = {};
        for (let p in dest) {
            merged[p] = dest[p];
        }
        for (let p in source) {
            merged[p] = source[p];
        }
        return merged;
    },
    ensureArray: function (arrayLike) {
        if (this.isArray(arrayLike)) {
            return arrayLike;
        } else {
            return [arrayLike];
        }
    },
    isArray: function (obj) {
        return '[object Array]' === Object.prototype.toString.call(obj);
    },
    isObject: function (obj) {
        return '[object Object]' === Object.prototype.toString.call(obj);
    },
    isFunction: function (obj) {
        return '[object Function]' === Object.prototype.toString.call(obj);
    }
}

module.exports = Util
