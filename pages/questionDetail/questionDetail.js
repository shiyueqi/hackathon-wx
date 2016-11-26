//questionDetail.js
var util = require('../../utils/util.js')

var app = getApp()
Page({
  data: {
    motto: '',
    userInfo: {},
    pageNum: 1,
    pageSize: 5,
    hidden: "none",
    content: [],
    comment: [], 
    praiseCount: '',
    
    names: ["技术", "生活", "工作", "情感", "杂谈"],
    array: [{ id: 31, name: '技术' }, { id: 32, name: "生活" }, { id: 33, name: "工作" }, {
      id: 34, name: "情感"
    }, { id: 35, name: "杂谈" }
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
          praiseCount: res.data.praiseCount,
          tag:that.getNamebyId(res.data.typeSub)          
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
  writeComment: function(){
console.log("hello")
var that = this
that.setData({hidden: "inline"})
  },
  formSubmit: function(e){
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
          });
          that.getComments()
          
        }
      }
    })
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  tapName: function(event){
    console.log(event)
  }
})
