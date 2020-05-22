Page({
  data:{
    rgb: 'rgb(0,154,97)',
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
  },
})