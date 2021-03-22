# site-gather

站点数据采集

### Install

`$ yarn add @fengqiaogang/site-gather`
`$ npm install @fengqiaogang/site-gather`


### 引入 SDK

```
const gather = require('@fengqiaogang/site-gather');
```
```
import gather from '@fengqiaogang/site-gather';
```

### 配置初始化参数

```
gather.setOption(Option);
```

#### Option [setOption方法参数]

| 字段 | 类型 | 是否比填 | 默认值 | 说明 |
| --   | --  |--       | --   | -- |
| name | String | 否 | Null | 项目名称 |
| id | String | 否 | Null | 项目 ID |
| secret | String | 否 | Null | 项目密钥 |
| server_url | String | 是 | - | 数据上报地址 |
| track | String | 否 | "/site/track" | 事件上报路径 |
| open | String | 否 | "/site/open" | 页面响应上报路径 |
| visit | String | 否 | "/site/visit" | 页面停留上报路径 |
| close | String | 否 | "/site/close" | 页面关闭上报路径 |

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