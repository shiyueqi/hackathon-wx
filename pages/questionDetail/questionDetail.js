//questionDetail.js
var util = require('../../utils/util.js')

var app = getApp()
Page({
  data: {
    motto: '',
    userInfo: {},
    pageNum: 1,
    pageSize: 5,

    content: [],
    comment: [], 
    praiseCount: ''   
  },
  //事件处理函数
  bindItemTap: function() {
    wx.navigateTo({
      url: '../answer/answer'
    })
  },
  onLoad: function (options) {
    console.log('onLoad')
    var that = this
   
    that.setData({
      contentId: options.contentId
    });

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })

    wx.request({
      url: 'http://172.21.101.175:11000/uplus/qa/' + that.data.contentId,
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          content: res.data,
          praiseCount: res.data.praiseCount
        });
      }
    })
this.getComments()
    // wx.request({
    //   url: 'http://172.21.101.175:11000/uplus/comments/content/' + that.data.contentId,
    //   data: {
    //     page: this.data.pageNum,
    //     pageSize: this.data.pageSize
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log(res.data.comments);
    //     that.setData({
    //       comment: res.data.comments
    //     });
    //   }
    // })
  },
    getComments: function(){
    var that = this
        wx.request({
      url: 'http://172.21.101.175:11000/uplus/comments/content/' + that.data.contentId,
      data: {
        page: this.data.pageNum,
        pageSize: this.data.pageSize
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.comments);
        that.setData({
          comment: res.data.comments
        });
      }
    })
  },
  tapName: function(event){
    console.log(event)
  }
})
