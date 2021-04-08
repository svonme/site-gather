/**
 * @file 网络请求
 */

const _ = require('./lodash');
const util = require('./util');

let task = [];
let ready = false;

// 参数拼接
const query = function(data) {
  const option = Object.assign({ now: Date.now() * 1000 }, data);
  return new Promise(function(resolve, reject) {
    util.getNetWork().then(function(netWorkType) {
      option['network'] = netWorkType;
      return util.getLocation();
    }).then(function(location) {
      Object.assign(option, {
        pathname: location.route,
        search: JSON.stringify(location.options)
      });
      return util.getSystemInfo();
    }).then(function(info) {
      Object.assign(option, info, {
        scene: util.getScene() // 来源
      });
    }).then(function() {
      resolve(option);
    }).catch(function(e){
      reject(e)
    });
  });
}

const http = function(api, data) {
  const arr = [];
  for(const key in data) {
    const value = data[key] ? encodeURI(data[key]) : '';
    arr.push(key + '=' + value);
  }
  const search = arr.join('&');
  return new Promise(function(resolve) {
    wx.request({
      url: api + '?' + search,
      fail: function(e) {
        console.log(e);
        resolve();
      },
      success () {
        resolve();
      }
    });
  })
}



const working = function() {
  if (!ready) {
    return;
  }
  const queue = task.splice(0, 4); // 每次执行 4 个任务
  const array = []
  _.each(queue, function(item) {
    array.push(http(item.api, item.data).then(item.callback));
  });
  Promise.all(array).then(function() {
    if (task.length > 0) {
      working();
    }
  });
}

const main = function() {
  ready = true;
  working();
}

const app = function(api, data, callback) {
  // 添加队列
  task.push({
    api: api,
    data: data,
    callback: callback
  });
  // 执行
  working();
}

const network = function(api, data) {
  return new Promise(function(resolve, reject) {
    query(data).then(function(value) {
      return app(api, value, function() {
        resolve()
      });
    }).catch(function(e) {
      reject(e);
    });
  });
}

module.exports = {
  main: main,
  network: network
};