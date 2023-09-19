import bus from "@/utils/Bus";
//import Vue from 'vue'
let socket = {};
let lockReconnet = {}; //避免重复连接
let wsUrl = {};
let socketData = []
let isReconnet = [];
let globalCallback = [], sendData = []; //把要发送给socket的数据和处理socket返回数据的回调保存起来
let createSocket = (url, type) => {  //创建socket
  if (socket[type]) return
  try {
    if ('WebSocket' in window) {
      socket[type] = new WebSocket(url)
    } else if ('MozWebSocket' in window) {
      socket[type] = new MozWebSocket(url)
    }
    //Vue.prototype.socket = socket //需要主动关闭的话就可以直接调用this.socket.close()进行关闭，不需要的话这个可以去掉
    wsUrl[type] = url
    initSocket(type)
  } catch (e) {
    reconnet(url, type)
  }
}
let sendMsg = (data, type, callback) => {  //发送数据,接收数据
  if (socket[type].readyState === 1) {
    globalCallback[type] = callback;
    sendData[type] = data;
    data = JSON.stringify(data);
    socket[type].send(data);
  } else {
    setTimeout(() => {
      sendMsg(data, type, callback)
    }, 1500)
    return false
  }
  socket[type].onmessage = ev => {
    callback && callback(ev)
  }
}
let initSocket = (type) => { // 初始化websocket
  socket[type].onopen = () => {
    heartCheck.start(type)
    console.log(`${type}Socket连接成功`)
    if (isReconnet[type]) { // 执行全局回调函数
      sendMsg(sendData[type], globalCallback[type])
      isReconnet[type] = false
    }
  }
  socket[type].onmessage = (ev) => {
    heartCheck.reset(type).start(type)
    if (ev.data === 'check heart') return
    if (type === 'wish') {
      bus.$emit('wish', JSON.parse(ev.data))
    }
    if (type === 'wish' && JSON.parse(ev.data).type === 1) {
      bus.$emit('redPack', JSON.parse(ev.data))
    }
    // 红包雨
    if (type === 'drop' && JSON.parse(ev.data).msgType === 3) {
      bus.$emit('redPack', JSON.parse(ev.data))
    }
    // 邀请用户
    if (type === 'drop' && JSON.parse(ev.data).msgType === 1) {
      bus.$emit('invite', JSON.parse(ev.data))
    }
    // 额外掉落
    if (type === 'drop' && JSON.parse(ev.data).msgType === 0) {
      socketData[type] = JSON.parse(ev.data)
    }
    // 升级实时数据
    if (type === 'upgrade' ) {
      bus.$emit('upgrade', JSON.parse(ev.data))
    }
  }

  socket[type].onerror = () => {
    console.log(`${type}socket服务出错了---onerror`);
    setTimeout(() => {
      reconnet(wsUrl[type], type)
    }, 3000)
  }

  socket[type].onclose = (e) => {
    console.log(`${type}websocket服务关闭了+++onclose${e.code}:+ ${e.reason}: ${e.wasClean}`);
    setTimeout(() => {
      reconnet(wsUrl[type], type)
    }, 3000)
  }
}
let reconnet = (url, type) => { //重新连接websock函数
  if (lockReconnet[type])
    return false
  isReconnet[type] = true;
  lockReconnet[type] = true
  setTimeout(() => {
    createSocket(url, type)
    lockReconnet[type] = false
  }, 2000)
}
let heartCheck = { //心跳检测
  timeout: 50 * 1000,
  timeoutObj: {},
  serverTimeoutObj: {},
  reset(type) {
    clearTimeout(this.timeoutObj[type])
    clearTimeout(this.serverTimeoutObj[type])
    return this;
  },
  start(type) {
    let that = this;
    this.timeoutObj[type] = setTimeout(() => {
      //发送数据，如果onmessage能接收到数据，表示连接正常,然后在onmessage里面执行reset方法清除定时器
      if (socket[type].readyState === 1) {
        socket[type].send('heart check')
      } else {
        this.serverTimeoutObj[type] = setTimeout(() => {
          socket[type].close()
        }, that.timeout)
      }

    }, this.timeout)
  }
}

export {sendMsg, createSocket, socketData}
