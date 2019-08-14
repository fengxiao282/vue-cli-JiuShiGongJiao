<template>
		<div class="moduleright1">
			<div class="right-top">
				<investitemtitle titleName="异常提醒">
					<div slot="content" class="screen-count"></div>
				</investitemtitle>
			</div>
			<div class="nav-container">
				<div class="nav-abnormal">
					<table class="nav-table">
						<tr>
						<td class="nav-td"
							:style="{backgroundColor:selectIndex==index?'#3D84F6':'#000015'}"
							v-for="(item,index) in navList"
							:key="index"
							@click="select(index)">{{item}}</td>
						</tr>
				</table>
				</div>
				<div class="container-list-container">
						<transition-group name="list-animation" tag="div" v-show="selectIndex==0?true:false">
							<div v-for="(item,index) in tipList_all"
								class='list-item'
								@click="clickItem(item)"
								:class="{ 'list-item-ok':!!item.result, 'list-item-no': !item.result }"
								:key="`${index}${item.type}${item.startTime}${item.lng}${item.lat}${item.line}${item.reason}${item.vno}`">
								<div class="list-item-content" v-if="item.showMsg.length > 12" @mouseenter="enter(item.showMsg,$event)" @mouseleave='out'>
									<img class="list-icon" v-if="item.type == '车辆异常'" src="../../../../../../resource/images/cloud/monitor/abnormal_icon/车辆异常.png">
									<img class="list-icon" v-if="item.type == '三级报警'" src="../../../../../../resource/images/cloud/monitor/abnormal_icon/新能源三级报警.png">
									<img class="list-icon" v-if="item.type == '大间隔'" src="../../../../../../resource/images/cloud/monitor/abnormal_icon/大间隔.png">
									<!-- <img class="list-icon" v-if="item.type == '进出场'" src="../../../../../../resource/images/cloud/monitor/abnormal_icon/异常车次.png"> -->
									{{item.startTM}}&nbsp;
									{{item.coord}} {{item.showMsg == 'null'?'':item.showMsg}}
								</div>
								<div class="list-item-content" v-else>
									<img class="list-icon" v-if="item.type == '车辆异常'" src="../../../../../../resource/images/cloud/monitor/abnormal_icon/车辆异常.png">
									<img class="list-icon" v-if="item.type == '三级报警'" src="../../../../../../resource/images/cloud/monitor/abnormal_icon/新能源三级报警.png">
									<img class="list-icon" v-if="item.type == '大间隔'" src="../../../../../../resource/images/cloud/monitor/abnormal_icon/大间隔.png">
									<!-- <img class="list-icon" v-if="item.type == '进出场'" src="../../../../../../resource/images/cloud/monitor/abnormal_icon/异常车次.png"> -->
									{{item.startTM}}&nbsp;
									{{item.canNotClick?'*':''}}{{item.showMsg == 'null'?'':item.showMsg}}
									<!-- {{(item.coord.length && item.canNotClick)?'*':''}} -->
								</div>
							</div>
						</transition-group>

						<transition-group name="list-animation" tag="div" v-show="selectIndex==1?true:false">
							<div v-for="(item,index) in cheliangyichang_list"
								class='list-item'
								@click="clickItem(item)"
								:class="{ 'list-item-ok':!!item.result, 'list-item-no': !item.result }"
								:key="`${index}${item.type}${item.startTime}${item.lng}${item.lat}${item.line}${item.reason}${item.vno}`">
								<div class="list-item-content" v-if="item.showMsg.length > 12" @mouseenter="enter(item.showMsg,$event)" @mouseleave='out'>
									<img class="list-icon" src="../../../../../../resource/images/cloud/monitor/abnormal_icon/车辆异常.png">
									{{item.startTM}}&nbsp;
									{{item.canNotClick?'*':''}}{{item.showMsg == 'null'?'':item.showMsg}}
								</div>
								<div class="list-item-content" v-else>
									<img class="list-icon" src="../../../../../../resource/images/cloud/monitor/abnormal_icon/车辆异常.png">
									{{item.startTM}}&nbsp;
									{{item.canNotClick?'*':''}}{{item.showMsg == 'null'?'':item.showMsg}}
								</div>
							</div>
						</transition-group>

						<transition-group name="list-animation" tag="div" v-show="selectIndex==2?true:false">
							<div v-for="(item,index) in sanji_list"
								class='list-item'
								@click="clickItem(item)"
								:class="{ 'list-item-ok':!!item.result, 'list-item-no': !item.result }"
								:key="`${index}${item.type}${item.startTime}${item.lng}${item.lat}${item.line}${item.reason}${item.vno}`">
								<div class="list-item-content" v-if="item.showMsg.length > 12" @mouseenter="enter(item.showMsg,$event)" @mouseleave='out'>
									<img class="list-icon" src="../../../../../../resource/images/cloud/monitor/abnormal_icon/新能源三级报警.png">
									{{item.startTM}}&nbsp;
									{{item.canNotClick?'*':''}}{{item.showMsg == 'null'?'':item.showMsg}}
								</div>
								<div class="list-item-content" v-else>
									<img class="list-icon" src="../../../../../../resource/images/cloud/monitor/abnormal_icon/新能源三级报警.png">
									{{item.startTM}}&nbsp;
									{{item.canNotClick?'*':''}}{{item.showMsg == 'null'?'':item.showMsg}}
								</div>
							</div>
						</transition-group>
						<transition-group name="list-animation" tag="div" v-show="selectIndex==3?true:false">
							<div v-for="(item,index) in dajiange_list"
								class='list-item'
								@click="clickItem(item)"
								:class="{ 'list-item-ok':!!item.result, 'list-item-no': !item.result }"
								:key="`${index}${item.type}${item.startTime}${item.lng}${item.lat}${item.line}${item.reason}${item.vno}`">
								<div class="list-item-content" v-if="item.showMsg.length > 12" @mouseenter="enter(item.showMsg,$event)" @mouseleave='out'>
									<img class="list-icon" src="../../../../../../resource/images/cloud/monitor/abnormal_icon/大间隔.png">
									{{item.startTM}}&nbsp;
									{{item.canNotClick?'*':''}}{{item.showMsg == 'null'?'':item.showMsg}}
								</div>
								<div class="list-item-content" v-else>
									<img class="list-icon" src="../../../../../../resource/images/cloud/monitor/abnormal_icon/大间隔.png">
									{{item.startTM}}&nbsp;
									{{item.canNotClick?'*':''}}{{item.showMsg == 'null'?'':item.showMsg}}
								</div>
							</div>
						</transition-group>
						<!-- <transition-group name="list-animation" tag="div" v-show="selectIndex==4?true:false">
							<div v-for="(item,index) in jinchuchang_list"
								class='list-item'
								@click="clickItem(item)"
								:class="{ 'list-item-ok':!!item.result, 'list-item-no': !item.result }"
								:key="`${index}${item.type}${item.startTime}${item.lng}${item.lat}${item.line}${item.reason}${item.vno}`">
								<div class="list-item-content" v-if="item.showMsg.length > 12" @mouseenter="enter(item.showMsg,$event)" @mouseleave='out'>
									<img class="list-icon" src="../../../../../../resource/images/cloud/monitor/abnormal_icon/异常车次.png">
									{{item.startTM}}&nbsp;
									{{item.canNotClick?'*':''}}{{item.showMsg == 'null'?'':item.showMsg}}
								</div>
								<div class="list-item-content" v-else>
									<img class="list-icon" src="../../../../../../resource/images/cloud/monitor/abnormal_icon/异常车次.png">
									{{item.startTM}}&nbsp;
									{{item.canNotClick?'*':''}}{{item.showMsg == 'null'?'':item.showMsg}}
								</div>
							</div>
						</transition-group> -->
				</div>
			</div>

			<div id="tip-msg-yiChang">{{msg}}</div>
			<div class="hidden">{{yichnag_tips_list.length?yichnag_tips_list[0].type:''}}</div>

		</div>
