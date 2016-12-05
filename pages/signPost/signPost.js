var app = getApp()
Page( {
  data: {
    point:{
      // latitude: 23.114155,
      // longitude: 113.318977
      latitude: "",
      longitude:""

    },
    markers: [{
      latitude: "",
      longitude: "",
      name: '中国银联',
      desc: '我现在的位置'
    }],
    covers: [{
      latitude: "",
      longitude: "",
      iconPath: '../images/car.png',
      rotate: 10
    }]
  },
  onLoad: function() {
    console.log( '地图定位接口getLocation还不能正常获取用户位置！' )
    var that = this;
    wx.getLocation( {
      type: 'gcj02',
      success: function( res ) {
        console.log(res.latitude)
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy;
        var point={
             latitude: latitude,
             longitude: longitude
        }
        var markers = [ {
          latitude: latitude,
          longitude: longitude,
          name: '地图定位',
          desc: '我现在的位置'
        }];
        var covers = [ {
          latitude: latitude,
          longitude: longitude,
          name: '地图定位',
          desc: '我现在的位置'
        }];
        that.setData({
          markers: markers
        });
         that.setData({
            point: point
         } );
         that.setData({
           covers:  covers
         })
      }
    })
  }
})
