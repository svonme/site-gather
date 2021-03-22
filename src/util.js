/**
 * @file 监测服务
 */

const getLocation = function() {
  const pages = getCurrentPages();
  const route = pages[pages.length - 1];
  return route;
}

const nodeKey = '__wxExparserNodeId__';

const hasNodeId = function(id) {
  let status = false;
  const pages = getCurrentPages();
  for(let i = 0, len = pages.length; i < len; i++) {
    const page = pages[i];
    if (page[nodeKey] === id) {
      status = true;
      break;
    }
  }
  return status;
}

const getNodeId = function() {
  const location = getLocation();
  return location[nodeKey];
}

// 获取网络类型
const getNetWork = function() {
  return new Promise(function(resolve) {
    wx.getNetworkType({
      success: function(data) {
        resolve(data.networkType)
      },
      fail: function() {
        resolve('none');
      }
    });
  });
};

const getSystemInfo = function() {
  return new Promise(function(resolve) {
    wx.getSystemInfo({
      fail: function() {
        resolve({});
      },
      success: function(data) {
        resolve({
          brand: data.brand,
          model: data.model,
          system: data.system,
          version: data.version,
        });
      }
    });
  });
}

module.exports = { getNetWork, getLocation, getSystemInfo, getNodeId, hasNodeId }