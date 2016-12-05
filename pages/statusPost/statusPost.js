var sourceType = [['camera'], ['album'], ['camera', 'album']]
var sizeType = [['compressed'], ['original'], ['compressed', 'original']]
var Util = require('../../utils/util.js')
Page({
  data: {
    statusContent:"",
    sourceTypeIndex: 2,
    sourceType: ['拍照', '相册', '拍照或相册'],

    sizeTypeIndex: 2,
    sizeType: ['压缩', '原图', '压缩或原图'],
    uploadImgSrc: "",

    countIndex: 8,
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    lines: [
      { id: 1 }, { id: 2 }, { id: 3 }
    ],
    toast2Hidden: true
  },
  sourceTypeChange: function (e) {
    this.setData({
      sourceTypeIndex: e.detail.value
    })
  },
  sizeTypeChange: function (e) {
    this.setData({
      sizeTypeIndex: e.detail.value
    })
  },
  countChange: function (e) {
    this.setData({
      countIndex: e.detail.value
    })
  },
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      sourceType: sourceType[this.data.sourceTypeIndex],
      sizeType: sizeType[this.data.sizeTypeIndex],
      count: this.data.count[this.data.countIndex],
      success: function (res) {
        console.log(res)
        console.log(res.tempFilePaths[0])
        that.setData({
          imageList: res.tempFilePaths,
          uploadImgSrc: res.tempFilePaths[0]

        })
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  //条件状态
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)

    wx.request({
      url: 'http://172.21.101.175:11000/uplus/content',
      data: Util.json2Form({
        userId: '1',
        content: e.detail.value.input,
        pics: ''
      }),
      header: {
        'Content-Type': "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        if (res.data.code == 1) {
          wx.navigateTo({
            url: '../index/index'
          })
        }
        console.log(res.data)
      }
    })
  },
  formReset: function (e) {

  },
 
})


