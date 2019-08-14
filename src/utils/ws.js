const WS_BASE = 'ws://zh.84000.com.cn:27888/bimp-base-bigData/'

class WS {
    constructor (path, cb) {
        this.path = path
        this.cb = cb
    }

    initWebSocket() { //初始化weosocket 
        this.websock = new WebSocket(WS_BASE + this.path)
        this.websock.onopen = this.websocketonopen
        this.websock.onerror = this.websocketonerror
        this.websock.onmessage = this.websocketonmessage.bind(this)
        this.websock.onclose = this.websocketcloserestart.bind(this)
    }

    websocketonopen() {
        console.log("WebSocket连接成功")
　　}

    //错误
    websocketonerror(e) {
        console.log("WebSocket连接发生错误")
    }

    //数据接收
    websocketonmessage(e) {
        const redata = JSON.parse(e.data)
        this.cb(redata)
    }

    //数据发送 
    websocketsend(agentData) {
        this.websock.send(agentData)
    }

    //意外关闭重连
    websocketcloserestart(e) {
        console.log("connection closed (" + e.code + ")")
        if (e && e.code !== 1000) {
            this.initWebSocket()
        }
    }

    //关闭
    websocketclose(e) {
        // console.log("connection closed (" + e.code + ")")
        this.websock.close(1000)
    }

}

export default WS