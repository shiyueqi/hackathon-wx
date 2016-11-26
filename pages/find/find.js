//find.js
var util = require('../../utils/util.js')
Page({
  data: {
    navTab: ["活动", "问答", "文章"],
    currentNavtab: "0",
    imgUrls: [
      '../../image/unionpay.jpg',
      '../../image/training.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    feed: [],
    feed_length: 0,
    list: [],

    bloglist: [],

    qalist:[],

    pageNum: 1,
    pageSize: 5,
    qapageNum:1,
    qapageSize:5 
  },
  onLoad: function () {
        wx.request({
        url: 'http://news-at.zhihu.com/api/4/themes',
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log(res.data.others)
          that.setData({
            bloglist: res.data.others
          })
        }
      })
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    this.refresh0();
  },
  switchTab: function(e){
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },

  bindActTap: function(event) {
    var contentId = event.target.dataset.contentid;
    console.log(contentId)
    wx.navigateTo({
      url: '../actDetail/actDetail?contentId='+contentId
    })
  },
  bindQueTap: function(event) {
    var contentId = event.target.dataset.contentid;
    console.log(contentId)    
    wx.navigateTo({
      url: '../questionDetail/questionDetail?contentId='+contentId
    })
  },
  upper: function () {
    wx.showNavigationBarLoading()
    this.refresh0();
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

  //网络请求数据, 实现刷新
  refresh0: function(){
    var that = this;
    wx.request({
      url: 'http://172.21.101.175:11000/uplus/activity/activities',
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
          list: res.data.contents
      });
      }
    })

    wx.request({
      url: 'http://172.21.101.175:11000/uplus/qa/qas',
      data: {
        page: this.data.qapageNum ,
        pageSize: this.data.qapageSize
      },
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data.contents);
          that.setData({
          qalist: res.data.contents
      });
      }
    })    
  },

  //使用本地 fake 数据实现刷新效果
  refresh: function(){
    var feed = util.getDiscovery();
    console.log("loaddata");
    var feed_data = feed.data;
    this.setData({
      feed:feed_data,
      feed_length: feed_data.length
    });
  },

  //使用本地 fake 数据实现继续加载效果
  nextLoad: function(){
    var next = util.discoveryNext();
    console.log("continueload");
    var next_data = next.data;
    this.setData({
      feed: this.data.feed.concat(next_data),
      feed_length: this.data.feed_length + next_data.length
    });
  }
});
