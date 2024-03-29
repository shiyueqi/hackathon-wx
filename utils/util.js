function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function formatDate(date, split) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join(split || '')
}


function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate
}

var index = require('../data/data_index.js')
var index_next = require('../data/data_index_next.js')
var discovery = require('../data/data_discovery.js')
var discovery_next = require('../data/data_discovery_next.js')

function getData(url){
  return new Promise(function(resolve, reject){
    wx.request({
      url: url,
      data: {},
      header: {
        //'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log("success")
        resolve(res)
      },
      fail: function (res) {
        reject(res)
        console.log("failed")
      }
    })
  })
}

function getData2(){
  return index.index;
}

function getNext(){
  return index_next.next;
}

function getDiscovery(){
  return discovery.discovery;
}

function discoveryNext(){
  return discovery_next.next;
}
function encodeURIStr(str){ 
    var regexs = new Array(new RegExp(',', 'g'), 
                      new RegExp('/', 'g'), 
                      new RegExp('\?', 'g'), 
                      new RegExp(':', 'g'), 
                      new RegExp('@', 'g'), 
                      new RegExp('&', 'g'), 
                      new RegExp('=', 'g'), 
                      new RegExp('\+', 'g'), 
                      new RegExp('\$', 'g'), 
                      new RegExp('#', 'g') 
      ); 
    var replaces = new Array('%2C','%2F','%3F','%3A','%40','%26','%3D','%2B','%24','%23'); 
    for (var i = 0; i < regexs.length; i++){ 
        str = str.replace(regexs[i], replaces[i]); 
    } 
    return str; 
}
function json2Form(json) {  
    var str = [];  
    for(var p in json){  
        str.push(encodeURIComponent(encodeURIComponent(p)) + "=" + encodeURIComponent(encodeURIComponent(json[p])));  
    }  
    return str.join("&");  
}  
module.exports.json2Form = json2Form;  

module.exports.getData = getData;
module.exports.getData2 = getData2;
module.exports.getNext = getNext;
module.exports.getDiscovery = getDiscovery;
module.exports.discoveryNext = discoveryNext;
