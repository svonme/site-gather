# site-gather

站点数据采集

### Install

```
$ yarn add site-gather

$ npm install site-gather
```


### 引入 SDK

```
const gather = require('site-gather');
```
```
import gather from 'site-gather';
```

### 配置初始化参数

```
gather.setOption(Option);
```

#### Option [setOption方法参数]

| 字段 | 类型 | 是否比填 | 默认值 | 说明 |
| --   | --  |--       | --   | -- |
| appname | String | 否 | Null | 项目名称 |
| appid | String | 否 | Null | 项目 ID |
| appkey | String | 否 | Null | 项目密钥 |
| server_url | String | 是 | - | 数据上报地址 |
| track | String | 否 | "/app/event" | 事件上报路径 |
| appopen | String | 否 | "/app/open" | app 响应上报路径 |
| appclose | String | 否 | "/app/close" | app 关闭上报路径 |
| pageopen | String | 否 | "/app/page/open" | 页面响应上报路径 |
| pageclose | String | 否 | "/app/page/close" | 页面关闭上报路径 |


#### 配置用户信息

```
/*
  * @param {String} UserId 用户ID
  */
gather.setUserId(UserId);
```

未设置 UserId 时，监测程序则不会执行

#### 配置全局事件公共参数 [非必须]

```
/*
  * @param {Object} Option 公共参数
  */
gather.setProfile(Option);
```

#### track 执行埋点

```
gather.track(EventName, EventData);
// todo
```

```
gather.track(EventName, EventData, function() {
  // todo
});
```

```
async function() {
  await gather.track(EventName, EventData);
  // todo
}
```

如需同步执行（事件埋点执行完后在执行其它逻辑）可使用 CallBack 或者 async/await 两种方式

| 字段 | 类型 | 是否比填 | 默认值 | 说明 |
| --   | --  |--       | --   | -- |
| EventName | String | 是 | - | 事件名称 |
| EventData | Object | 否 | Null | 事件参数 |

#### 小程序配置

在 app.json 配置全局组件

```
{
  ...
  usingComponents: {
    "gather": "site-gather/gather"
  }
}
```

#### 数据采集
在需要数据采集的页面中配置

html 标签模式
```
<view>
  <gather/>
</view>
```

javascript 自行配置 （推荐 html 模式）
```

const gather = require('site-gather');

Page({
  onLoad() {
    gather.pageOpen(); // 页面打开
  },
  // 可通过停留监测来计算页面销毁时间
  onUnload () {
    gather.pageClose(); // 页面销毁
  }
})
```

#### 监听 App 打开

```
gather.appOpen()
```
#### 监听 App 退出

```
gather.appClose();
```