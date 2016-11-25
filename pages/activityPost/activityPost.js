Page({
    data: {
      title: "",
      conten: ""
    },
//提交活动内容
  formSubmit: function(e) {
      var that = this
      this.setData({
          title: e.detail.value.title,
          content: e.detail.value.content
      })
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log('form发生了submit事件，携带数据为1：', this.data.title)
    console.log('form发生了submit事件，携带数据为2：', this.data.content)
     
  },
  formReset: function() {
    console.log('form发生了reset事件')
  }
})