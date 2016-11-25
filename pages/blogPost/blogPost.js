

var app = getApp();

Page({

    data: {
     
            lines: [
                {id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10},{id:11}
            ],
    },
inputCancel: function(){
 console.log('form发生了reset事件')
},
inputDone: function(e){
console.log('form发生了submit事件')
console.log('form发生了submit事件，携带数据为：', e.detail.value)
},
formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function() {
    console.log('form发生了reset事件')
  }



    })
