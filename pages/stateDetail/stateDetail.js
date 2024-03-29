//stateDetail.js
var util = require('../../utils/util.js')

var app = getApp()
Page({
  data: {
    motto: '',
    userInfo: {},
    contentId: '',
    pageNum: 1,
    pageSize: 5,

    content: [],
    comment: [],
    hidden: "none",
    comment: "",
    flag: false,
    praiseImg: '../../image/praise_normal.png',
    praiseCount: ''

  },
  doPraise: function () {
    var that = this;
    wx.request({
      url: 'http://172.21.101.175:11000/uplus/content/' + that.data.contentId,
      method: 'post',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.code == 1) {
          that.setData({
            praiseCount: that.data.praiseCount+1
          });
        }
      }
    })
    this.setData({
      praiseImg: '../../image/praise_pressed.png'
    })
  },
  //事件处理函数
  bindItemTap: function () {
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
      url: 'http://172.21.101.175:11000/uplus/content/' + that.data.contentId,
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
  writeComment: function () {
    console.log("hello")
    this.setData({
      hidden: "inline"
    })

  },
  tapName: function (event) {
    console.log(event)
  },
  formSubmit: function (e) {
    var that = this
    console.log(this.data.contentId)
    // that.getComments()
    wx.request({
      url: 'http://172.21.101.175:11000/uplus/comments/content/' + that.data.contentId,
      data: util.json2Form({
        userId: '1',
        comment: e.detail.value.comment

      }),
      method: "POST",
      header: {
        'Content-Type': "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.code == "1") {
          that.setData({
            flag: true,
            hidden: "none"

          })
          that.getComments()
        }
        
      }
    })
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function () {
    console.log('form发生了reset事件')
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
  }
})
