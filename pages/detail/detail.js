var app = getApp()
Page({
  data: {
    info:  {id:1,title:"aaaa",img:"../../image/1.png",cTime:"2016-09-26 21:40",content:"内容一"}

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    console.log('onLoad')
    var id = options.id
    console.log(id)
    var that = this
    //调用应用实例的方法获取全局数据
    wx.request({
  url: 'http://localhost:8000/items/'+id, //仅为示例，并非真实的接口地址
  data: {
    
  },
  header: {
      'content-type': 'application/json'
  },
  success: function(res) {
    console.log(res.data)
       that.setData({
        info:res.data
      })
  }
})
  
  }

})