</template>

<script>
import { mapState } from 'vuex';
import investitemtitle from '../../../../common/cloudmonitor/sourceinvest/investitemtitle.vue';
import { createWebocket } from "../../../../../utils/websocket.js";
import { httpbase } from '../../../../../utils/ajax.js';
import mapInterface from '../../../../../utils/EventExchange'
import { constants } from 'fs';
export default {
	name: 'moduleright1',
	components: {
		investitemtitle
	},
	data(){
		return{
			navList:['全部','车辆异常','三级','大间隔'],
			selectIndex:0,
			transfer_station:[],
			tipList_all:[],				//全部
			cheliangyichang_list:[],	//车辆异常
			sanji_list:[],				//三级
			dajiange_list:[],				//大间隔
			jinchuchang_list:[],				//进出场
			websock: null,
			timeoutID:null, //关闭定时心跳超时调用 ID
			msg:'',
			tipDom:{},
			confirmClose:false,
			initMsgTimes:true,
		}
	},
	created(){
		let that = this;

		//云监控首次打开 - 获取此时间点前 异常提醒 数据
		this.$store.dispatch('exceptionmonitor/yichnag_tips');

		this.websock = createWebocket(); //初始化websocket连接
		this.initWebSocket(); //websocket 绑定事件
	},
	mounted(){
		this.tipDom = document.getElementById('tip-msg-yiChang');
	},
	beforeDestroy(){
		this.confirmClose = true;
		this.websock.close();
	},
	computed:{
		...mapState('exceptionmonitor',{
			yichnag_tips_list(state){
				if(state.yichnag_tips.length){
					let data = state.yichnag_tips;
					if(this.initMsgTimes){
						this.classify(data);
						this.initMsgTimes = false;
						return data;
					}
				}
				return [];
			},
		}),
	},
	methods:{
		clickItem(item){
			console.log('item--',item);
			if(item.coord.length == 2 && !item.canNotClick){
				this.tagIconMarker([item],'single');
			}
		},
		formatDate(date) { //日期格式化
			let greenwichTime = new Date(date);
			let hours = greenwichTime.getHours();
			let hours2 = hours < 10 ? `0${hours}` : hours;

			let minutes = greenwichTime.getMinutes();
			let minutes2 = minutes < 10 ? `0${minutes}` : minutes;

			return `${hours2}:${minutes2}`;
		},
		out(){
			this.tipDom.style.visibility = 'hidden';
		},
		enter(msg,event){
			this.msg = msg;
			let cx = document.body.clientWidth - event.clientX + 30;
			let cy = event.clientY - 90;

			this.tipDom.style.right = `${cx}px`;
			this.tipDom.style.top = `${cy}px`;
			this.tipDom.style.visibility = 'visible';
		},
		select(index){
			if(this.selectIndex == index){
				return;
			}
			this.selectIndex = index;
		},
		classify(data){ //数据分类 ，data时间排序（大 -> 小）
			if(data.length){

				let tipList_all =JSON.parse(JSON.stringify(data));
				this.filter(tipList_all,'tipList_all');

				let type =  '';
				let cheliangyichang_list = [];
				let sanji_list = [];
				let dajiange_list = [];
				let jinchuchang_list = [];

				for(let i=0;i<data.length;i++){
					type = data[i].type;
					if(type == '车辆异常'){
						cheliangyichang_list.push(data[i]);	//数据时间排序（大 -> 小）
						
					}else if(type == '三级报警'){
						sanji_list.push(data[i]);

					}else if(type == '大间隔'){
						dajiange_list.push(data[i]);

					}else if(type == '进出场'){
						jinchuchang_list.push(data[i]);

					}
				}
				this.filter(cheliangyichang_list,'cheliangyichang_list');
				this.filter(sanji_list,'sanji_list');
				this.filter(dajiange_list,'dajiange_list');
				this.filter(jinchuchang_list,'jinchuchang_list');
			}
		},
		filter(arr, listType){ //（1）为显示信息添加：车辆编号/站点名称/线路编号（2）数据处理，过滤并最终赋值，arr时间排序（大 -> 小）
				let len = arr.length;
				if(len == 0){
					return;
				}

				//（2）数据处理：数据超过100条，只取100条。少于100条，有多少显示多少
				if(len >=100){ //新返回的数据条数 100 < num
					arr.length = 100;
				}

				// （3.1）为显示信息添加：车辆编号/站点名称/线路编号 
				// （3.2）添加用于页面显示用的时间,和用于比较过滤只显示5分钟内数据的时间戳
				// （3.3）筛选过滤出 无效信息，为此条数据打上标记。用以判断点击此条信息地图上是否显示图标
				for(let j=0; j<arr.length; j++){

					//（3.1）
					if(listType == 'dajiange_list'){ //大间隔
						let upDown = '';
						if(arr[j].upDown == '0'){   // 0:上行
							upDown = '上行';
						}else if(arr[j].upDown == '1'){	  //1:下行
							upDown = '下行';
						}

						let stationNameStatus = !!arr[j].stationName;
						let upDownStatus = !!arr[j].upDown;
						let lineStatus = !!arr[j].line;

						if(stationNameStatus || upDownStatus || lineStatus){
							arr[j].showMsg = `${arr[j].stationName}${upDown}${arr[j].line} ${arr[j].reason}`;

						}else{
							arr[j].showMsg = `${arr[j].reason}`;
						}

					}else{

						if(arr[j].vno){
							arr[j].showMsg = `${arr[j].vno} ${arr[j].reason}`;
						}else{
							arr[j].showMsg = `${arr[j].reason}`;
						}

					}

					// （3.2）
					arr[j].startTM = this.formatDate(arr[j].startTime);
					arr[j].greenwichTime = (new Date(arr[j].startTime)).getTime();

					//（3.3）
					if(!arr[j].lng || !arr[j].lat){ 	//过滤所有 lng，lat为空的数据
						arr[j].canNotClick = true; 			//点击此条信息地图上不显示图标
						continue;
					}

					if(arr[j].type == '车辆异常' || arr[j].type == 'SOC' || arr[j].type == '三级报警'){ //对应 type：bus
							if(!arr[j].line || !arr[j].upDown){
								arr[j].canNotClick = true;
								continue;
							}

					}else if(arr[j].type == '大间隔'){ //对应 type：station
							if(!arr[j].stationCode){
								// continue;
								arr[j].canNotClick = true;
								continue;
							}

					}else if(arr[j].type == '进出场' || arr[j].type == '一车一检'){ //对应 type：parking
							if(!arr[j].parking){
								// continue;
								arr[j].canNotClick = true;
								continue;
							}
					}
					arr[j].canNotClick = false; //点击此条信息地图上可以显示图标
				}
				// this[listType] = arr;
				// console.log('arr--',arr)

				//转换坐标
				this.transferToWgs84(arr,listType);
		},
		transferToWgs84(list,listType){
			if(!list.length){
				return;
			}
			
			// 组织要转换坐标的数据
			let newList = [];
			for(let i=0;i<list.length;i++){
				let newItem = {};
				newItem.id = i;
				newItem.lon = list[i].lng;
				newItem.lat = list[i].lat;
				newItem.line = list[i].line;
				newItem.upDown = list[i].upDown;
				newItem.station = list[i].stationCode;
				newItem.parking = list[i].parking;

				if(list[i].type == '大间隔'){
					newItem.type = 'station';
				}else if(list[i].type == '进出场' || list[i].type == '一车一检'){
					newItem.type = 'parking';
				}else{
					newItem.type = 'bus';
				}
				newList.push(newItem);
			}
			// console.log('newList--',newList)

			if(listType == 'tipList_all'){
					let that = this;
					let ls2 = JSON.parse(JSON.stringify(list));
					let ls = JSON.parse(JSON.stringify(newList));
					httpbase('http://47.96.185.214:8000/wgs84ToVector/search', 'POST', {'data':ls}, null, 10000,{},'unencode')().then(function(res){
						if(res.status == 200){
							let resDt = res.data;
							if(resDt.length){
								for(let i=0;i<resDt.length;i++){
									that.tipList_all[i].coord = resDt[i].point;
								}
								// console.log('ls2--',ls2);
								// that.tipList_all = ls2;
								// that.filter5Minutes(ls2);
							}
						}
					},function(err){
						console.log(err);
					});

			}else if(listType == 'cheliangyichang_list'){
					let that = this;
					let ls2 = JSON.parse(JSON.stringify(list));
					let ls = JSON.parse(JSON.stringify(newList));
					httpbase('http://47.96.185.214:8000/wgs84ToVector/search', 'POST', {'data':ls}, null, 10000,{},'unencode')().then(function(res){
						if(res.status == 200){
							let resDt = res.data;
							if(resDt.length){
								for(let i=0;i<resDt.length;i++){
									ls2.coord = resDt[i].point;
								}
								that.cheliangyichang_list = ls2;
							}
						}
					},function(err){
						console.log(err);
					});

			}else if(listType == 'sanji_list'){
					let that = this;
					let ls2 = JSON.parse(JSON.stringify(list));
					let ls = JSON.parse(JSON.stringify(newList));
					httpbase('http://47.96.185.214:8000/wgs84ToVector/search', 'POST', {'data':ls}, null, 10000,{},'unencode')().then(function(res){
						if(res.status == 200){
							let resDt = res.data;
							if(resDt.length){
								for(let i=0;i<resDt.length;i++){
									ls2.coord = resDt[i].point;
								}
								that.sanji_list = ls2;
							}
						}
					},function(err){
						console.log(err);
					});

			}else if(listType == 'dajiange_list'){
					let that = this;
					let ls2 = JSON.parse(JSON.stringify(list));
					let ls = JSON.parse(JSON.stringify(newList));
					httpbase('http://47.96.185.214:8000/wgs84ToVector/search', 'POST', {'data':ls}, null, 10000,{},'unencode')().then(function(res){
						if(res.status == 200){
							let resDt = res.data;
							if(resDt.length){
								for(let i=0;i<resDt.length;i++){
									ls2.coord = resDt[i].point;
								}
								that.dajiange_list = ls2;
							}
						}
					},function(err){
						console.log(err);
					});

			}else if(listType == 'jinchuchang_list'){
					let that = this;
					let ls2 = JSON.parse(JSON.stringify(list));
					let ls = JSON.parse(JSON.stringify(newList));
					httpbase('http://47.96.185.214:8000/wgs84ToVector/search', 'POST', {'data':ls}, null, 10000,{},'unencode')().then(function(res){
						if(res.status == 200){
							let resDt = res.data;
							if(resDt.length){
								for(let i=0;i<resDt.length;i++){
									ls2.coord = resDt[i].point;
								}
								that.jinchuchang_list = ls2;
							}
						}
					},function(err){
						console.log(err);
					});

			}

		},
		filter5Minutes(tipList_all){ //过滤显示5分钟之内的数据
			let timeRange = 600000; //5分钟
			let currentTime = Date.now();
			let fiveMinutes = JSON.parse(JSON.stringify(tipList_all));
			let tipListAll2 = JSON.parse(JSON.stringify(tipList_all));
			for(let j=fiveMinutes.length-1; j>=0; j--){
				let differenceValue = currentTime - fiveMinutes[j].greenwichTime;
				if(differenceValue > timeRange){ //范围之外
					fiveMinutes.splice(j,1);
				}
			}
			this.tagIconMarker(fiveMinutes,'multiple',tipListAll2);
		},
		tagIconMarker(list,type,list2){ //地图异常图标标注事件，新异常消息添加marker浮窗事件。type:single -> 一条数据。multiple -> 多个
			// 5分钟之内的数据最后一次过滤，去除 coord 为空数组的项
			for(let j=list.length-1; j>=0; j--){
				if(list[j].coord.length == 0 || list[j].canNotClick){
					list.splice(j,1);
				}
			}
			if(!list.length){
				return;
			}
			console.log("最后--",list)

			let args1 = {
				name: 'ui_monitor_exception_addmarker',
				data: list,
				cb: null
			};

			if(type == 'single'){
				mapInterface.send2map(args1);

			}else if(type == 'multiple'){
				
				// 全部数据最后一次过滤，去除 coord 为空数组的项
				for(let j=list2.length-1; j>=0; j--){
					if(list2[j].coord.length == 0 || list2[j].canNotClick){
						list2.splice(j,1);
					}
				}

				let args2 = {
					name: 'ui_monitor_exception_mark',
					data: list2,
					cb: null
				};

				mapInterface.send2map(args2);
				mapInterface.send2map(args1);
			}
		},
		initWebSocket() { // weosocket 绑定事件
			this.websock.onmessage = this.websocketonmessage;
			this.websock.onopen = this.websocketonopen;
			this.websock.onerror = this.websocketonerror;
			this.websock.onclose = this.websocketclose;
		},
		websocketonmessage(e) { //数据接收
			let Msg0 = e.data;
			// console.log("接受信息Msg0---",Msg0)
			if (Msg0 == "ping" || Msg0 == "连接成功") {
				return;
			} else {
					this.classify(JSON.parse(Msg0));
			}
		},
		websocketonopen() {//心跳
			this.ping();
		},
		websocketonerror(error){
			console.log("websocket错误--",error);
		},
		websocketclose(e) {
			console.log("断开连接"); //关闭连接
			let that = this;
			clearInterval(this.timeoutID); //关闭心跳

			if(!this.confirmClose){ //重连
						this.websock = null;
						this.websock = createWebocket();
						this.initWebSocket();
			}
		},
		ping() { //心跳
			let that = this;
			if(this.timeoutID){
					clearTimeout(this.timeoutID);
			}

			this.timeoutID = setTimeout(function() {
						that.websock.send("ping");
						that.ping();
						this.timeoutID = null;
			}, 20000);
		},
	},
}
</script>
<style lang="postcss" scoped>
.moduleright1{
	width: 100%;
	height: 100%;
	padding-top: 20px;
	box-sizing: border-box;
}
.right-top{
	width: 720px;
	margin-left: auto;
	margin-right: auto;
}
.screen-count{
	font-family: PingFangSC-Medium;
	font-size: 45px;
	line-height: 60px;
	color: #FFF;
}
.nav-container{
	background-color:#000015;
	height: 1870px;
	width: 720px;
	margin-left: auto;
	margin-right: auto;
	margin-top: 20px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
}
.nav-abnormal{
  width: 700px;
  height: 60px;
  box-sizing: border-box;
}
.nav-table{
  border-spacing: 0;
  border-collapse:collapse;
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.nav-td{
	border: 1.25px solid #3D84F6;
	box-sizing: border-box;
	text-align:center;
	font-size:35px;
	lin-height: 57.5px;
}

.container-list-container{
  margin-top: 30px;
	padding-top:10px;
  flex: 1;
  width: 720px;
  overflow:auto;
	color: #fed4d4;
}
.container-list-container::-webkit-scrollbar {
	display: none;
}
.list-item{
  width:720px;
  height:80px;
	margin-bottom:5px;
	cursor: pointer;
}
.list-item-content{
	width: 100%;
	height: 100%;
	line-height: 80px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow:ellipsis;
}
.list-item-no{
	background: -webkit-linear-gradient(left,rgb(53,0,16) 0%,rgba(255,0,0,1) 100%);
  background: linear-gradient(left,rgb(53,0,16) 0%,rgba(255,0,0,1) 100%);
}
.list-item-ok{
  background: rgba(255,0,0,0.10);
}
/* 进入*/
.list-animation-enter{
  opacity: 0;
  width: 0px;
}
.list-animation-enter-active{
  transition: all 1.5s cubic-bezier(0.2,1,1,1);
}
.list-animation-enter-to{
  opacity: 1;
  width:720px;
}
/* 离开 */
/* .list-animation-leave-to{
  opacity: 0;
  width: 0px;
}
.list-animation-leave-active{
  transition: all 1.5s cubic-bezier(0.2,1,1,1);
}
.list-animation-leave{
  opacity: 1;
  width:720px;
} */
img.list-icon{
	margin-top:-5px;
	vertical-align:middle;
  width:60px;
  height:60px;
  margin-right:20px;
  margin-left:20px;
}
#tip-msg-yiChang{
	position:fixed;
	visibility: hidden;
	background: #000015;
	box-shadow: 0 0 10px 0 #4089FF;
	font-family: PingFangSC-Regular;
	font-size: 40px;
	color: #4089FF;
	line-height: 50px;
	height: 50px;
	border-radius:2px;
	padding: 5px 10px;
	overflow: hidden;
	pointer-events: none;
	z-index: 999;
}
.hidden{
	height: 0;
	width: 0;
	overflow: hidden;
	visibility: hidden;
}
</style>
