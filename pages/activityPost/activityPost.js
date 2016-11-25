var util = require('../../utils/util.js')

Page({
  data: {
    title: "",
    conten: "",
    activityname: "",
    lines: [
      { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }, { id: 11 }
    ],
    names: ["骑行", "桌游","游泳", "足球","DOAT"],
    array: [{ id: 21, name: '骑行' }, { id: 22, name: "桌游" }, { id: 23, name: "游泳" }, {
      id: 24, name: "足球"
    }, { id: 25, name: "DOAT" }
    ],
    id: ""
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', this.data.names[e.detail.value])
    this.setData({
      activityname: this.data.names[e.detail.value]
    })
  },
  getActivityId: function(name){
    for(var i=0,l=this.data.array.length;i<l;i++){
for(var key in this.data.array[i]){
   if(this.data.array[i][key]===name){
     return this.data.array[i].id
   }
}
}
  },
  //提交活动内容
  formSubmit: function (e) {
    var that = this
    var id = this.getActivityId(this.data.activityname)
    this.setData({
      title: e.detail.value.title,
      content: e.detail.value.content,
      id: id
    })
    console.log(id)
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
   wx.request({
  url: 'http://172.21.101.175:11000/uplus/activity',
  data: util.json2Form({
    userId: "1",
    title:  e.detail.value.title,
    content:  e.detail.value.content,
    typeSub: id
  }),
  method: "POST",
  header: {
      'Content-Type': "application/x-www-form-urlencoded"
  },
  success: function(res) {
    console.log(res.data)
  }
})

  },
  formReset: function () {
    console.log('form发生了reset事件')
  }
})