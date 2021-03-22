
const _ = require('./lodash');
const gather = require('./index');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },/**
   * 组件的初始数据
   */
  data: {
  },
  ready () {
    gather.open(); // 页面加载
  },
  detached () {
    gather.close(); // 页面销毁
  },
  /**
   * 组件的方法列表
   */
  methods: {
  }
})
