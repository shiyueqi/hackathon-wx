//index.js
//获取应用实例
// var app = getApp()
// var utils = require('../../utils/util.js')
// Page({
//   data: {
//     list: [],
//     duration: 2000,
//     indicatorDots: true,
//     autoplay: true,
//     interval: 3000,
//     loading: false,
//     plain: false,
//     actionSheetItems: ["状态","活动","文章","签到","问题"],
//     actionSheetHidden: true,
    
//   },
//   //事件处理函数
//   bindViewTap(e) {
//     wx.navigateTo({
//       url: '../detail/detail?id=' + e.target.dataset.id
//     })
//   },
//   loadMore (e) {
//     if (this.data.list.length === 0) return
//     var date = this.getNextDate()
//     var that = this
//     that.setData({ loading: true })
//     wx.request({
//       url: 'http://news.at.zhihu.com/api/4/news/before/' + (Number(utils.formatDate(date)) + 1),
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       success (res) {
//          that.setData({
//            loading: false,
//            list: that.data.list.concat([{ header: utils.formatDate(date, '-') }]).concat(res.data.stories)
//          })
//       }
//     })
//   },
//   getNextDate (){
//     const now = new Date()
//     now.setDate(now.getDate() - this.index++)
//     return now
//   },
//   actionSheetChange: function(){
//     this.setData({
//       actionSheetHidden: !this.data.actionSheetHidden
//     })
//   },
//   actionSheetTap: function(){
//  this.setData({
//       actionSheetHidden: !this.data.actionSheetHidden
//     })
//   },
//   onLoad () {
//     let that = this
//     wx.request({
//       url: 'http://news-at.zhihu.com/api/4/news/latest',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       success (res) {
//          that.setData({
//            banner: res.data.top_stories,
//            list: [{ header: '状态' }].concat(res.data.stories)
//          })
//       }
//     })
//     this.index = 1
//     //调用应用实例的方法获取全局数据
//     // app.getUserInfo(function(userInfo){
//     //   //更新数据
//     //   that.setData({
//     //     userInfo:userInfo
//     //   })
//     // })
    
//   }
// })

//index.js

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
    actionSheetItems: ["状态","活动","文章","签到","问题"],
    actionSheetHidden: true,
    feed: [],
    feed_length: 0
  },
  //事件处理函数
  bindItemTap: function() {
    wx.navigateTo({
      url: '../answer/answer'
    })
  },
  bindQueTap: function() {
    wx.navigateTo({
      url: '../question/question'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    this.getData();
  },
  upper: function () {
    wx.showNavigationBarLoading()
    this.refresh();
    console.log("upper");
    setTimeout(function(){wx.hideNavigationBarLoading();wx.stopPullDownRefresh();}, 2000);
  },
  lower: function (e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function(){wx.hideNavigationBarLoading();that.nextLoad();}, 1000);
    console.log("lower")
  },
  //scroll: function (e) {
  //  console.log("scroll")
  //},

  //网络请求数据, 实现首页刷新
  refresh0: function(){
    var index_api = '';
    util.getData(index_api)
        .then(function(data){
          //this.setData({
          //
          //});
          console.log(data);
        });
  },

  //使用本地 fake 数据实现刷新效果
  getData: function(){
    var feed = util.getData2();
    console.log("loaddata");
    var feed_data = feed.data;
    this.setData({
      feed:feed_data,
      feed_length: feed_data.length
    });
  },
  refresh: function(){
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 3000
    });
    var feed = util.getData2();
    console.log("loaddata");
    var feed_data = feed.data;
    this.setData({
      feed:feed_data,
      feed_length: feed_data.length
    });
    setTimeout(function(){
      wx.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 2000
      })
    },3000)

  },

  //使用本地 fake 数据实现继续加载效果
  nextLoad: function(){
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
    setTimeout(function(){
      wx.showToast({
        title: '加载成功',
        icon: 'success',
        duration: 2000
      })
    },3000)
  },
   actionSheetChange: function(){
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  actionSheetTap: function(){
 this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  }


})
