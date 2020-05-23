Page({
  data: {
    rgb: 'rgb(7,193,96)',
    pick: false
  },
  toPick: function () {
    this.setData({
      pick: true
    })
  },
  pickColor(e) {
    let rgb = e.detail.color;
    this.setData({
      rgb
    })
    // 以下为rgb转hex的实例
    let hex = this.rgb2hex(rgb)
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: hex,
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
  },
  rgb2hex: function (color) {
    let rgb = color.split(',');
    let r = parseInt(rgb[0].split('(')[1]);
    let g = parseInt(rgb[1]);
    let b = parseInt(rgb[2].split(')')[0]);
    let hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
  },

  toCopy:function() {
    wx.setClipboardData({
      data: 'https://github.com/MakerGYT/mini-color-picker'
    })
  },
  onShareAppMessage:function() {
    return {
      title: 'color-picker调色盘'
    }
  }
})