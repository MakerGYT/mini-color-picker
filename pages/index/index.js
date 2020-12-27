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
    this.setData({
      rgb: e.detail.color
    })
  },
  toMore() {
    wx.navigateToMiniProgram({
      appId: 'wx56ff4f457b23ebd1',
    })
  }
})