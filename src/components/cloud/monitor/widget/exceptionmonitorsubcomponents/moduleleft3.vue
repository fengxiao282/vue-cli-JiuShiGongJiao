<template>
		<div class="left-2">
			<div class="left-2-top">
				<investitemtitle titleName="大间隔异常情况">
					<div slot="content" class="screen-count">
						今日：<span class="left-2-active-value">{{day == 'null'?'':day}}</span>
						&nbsp;
						早高峰：<span class="left-2-active-value">{{earlyPeak == 'null'?'':earlyPeak}}</span>
						&nbsp;
						晚高峰：<span class="left-2-active-value">{{latePeak == 'null'?'':latePeak}}</span>
						&nbsp;&nbsp;
					</div>
				</investitemtitle>
			</div>

			<div class="left-2-foot">
				<table>
					<thead>
						<tr>
							<th>发生时间</th>
							<th>结束时间</th>
							<th>线路</th>
							<th>站点</th>
							<th>持续时间</th>
							<th>原因</th>
						</tr>
					</thead>
					<tbody :style="{paddingTop : daJianGe_paddingTop}">
						<tr v-for="(item,index) in daJianGe_list" :key="index">
							<td>{{item.ForMat_startTime}}</td>
							<td>{{item.ForMat_endTime}}</td>
							<td v-if="item.line.length > 6">
								<div class="marquee-item cursor-pointer" @mouseenter="enter(item.line,$event)" @mouseleave='out'>{{item.line}}</div>
							</td>
							<td v-else>
								<div class="marquee-item">{{item.line}}</div>
							</td>
							<td v-if="item.station.length > 6">
								<div class="marquee-item cursor-pointer" @mouseenter="enter(item.station,$event)" @mouseleave='out'>{{item.station}}</div>
							</td>
							<td v-else>
								<div class="marquee-item">{{item.station}}</div>
							</td>
							<td>{{item.duration}}</td>
							<td v-if="item.reason.length > 6">
								<div class="marquee-item cursor-pointer" @mouseenter="enter(item.reason,$event)" @mouseleave='out'>{{item.reason}}</div>
							</td>
							<td v-else>
								<div class="marquee-item">{{item.reason}}</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div id="tip-msg-3">{{msg}}</div>

		</div>
</template>

<script>
import { mapState } from 'vuex';
import investitemtitle from '../../../../common/cloudmonitor/sourceinvest/investitemtitle.vue';

export default {
	name: 'moduleleft3',
	components: {investitemtitle},
	data(){
		return{
			daJianGe_paddingTop:'418px',
			day:'',
			earlyPeak:'',
			latePeak:'',
			msg:'',
			tipDom:{},
			dajiange_timer:null,
		}
	},
	mounted(){
		// 大间隔异常
		this.$store.dispatch('exceptionmonitor/daJianGe_yiChang');
		this.getData();
		this.tipDom = document.getElementById('tip-msg-3');
	},
	beforeDestroy(){
		clearTimeout(this.dajiange_timer);
	},
	methods:{
		getData(){	//轮询(5分钟)
			if(this.dajiange_timer){
					clearTimeout(this.dajiange_timer);
			}
			this.dajiange_timer = setTimeout(()=>{
				this.$store.dispatch('exceptionmonitor/daJianGe_yiChang');
				this.dajiange_timer = null;
				this.getData();
			},300000)
		},
		out(){
			this.tipDom.style.visibility = 'hidden';
		},
		enter(msg,event){
			this.msg = msg;
			let cx = document.body.clientWidth - event.clientX + 30;
			let cy = event.clientY - 70;

			this.tipDom.style.right = `${cx}px`;
			this.tipDom.style.top = `${cy}px`;
			this.tipDom.style.visibility = 'visible';
		},
		formatDate(date) { //日期格式化
			let greenwichTime = new Date(date);
			let hours = greenwichTime.getHours();
			let hours2 = hours < 10 ? `0${hours}` : hours;

			let minutes = greenwichTime.getMinutes();
			let minutes2 = minutes < 10 ? `0${minutes}` : minutes;

			return {'time':`${hours2}:${minutes2}`,'timeStamp':greenwichTime.getTime()}
		},
		sortNumber(arr){
			return JSON.parse(JSON.stringify(arr)).sort(function(a,b){
				return -a.startTimeStamp + b.startTimeStamp;
			})
		},
	},
	computed:{
		...mapState('exceptionmonitor',{
			daJianGe_list(state){ //大间隔列表
				if(state.daJianGe_yiChang){
					let daJianGeYiChang = state.daJianGe_yiChang;
					let daJianGeList = daJianGeYiChang.list;
					
					this.day = daJianGeYiChang.summary.day;
					this.earlyPeak = daJianGeYiChang.summary.earlyPeak;
					this.latePeak = daJianGeYiChang.summary.latePeak;
					
					// 日期格式化
					for(let i=0;i < daJianGeList.length; i++){
						let startTimeObj = this.formatDate(daJianGeList[i].startTime);
						daJianGeList[i].ForMat_startTime = startTimeObj.time;
						daJianGeList[i].startTimeStamp = startTimeObj.timeStamp;

						daJianGeList[i].ForMat_endTime = this.formatDate(daJianGeList[i].endTime).time;
					}

					// 数据上滑
					this.$nextTick(function(){
						setTimeout(()=>{
							this.daJianGe_paddingTop = 0;
						},0);
					});

					return this.sortNumber(daJianGeList);
				}
			},
		}),
	},
}
</script>
<style lang="postcss" scoped>
/* header */
.screen-count{
	font-family: PingFangSC-Medium;
	font-size: 45px;
	line-height: 60px;
	color: #FFF;
}

/* left-2 */
.left-2{
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	height: 590px;
	margin-bottom: 40px;
	padding: 20px 40px 0;
	border: 1.25px solid #4089FF;
	box-sizing: border-box;
	background: #000015;
	overflow: hidden;
}

/* left-2-top */
.left-2-top{
	height: 70px;
	width: 100%;
}
.left-2-active-value{
	color: #FF3939;
}

/* left-2-foot */
.left-2-foot{
	flex: 1;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
}
table {
	width: 100%;
	border-spacing: 0;
	text-align: center;
	border: none;
}
table thead{
	display: table;
	width: 100%;
	table-layout: fixed;
	border-bottom: 2px solid #FF1818;
	height: 70px;
	line-height:70px;
}
table tbody{
	display: block;
	height: 418px;
	overflow-y: scroll;
	transition: padding-top 3s ease-out;
	-webkit-transition: padding-top 3s ease-out;
	color: #c6d1e2;
	box-sizing: border-box;
}
tbody::-webkit-scrollbar {
	display: none;
}

tbody tr{
	display: table;
	width: 100%;
	table-layout: fixed;
	height: 84px;
	line-height:84px;
	/* border-bottom: 1px solid rgba(255, 255, 255, 0.2); */
	/* background-color: rgba(0,0,0,0.80); */
}
/* tbody tr:last-child{
	border-style: none;
} */
tbody tr:nth-of-type(2n-1){
	background-color: rgba(0,0,0,0.80);
}
tbody tr:nth-of-type(2n+0){
	background-color: #0f1325;
}
.marquee-item{
	text-align: center;
	width: 100%;
	overflow: hidden;
    text-overflow:ellipsis;
    white-space:nowrap
}
.cursor-pointer{
	cursor: pointer;
}
#tip-msg-3{
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
</style>
