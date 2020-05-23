# mini-color-picker

> 小程序拾色器（颜色选择器）组件,以rgb为数据格式

[![](https://img.shields.io/npm/v/mini-color-picker.svg)](https://www.npmjs.com/package/mini-color-picker/)

**对比**:

- [we-color-picker](https://github.com/KirisakiAria/we-color-picker)
需注意组件定位，操作[不跟手不流畅](https://developers.weixin.qq.com/community/develop/doc/00084ae5e400a8ae58e78263553c06#0006ae9d7c0ea05fe298cc59e514),配置复杂。其定位会撑开原有页面，体验不佳。滑动距离按像素区分(固定)，需考虑设备分辨率，不利于多端。
- [PapaerPen](https://www.jianshu.com/p/989b580168cd)
利用原有slider组件实现滑动选取，不限于设备分辨率。但需三次操作。

**特性**:

本组件利用官方提供的slider实现选择色相，movable-view选择饱和度和明度，由于是官方基础组件，操作顺畅。在滑动区域的设定上，使用占比来影响色值变化，无需考虑rpx转换。在操作流程上，限于手机操作区域，不能使用Popover，使用底部拉起弹窗，不影响原有页面，[重点突出](https://developers.weixin.qq.com/miniprogram/design/#%E9%87%8D%E7%82%B9%E7%AA%81%E5%87%BA)。在操作预览上，由于弹窗遮罩不可避免无法实时预览，采用色相滑块的颜色来实现预览。同时考虑了iphone-x的安全区域问题。

**注意**:

外部与组件通信的数据格式是rgb,为了避免引入多种数据格式而导致代码冗余，开发者可自行按需转换，参考
- [rgb->16进制](#rgb2hex)
- [rgb->hsv](#rgb2hsv)
- [rgb->cmyk](#rgb2cmyk)
- [hex->rgb](#hex2rgb)
- [hsv->rgb](#hsv2rgb)

## 截图示例

![mini-color-picker](https://imgkr.cn-bj.ufileos.com/b136c18d-9142-4476-8779-cb0a34fa7bef.png)
![mini-color-picker](https://imgkr.cn-bj.ufileos.com/dcb57311-2305-4f47-b8f8-4cdf3e824c9e.gif)
## 安装使用
### 1. 获取组件
#### git
可能不稳定，但包含最新功能更新
```
git clone https://github.com/MakerGYT/mini-color-picker.git
```
将项目中components/color-picker文件夹拷贝到组件路径下
#### npm
稳定
```
npm install mini-color-picker --save
```
使用npm包请参考[微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)

### 2. 引入组件
在使用该组件的页面对应json文件中添加：
```json
{
  "usingComponents": {
    "color-picker":"/components/color-picker/color-picker" 
  }
}
```
如使用npm,
点击开发者工具中的菜单栏：工具 --> 构建 npm;
勾选“使用 npm 模块”选项
```json
{
  "usingComponents": {
    "color-picker":"mini-color-picker/color-picker" 
  }
}
```

### 3. 使用组件
参考[/pages](https://github.com/makergyt/mini-color-picker/tree/master/demo/pages/index)
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

## License
[MIT](https://github.com/MakerGYT/mini-color-picker/blob/master/LICENSE) © MakerGYT
## 附
1. <span id="rgb2hex">rgb -> hex</span>
```js
/**
 * @param {String} color:'rgb(255,0,0)'
 * @return {String} hex:'#000' 
 */
const rgb2hex = (color) => {
  let rgb = color.split(',');
  let R = parseInt(rgb[0].split('(')[1]);
  let G = parseInt(rgb[1]);
  let B = parseInt(rgb[2].split(')')[0]);
  let hex = "#" + ((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1);
  return hex;
},
```
2. <span id="rgb2hsv">rgb -> hsv</span>
```js
/**
 * @param {String} color:'rgb(255,0,0)' 
 * @return {Object} {h(°),s(%),v(%)}
 */
const rgb2hsv = (color) => {
  let rgb = color.split(',');
  let R = parseInt(rgb[0].split('(')[1]);
  let G = parseInt(rgb[1]);
  let B = parseInt(rgb[2].split(')')[0]);

  let hsv_red = R / 255,hsv_green = G / 255,hsv_blue = B / 255;
  let hsv_max = Math.max(hsv_red, hsv_green, hsv_blue),
    hsv_min = Math.min(hsv_red, hsv_green, hsv_blue);
  let hsv_h, hsv_s, hsv_v = hsv_max;

  let hsv_d = hsv_max - hsv_min;
  hsv_s = hsv_max == 0 ? 0 : hsv_d / hsv_max;

  if (hsv_max == hsv_min) hsv_h = 0;
  else {
    switch (hsv_max) {
      case hsv_red:
        hsv_h = (hsv_green - hsv_blue) / hsv_d + (hsv_green < hsv_blue ? 6 : 0);
        break;
      case hsv_green:
        hsv_h = (hsv_blue - hsv_red) / hsv_d + 2;
        break;
      case hsv_blue:
        hsv_h = (hsv_red - hsv_green) / hsv_d + 4;
        break;
    }
    hsv_h /= 6;
  }
  return {
    h: (hsv_h * 360).toFixed(),
    s: (hsv_s * 100).toFixed(),
    v: (hsv_v * 100).toFixed()
  }
},
```
3. <span id="rgb2cmyk">rgb -> cmyk</span>
```js
/**
 * @param {String} color:'rgb(255,0,0)' 
 * @return {Object} {c(%),m(%),y(%),k(%)}
 */
const rgb2cmyk = (color)=> {
  let rgb = color.split(',');
  let R = parseInt(rgb[0].split('(')[1]);
  let G = parseInt(rgb[1]);
  let B = parseInt(rgb[2].split(')')[0]);

  if ((R == 0) && (G == 0) && (B == 0)) {
    return [0, 0, 0, 1];
  } else {
    let calcR = 1 - (R / 255),
      calcG = 1 - (G / 255),
      calcB = 1 - (B / 255);

    let K = Math.min(calcR, Math.min(calcG, calcB)),
      C = (calcR - K) / (1 - K),
      M = (calcG - K) / (1 - K),
      Y = (calcB - K) / (1 - K);
    return {
      c:(C*100).toFixed(),
      m:(M*100).toFixed(),
      y:(Y*100).toFixed(),
      k:(K*100).toFixed()
    }
  }
}
```
4. <span id="hex2rgb">hex -> rgb</span>
```js
/**
 * @param {String} hex:'#888888' 
 * @return {String} 'rgb(255,0,0)'
 */
const hex2rgb = (hex) => {
  if (hex.length === 4) {
    let hexNew = "#";
    for (var i = 1; i < 4; i += 1) {
      hexNew += hex.slice(i, i + 1).concat(hex.slice(i, i + 1));
    }
    hex = hexNew;
  }
  return "rgb(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + ")";
},
```
5. <span id="hsv2rgb">hsv -> rgb</span>
```js
/**
 * @param {Array} [h(°),s(%),v(%)]
 * @return {String} 'rgb(255,0,0)'
 */
const hsv2rgb = (h, s, v) => {
  let hsv_h = (h / 360).toFixed(2);
  let hsv_s = (s / 100).toFixed(2);
  let hsv_v = (v / 100).toFixed(2);

  let i = Math.floor(hsv_h * 6);
  let f = hsv_h * 6 - i;
  let p = hsv_v * (1 - hsv_s);
  let q = hsv_v * (1 - f * hsv_s);
  let t = hsv_v * (1 - (1 - f) * hsv_s);

  let rgb_r = 0,
    rgb_g = 0,
    rgb_b = 0;
  switch (i % 6) {
    case 0:
      rgb_r = hsv_v;
      rgb_g = t;
      rgb_b = p;
      break;
    case 1:
      rgb_r = q;
      rgb_g = hsv_v;
      rgb_b = p;
      break;
    case 2:
      rgb_r = p;
      rgb_g = hsv_v;
      rgb_b = t;
      break;
    case 3:
      rgb_r = p;
      rgb_g = q;
      rgb_b = hsv_v;
      break;
    case 4:
      rgb_r = t;
      rgb_g = p;
      rgb_b = hsv_v;
      break;
    case 5:
      rgb_r = hsv_v, rgb_g = p, rgb_b = q;
      break;
  }

  return 'rgb(' + (Math.floor(rgb_r * 255) + "," + Math.floor(rgb_g * 255) + "," + Math.floor(rgb_b * 255)) + ')';
},
```