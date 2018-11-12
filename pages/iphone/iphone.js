//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  formSubmit:function(e){
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
    //  提交姓名和号码是保存到本地
   
     if(e.detail.value.name=="" && e.detail.value.iphone==""){
         wx.showLoading({
           title: '请输入手机号码',
         })
        
     } else if (!myreg.test(e.detail.value.iphone) ){
         wx.showToast({
           title: '请输入正确的手机号码',
           icon:"none",
           duration:3000
         })
         

     }else {
        var content = e.detail.value

       wx.setStorage({
         key: 'name',
         data: content,
       })
       wx.navigateTo({
         url:'../news/news?id=1'
       })
     }
       
      
     
    
  }

})
