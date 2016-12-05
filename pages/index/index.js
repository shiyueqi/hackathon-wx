var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    list: [],
    duration: 2000,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    loading: false,
    plain: false,
    actionSheetItems: [{ id: 1, content: "状态" }, { id: 2, content: "活动" }, { id: 3, content: "文章" }, { id: 4, content: "问题" }, { id: 5, content: "签到" }],
    actionSheetHidden: true,
    feed: [],
    feed_length: 0,
    modalHidden: true,
    content: [],
    pageNum: 1,
    pageSize: 5,
    searchInput: "",
    picTmp: ".",


  },
  //事件处理函数


  bindStateTap: function(event) {
    var contentId = event.target.dataset.contentid;
    wx.navigateTo({
      url: '../stateDetail/stateDetail?contentId='+ contentId

    })
  },
  test: function(e){
  this.setData({
    searchInput: e.detail.value,
    modalHidden: false
    
  })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    this.refresh0();
  },
  upper: function () {
    wx.showNavigationBarLoading();
    this.setData({
      pageNum: 1
    });
    this.refresh0();
    console.log("upper");
    setTimeout(function () { wx.hideNavigationBarLoading(); wx.stopPullDownRefresh(); }, 2000);
  },
  lower: function (e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function () { wx.hideNavigationBarLoading(); that.nextRefresh0(); }, 1000);
    console.log("lower")
  },
  //scroll: function (e) {
  //  console.log("scroll")
  //},

  //网络请求数据, 实现首页刷新
  refresh0: function () {
    var that = this;
    wx.request({
      url: 'http://172.21.101.175:11000/uplus/content/contents',
      data: {
        page: this.data.pageNum ,
        pageSize: this.data.pageSize
      },
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data.contents);
          that.setData({
          content: res.data.contents
      });
      }
    })
  },

  nextRefresh0:function () {
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    });
    that.setData({
      pageNum : that.data.pageNum+1
    });
    wx.request({
      url: 'http://172.21.101.175:11000/uplus/content/contents',
      data: {
        pageNum: this.data.pageNum ,
        pageSize: this.data.pageSize
      },
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        wx.hideToast();
        var newData = res.data.contents;
        if(newData.length == 0){
          wx.showToast({
            title: '已无更多状态',
            icon: 'success',
            duration: 1000
          });
        }else{
          wx.showToast({
            title: '加载成功',
            icon: 'success',
            duration: 1000
          });          
          console.log(newData);
          that.setData({
            content: that.data.content.concat(newData)
          });
        }
      }
    })    
  },

  //使用本地 fake 数据实现刷新效果
  getData: function () {
    var feed = util.getData2();
    console.log("loaddata");
    var feed_data = feed.data;
    this.setData({
      feed: feed_data,
      feed_length: feed_data.length
    });
  },
  refresh: function () {
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 3000
    });
    var feed = util.getData2();
    console.log("loaddata");
    var feed_data = feed.data;
    this.setData({
      feed: feed_data,
      feed_length: feed_data.length
    });
    setTimeout(function () {
      wx.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 2000
      })
    }, 3000)

  },

  //使用本地 fake 数据实现继续加载效果
  nextLoad: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 4000
    })
    var next = util.getNext();
    console.log("continueload");
    var next_data = next.data;
    this.setData({
      feed: this.data.feed.concat(next_data),
      feed_length: this.data.feed_length + next_data.length
    });
    setTimeout(function () {
      wx.showToast({
        title: '加载成功',
        icon: 'success',
        duration: 2000
      })
    }, 3000)
  },
  actionSheetChange: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  actionSheetTap: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  //跳转到发布状态的界面
  bind1: function(e){
    wx.navigateTo({
      url: '../statusPost/statusPost',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
,
//跳转活动发布界面
bind2: function(e){
      wx.navigateTo({
      url: '../activityPost/activityPost',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
},
//跳转文章发布界面
bind3: function(e){
      wx.navigateTo({
      url: '../blogPost/blogPost',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
},
bind4: function(e){
       wx.navigateTo({
      url: '../questionPost/questionPost',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
},
modalChange: function(e) {
    this.setData({
      modalHidden: true
    })
  },
bind5: function(e){
     wx.navigateTo({
      url: '../signPost/signPost',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
}
})
