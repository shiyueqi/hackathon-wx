//abouteme.js
//获取应用实例
var app = getApp()
Page({
  data: {
    img: '../../image/green_tri.png',
    title: "中国银联",
    intro: '中国银联是中国银行卡联合组织，通过银联跨行交易清算系统，实现商业银行系统间的互联互通和资源共享，保证银行卡跨行、跨地区和跨境的使用。中国银联已与境内外数百家机构展开广泛合作，银联网络遍布中国城乡，并已延伸至亚洲、欧洲、美洲、大洋洲、非洲等160个国家和地区',
    contact: '联系方式',
    address: '地址：中国上海市浦东新区含笑路36号银联大厦',
    phone: '电话：(+86)21-68401888',
    code: '邮编：200135'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  sayHello: function(){
    wx.showToast({
  title: '成功',
  icon: 'success',
  duration: 2000
})
  }
})
