# mini-color-picker

小程序拾色器（颜色选择器）组件,通过rgb作为数据格式

[![](https://img.shields.io/npm/v/mini-color-picker.svg)](https://www.npmjs.com/package/mini-color-picker/)

## 截图示例

![mini-color-picker](https://imgkr.cn-bj.ufileos.com/b136c18d-9142-4476-8779-cb0a34fa7bef.png)

## 安装使用
### 获取组件
#### git

```
git clone https://github.com/MakerGYT/mini-color-picker.git
```
将项目中components/color-picker文件夹拷贝到组件路径下
#### npm

```
npm install mini-color-picker --save
```
使用npm包请参考[微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)

### 引入组件
在使用该组件的页面对应json文件中添加：
```json
"usingComponents": {
  "color-picker":"/components/color-picker/color-picker" // npm => mini-color-picker/color-picker
}
```
### 使用组件
参考[/pages](https://github.com/makergyt/mini-color-picker/tree/master/pages)
```html
<!-- index.wxml -->
<view style="background:{{rgb}};width:100px;height:24px;" bindtap="toPick"></view>
<color-picker bindchangeColor="pickColor" initColor="{{rgb}}" show="{{pick}}" />
```
```js
Page({
  data:{
    rgb: 'rgb(0,154,97)',//初始值
    pick: false
  },
  // 显示取色器
  toPick: function () {
    this.setData({
      pick: true
    })
  },
  //取色结果回调
  pickColor(e) {
    let rgb = e.detail.color;
  },
}) 
```
## 属性列表
| 属性 |类型| 默认值|必填|说明|
| -- | --|--|--|--|
| show | Boolean | false | 是 |是否显示 |
|initColor| String | rgb(255,0,0)| 是　|初始色,rgb表示|
|mask | Boolean |true | 否 |是否显示背景蒙层|
| maskClosable | Boolean | false | 否 |点击背景蒙层是否可以关闭 |
|bindchangeColor|eventhandler| | 否 | 取色后的回调,event.detail = {color} |
|bindclose|eventhandler||否| 点击背景蒙层关闭掉color-picker后触发的事件|