
const _ = require('./lodash');
const util = require('./util');
const http = require('./network');


const globalOption = {
  'appname': '',      // app name
  'appid': '',        // app id
  'appkey': '',       // app secret
  'userId': '',       // 用户id
  'server_url': '',   // 数据上报地址
  
  'track': '/site/event', // 事件上报路径
  'appopen': '/app/open',   // app 打开上报路径
  'appclose': '/app/close', // app 关闭上报路径
  'pageopen': '/app/page/open',   // 页面响应上报路径
  'pageclose': '/app/apge/close', // 页面关闭上报路径
  
  'profile': {},      // 其它的公共数据
};

// 配置全局数据
const setOption = function(option) {
  const keys = [ 'appname', 'appid', 'appkey', 'server_url', 'track', 'appopen', 'appclose', 'pageopen', 'pageclose'];
  const data = _.pick(option, keys);
  _.each(data, function(value, key) {
    if (value) {
      globalOption[key] = value;
    }
  });
}

// 配置用户信息
const setUserId = function(userid) {
  globalOption['userid'] = userid;
  http.main();
}

// 设置公共属性
const setProfile = function(profile) {
  if (_.isObject(profile)) {
    // 公共数据合并
    Object.assign(globalOption['profile'], profile);
  }
}

const send = function(url, option, callback) {
  const basis = _.pick(globalOption, ['appname', 'appid', 'appkey', 'userid']);
  const data = Object.assign({}, basis, option);
  http.network(url, data).then(function() {
    if (_.isFunction(callback)) {
      callback();
    }
  }).catch(function(e) {
    console.log(e);
  });
}


// 页面打开
const appOpen = function(callback) {
  const option = {};
  const url = globalOption.server_url + globalOption.appopen;
  if (callback) {
    send(url, option, function() {
      callback();
    });
  } else {
    return new Promise(function(resolve) {
      send(url, option, function() {
        resolve();
      });
    });
  }
}

// 页面关闭
const appClose = function(callback) {
  const option = {};
  const url = globalOption.server_url + globalOption.appclose;
  if (callback) {
    send(url, option, callback);
  } else {
    return new Promise(function(resolve) {
      send(url, option, resolve);
    });
  }
}

// 页面打开
const pageOpen = function(callback) {
  const option = {};
  const url = globalOption.server_url + globalOption.pageopen;
  if (callback) {
    send(url, option, function() {
      callback();
    });
  } else {
    return new Promise(function(resolve) {
      send(url, option, function() {
        resolve();
      });
    });
  }
}

// 页面关闭
const pageClose = function(callback) {
  const option = {};
  const url = globalOption.server_url + globalOption.pageclose;
  if (callback) {
    send(url, option, callback);
  } else {
    return new Promise(function(resolve) {
      send(url, option, resolve);
    });
  }
}

/**
 * 事件埋点
 * @param {*} clickName 事件名称
 * @param {*} data      事件数据
 * @param {*} callback  事件回调
 */
const track = function(clickName, data, callback) {
  const option = {};
  option['event'] = clickName; // 事件名称
  option['data'] = data ? JSON.stringify(data) : '{}';
  const url = globalOption.server_url + globalOption.track;
  const value = Object.assign({}, globalOption.profile, option);
  if (callback) {
    send(url, value, callback);
  } else {
    return new Promise(function(resolve) {
      send(url, value, resolve);
    });
  }
}

module.exports = { 
  setOption: setOption, 
  setUserId: setUserId, 
  setProfile: setProfile, 
  track: track, 
  appOpen: appOpen, 
  appClose: appClose,
  pageOpen: pageOpen,
  pageClose: pageClose,
};