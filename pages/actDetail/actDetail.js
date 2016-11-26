//actDetail.js
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
    praiseCount: '',
    activityUsersCount: '',
    disabled: false,
    activityUsers: [],
    modalHidden: true,

    names: ["骑行", "桌游", "游泳", "足球", "DOAT"],
    array: [{ id: 21, name: '骑行' }, { id: 22, name: "桌游" }, { id: 23, name: "游泳" }, {
      id: 24, name: "足球"
    }, { id: 25, name: "DOAT" }
    ],
    tag:''
  },

  getNamebyId:function (id){
    for (var i = 0, l = this.data.array.length; i < l; i++) {
      for (var key in this.data.array[i]) {
        if (this.data.array[i][key] === id) {
          return this.data.array[i].name
        }
      }
    }    
  },
  doPraise: function () {
    var that = this;
    wx.request({
      url: 'http://172.21.101.175:11000/uplus/activity/' + that.data.contentId,
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
            praiseCount: that.data.praiseCount + 1
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
      url: 'http://172.21.101.175:11000/uplus/activity/' + that.data.contentId,
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          content: res.data,
          praiseCount: res.data.praiseCount,
          activityUsersCount: res.data.activityUsersCount,
          tag:that.getNamebyId(res.data.typeSub)
        });
      }
    })

    wx.request({
      url: 'http://172.21.101.175:11000/uplus/comments/content/' + that.data.contentId,
      data: {
        pageNum: this.data.pageNum,
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

  joinAct: function () {
    var that = this
    wx.request({
      url: 'http://172.21.101.175:11000/uplus/activity/' + this.data.contentId + '/newreg',
      method: 'POST',
      data: util.json2Form({
        userId: "1",

      }),
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.code == 1) {
          that.setData({
            activityUsersCount: that.data.activityUsersCount+1
          });
          wx.showToast({
            title: '报名成功',
            icon: 'success',
            duration: 2000
          });
          this.setData({
            disabled: true
          })
        }

      }
    })
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
        }
      }
    })
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
   modalChange: function(e) {
    this.setData({
      modalHidden: true
    })
  },
  getJoined: function(){
    var that = this
    wx.request({
  url: 'http://172.21.101.175:11000/uplus/activity/'+that.data.contentId, //仅为示例，并非真实的接口地址
  data: {
    
  },
  header: {
      'content-type': 'application/json'
  },
  success: function(res) {
    that.setData({
      activityUsers: res.data.activityUsers
    })
    
    console.log(this.activityUsers)
  }
}),
    this.setData({modalHidden: false})
  }
})
