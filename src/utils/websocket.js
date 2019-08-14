// WebSocket 配置

// 【1】云监控 - 异常提醒
let WSProtocol = "ws";
let globalIP = "203.156.246.55";
let WSPort = "2205";
let uri = "/ScreenCenter/getScreenData/3_1_6";
let id = "1";

function createWebocket(){
	let WSURL=`${WSProtocol}://${globalIP}:${WSPort}${uri}/${id}`;
	return new WebSocket(WSURL);
}

// 【2】

export {
	createWebocket
};