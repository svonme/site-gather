/**
 * @file 监测服务
 */

const getLocation = function() {
  const pages = getCurrentPages();
  const route = pages[pages.length - 1];
  return route;
}

// 小程序打开方式（来源）
const getScene = function() {
  try {
    const first = getCurrentPages()[0];
    const reporter = first['__displayReporter'] || {};
    const options = reporter['showOptions'] || {};
    const scene = options['scene'] || '';
    return scene;
  } catch (error) {
    return '';
  }
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
          brand: data.brand, // 设备品牌
          model: data.model, // 设备型号
          os: data.system,   // 操作系统
          osv: data.version, // 操作系统版本
        });
      }
    });
  });
}

module.exports = { 
  getScene: getScene, 
  getNetWork: getNetWork,
  getLocation: getLocation, 
  getSystemInfo: getSystemInfo, 
  getNodeId: getNodeId, 
  hasNodeId: hasNodeId
}