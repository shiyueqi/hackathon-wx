var app = getApp()
Page({
  data: {
    lastid: 0,
    newsList: [],
    toastHidden: true,
    modalHidden: true,
    isfirst: 1,
  
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  loadData: function (lastid) {
    var that = this
    // that.setData({
    //   loadhidden: true
    // })
    wx.request({
      url: 'http://127.0.0.1:8000/items/?limit=2',
      data: {
        'offset': lastid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.results.length == 0) {
          that.setData({
            toastHidden: false
          })
          return false
        }
        var len = res.data.results.length
        that.setData({
          lastid: res.data.results[len - 2].id
        })
        var dataArr = that.data.newsList
        var newData = dataArr.concat(res.data.results)
        console.log(res.data.next)
        that.setData({
          newsList: newData
        })
      },
      complete: function(){
       
      }
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    this.loadData(0)

  },
  loadmore: function (event) {
    var id = event.currentTarget.dataset.lastid
    var isfirst = event.currentTarget.dataset.isfirst
    console.log(isfirst)
    if (this.getNetwork != "wifi" && isfirst == 1) {
      this.setData({
        modalHidden: false,
        isfirst: 0
      })
   
    }
    
    console.log("ddddddddd" + id)
    this.loadData(id)
  },
  toastChange: function () {
    this.setData({
      toastHidden: true
    })
  }
  ,
  getNetwork: function () {
    wx.getNetworkType({
      success: function (res) {
        var networkType = res.networkType // 返回网络类型2g，3g，4g，wifi
        return networkType
      }
    })
  },
  modalChange: function () {
    this.setData({
      modalHidden: true
    })
  }
})