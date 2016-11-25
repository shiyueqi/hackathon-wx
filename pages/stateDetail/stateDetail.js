//stateDetail.js
var util = require('../../utils/util.js')

var app = getApp()
Page({
  data: {
    motto: '',
    userInfo: {},
    contentId: ''
  },
  //事件处理函数
  bindItemTap: function () {
    wx.navigateTo({
      url: '../answer/answer'
    })
  },
  onLoad: function (options) {
    console.log('onLoad')
    console.log(options.contentId)
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
        contentId: options.contentId
      })
    })
  },
   writeComment: function () {
    console.log("hello")

  },
  tapName: function (event) {
    console.log(event)
  },

})
