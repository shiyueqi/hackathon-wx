Page({
    data: {
      title: "",
      conten: "",
       lines: [
                {id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10},{id:11}
            ],
    },
//提交活动内容
  formSubmit: function(e) {
      var that = this
      this.setData({
          title: e.detail.value.title,
          content: e.detail.value.content
      })
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    // console.log('form发生了submit事件，携带数据为1：', this.data.title)
    // console.log('form发生了submit事件，携带数据为2：', this.data.content)
     
  },
  formReset: function() {
    console.log('form发生了reset事件')
  }
})