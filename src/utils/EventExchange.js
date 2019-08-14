class EventExchange {

    constructor(mapApp) {
        this.mapApp = mapApp
    }

    // vue 接收事件
    receiveFromMap (component, eventtype, handlemethod) {
        // 预定的数据格式
        let cb = (param) => {
            // 发送给调用的组件
            component[handlemethod](param)
        }
        this.mapApp.on(eventtype, cb)
        return cb
    }

    // vue 取消接收事件
    cancelFromMap (eventtype, cb) {
        this.mapApp.removeListener(eventtype, cb)
    }

    // vue 发起事件
    send2map (args) {
        this.mapApp.doUIEvent({ cmd: args.name, data: args.data }, args.cb)
    }

}

let eventInstance = new EventExchange(window.mapApp)

export default eventInstance