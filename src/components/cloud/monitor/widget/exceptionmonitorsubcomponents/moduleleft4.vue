<template>
	<div class="left-2">
		<div class="left-2-top">
			<investitemtitle titleName="大客流站点情况">
				<div slot="content" class="screen-count"></div>
			</investitemtitle>
		</div>

		<div class="left-2-foot">
			<table>
				<thead>
					<tr>
						<th>排名</th>
						<th>站名</th>
						<th>15分钟累计(刷卡)</th>
						<th>日均客流</th>
					</tr>
				</thead>
				<tbody :style="{paddingTop : daKeLiu_paddingTop}">
					<tr v-for="(item,index) in daZhanDian_keLiu" :key="index">
						<td class="td-0"><div class="red-dot">{{item.idx}}</div></td>
						<td v-if="item.station.length > 9">
							<div class="marquee-item cursor-pointer" @mouseenter="enter(item.station,$event)" @mouseleave='out'>{{item.station}}</div>
						</td>
						<td v-else>
							<div class="marquee-item">{{item.station}}</div>
						</td>
						<td>{{item.periodCount}}</td>
						<td>{{item.average}}</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div id="tip-msg-4">{{msg}}</div>

	</div>
</template>

<script>
import { mapState } from 'vuex';
import investitemtitle from '../../../../common/cloudmonitor/sourceinvest/investitemtitle.vue';

export default {
	name: 'moduleleft4',
	components: {investitemtitle},
	data(){
		return{
			daKeLiu_paddingTop:'418px',
			msg:'',
			tipDom:{},
			dakeliu_timer:null,
		}
	},
	mounted(){
		// 大客流站点情况
		this.$store.dispatch('exceptionmonitor/daZhanDian_keLiu');
		this.getData();
		this.tipDom = document.getElementById('tip-msg-4');
	},
	beforeDestroy(){
		clearTimeout(this.dakeliu_timer);
	},
	methods:{
		getData(){	//轮询(5分钟)
			if(this.dakeliu_timer){
					clearTimeout(this.dakeliu_timer);
			}
			this.dakeliu_timer = setTimeout(()=>{
				this.$store.dispatch('exceptionmonitor/daZhanDian_keLiu');
				this.dakeliu_timer = null;
				this.getData();
			},900000)
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
		sortNumber(arr){
			return arr.sort(function(a,b){
				return a.idx - b.idx;
			})
		},
	},
	computed:{
		...mapState('exceptionmonitor',{
			daZhanDian_keLiu(state){
				let keLiu_data = JSON.parse(JSON.stringify(state.daZhanDian_keLiu));

				this.$nextTick(function(){
					setTimeout(()=>{
						this.daKeLiu_paddingTop = 0;
					},0);
				});

				return this.sortNumber(keLiu_data);
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
	/* border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	background-color: rgba(0,0,0,0.80); */
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
.td-0{
	display: flex;
	flex-direction: row;
	justify-content: center;
	margin-top: 15px;
}
.red-dot{
	width: 45px;
	height: 45px;
	text-align: center;
	line-height: 45px;
	border-radius: 45px;
	background-color: #FF1818;
}
.marquee-item{
	text-align: center;
	width: 100%;
	overflow: hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
}
.cursor-pointer{
	cursor: pointer;
}
#tip-msg-4{
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
