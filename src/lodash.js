/**
 * @file 简易
 * @author svon.me@gmail.com
 */

const isArray = function(value) {
  if (value && value instanceof Array) {
    return true;
  }
  return false;
}

const isObject = function(value) {
  if (value && typeof value === 'object') {
    // 抛开数组
    if (isArray(value)) {
      return false;
    }
    return true;
  }
  return false;
}

const isString = function(value) {
  if (value && typeof value === 'string') {
    return true;
  }
  return false;
}

const isFunction = function(value) {
  if (value && typeof value === 'function') {
    return true;
  }
  return false;
}

const flatten = function(array) {
  const list = [];
  const temp = [].concat(array);
  for(let i = 0, len = temp.length; i < len; i++) {
    const value = temp[i];
    if (isArray(value)) {
      list.push.apply(list, flatten(value));
    } else {
      list.push(value);
    }
  }
  return list;
};

const has = function(data, key) {
  if (data && key) {
    if (data.hasOwnProperty(key)) {
      return true;
    }
  }
  return false;
};

const includes = function(value, key) {
  if (value && value.includes) {
    return value.includes(key);
  }
  if (value && value.indexOf) {
    if (value.indexOf(key) >= 0) {
      return true;
    }
  }
  return false;
};


const first = function(array) {
  const value = array[0];
  return value;
};

const last = function(array) {
  const [ value ] = array.slice(-1);
  return value;
};

// 获取对象长度
const size = function(data) {
  if (data && isArray(data)) {
    return data.length;
  }
  if (data && isObject(data)) {
    const keys = Object.keys(data);
    return size(keys);
  }
  if (data && isString(data)) {
    return data.length;
  }
  return 0;
}

/**
 * 循环
 * @param {*} data 对象
 * @param {*} iteratee 迭代处理
 */
const each = function(data, iteratee) {
  if (data && iteratee) {
    if (isArray(data) || isString(data)) {
      for(let i = 0, len = size(data); i < len; i++) {
        const value = data[i];
        iteratee(value, i, data);
      }
      return;
    }
    if (isObject(data)) {
      const keys = Object.keys(data);
      each(keys, function(key, index) {
        if (data.hasOwnProperty(key)) {
          iteratee(data[key], key, data);
        }
      });
      return;
    }
  }
}

// 检索数组中某一元素
const some = function(array, iteratee) {
  let item;
  if (array && iteratee) {
    for(let i = 0, len = size(array); i < len; i++) {
      const status = iteratee(array[i]);
      if (status) {
        item = array[i];
        break;
      }
    }
  }
  return item;
}


// 从对象中排除某些键值对数据
const omit = function(data, keys) {
  const obj = {};
  each(data, function(value, key) {
    if (!includes(keys, key)) {
      obj[key] = value;
    }
  });
  return obj;
};

// 只保留对象中的某些键值对数据
const pick = function(data, keys) {
  const obj = {};
  each(keys, function(key) {
    const value = data[key];
    obj[key] = value;
  });
  return obj;
};

module.exports = { 
  isArray: isArray, 
  isObject: isObject, 
  isString: isString, 
  isFunction: isFunction, 
  flatten: flatten, 
  has: has, 
  includes: includes, 
  omit: omit, 
  pick: pick, 
  first: first, 
  last: last, 
  size: size, 
  each: each, 
  some: some
};



