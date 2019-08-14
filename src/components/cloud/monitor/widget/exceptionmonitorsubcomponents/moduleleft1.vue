<template>
	<div class="left-com-1"> <!-- 车辆异常处理 -->
		<investitemtitle titleName="车辆异常处理">
			<div slot="content" class="screen-count">
				<span class="left-1-active-value">
					{{cheLiang_yiChang.processed=='null'?0:cheLiang_yiChang.processed}}</span>/{{cheLiang_yiChang.alarm}}
			</div>
		</investitemtitle>
		<div class="left-1-1-foot">
			<div id="left_1_1_foot_pie"></div>
			<div class="left-1-1-foot-2">
				<div class="left-1-1-foot-2-item">
					<div class="aaa-1-com shi-gu">事故 : {{cheLiang_yiChang.accident?cheLiang_yiChang.accident:0}}</div>
					<div class="aaa-1-com gu-zhang">故障 : {{cheLiang_yiChang.fault?cheLiang_yiChang.fault:0}}</div>
				</div>
				<div class="left-1-1-foot-2-item">
					<div class="aaa-1-com jiu-fen">纠纷 : {{cheLiang_yiChang.dispute?cheLiang_yiChang.dispute:0}}</div>
					<!-- <div class="aaa-1-com yi-bao-jing">报警 : {{cheLiang_yiChang.alarm}}</div> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import investitemtitle from '../../../../common/cloudmonitor/sourceinvest/investitemtitle.vue';

let echarts = require('echarts');

export default {
	name: 'moduleleft1',
	components: {investitemtitle},
	data(){
		return{
			yichnagcheliang_timer:null,
		}
	},
	mounted(){
		// 车辆异常
		this.$store.dispatch('exceptionmonitor/cheLiang_yiChang');
		this.getData();
	},
	beforeDestroy(){
		clearTimeout(this.yichnagcheliang_timer);
	},
	methods:{
		getData(){	//轮询(5分钟)
			if(this.yichnagcheliang_timer){
					clearTimeout(this.yichnagcheliang_timer);
			}
			this.yichnagcheliang_timer = setTimeout(()=>{
				this.$store.dispatch('exceptionmonitor/cheLiang_yiChang');
				this.yichnagcheliang_timer = null;
				this.getData();
			},300000)
		},
		initPie(newVal){ //初始化饼图
			let myChart = echarts.init(document.getElementById("left_1_1_foot_pie"));
			myChart.setOption({
				tooltip: {
					trigger: 'item',
					formatter: "{b}：{c} <br/>占比：{d}%"
				},
				series: {
					type: 'pie',
					center: ['50%', '50%'],
					label: {
						normal: {
							show:false
						}
					},
					data: [
						{
							value:newVal.accident,
							name:'事故数',
							itemStyle:{
								color: '#DB1717'
							}
						},
						{
							value:newVal.fault,
							name:'故障数',
							itemStyle:{
								color: '#E8FF78'
							}
						},
						{
							value:newVal.dispute,
							name:'纠纷数',
							itemStyle:{
								color: '#7500FF'
							}
						},
						{
							value:newVal.alarm,
							name:'报警数',
							itemStyle:{
								color: '#40B3FF'
							}
						},
						{
							value:newVal.processed,
							name:'已处理数',
							itemStyle:{
								color: '#91C7AE'
							}
						},
					]
				}
			});
		},
	},
	computed:{
		...mapState('exceptionmonitor',{
			cheLiang_yiChang(state){ // 车辆异常
				let cheLiangYiChang = state.cheLiang_yiChang;
				// console.log('obj--',cheLiangYiChang)

				// 绘图
				if(cheLiangYiChang){
					this.$nextTick(function(){
						this.initPie(cheLiangYiChang)
					});
				}

				return cheLiangYiChang;
			},
		}),
	},
}
</script>
<style lang="postcss" scoped>
.left-com-1{
	width:760px;
	height:370px;
	box-sizing: border-box;
	background: #000015;
	border: 1.25px solid #4089FF;
	padding: 20px 40px;
}

/* header */
.screen-count{
	font-family: PingFangSC-Medium;
	font-size: 45px;
	line-height: 60px;
	color: #FFF;
}
.left-1-active-value{
	color: #02FF9A;
}

/* left-1-1-foot */
.left-1-1-foot{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height: 280px;
	width: 100%;
}
#left_1_1_foot_pie{
	width: 220px;
	height: 220px;
}

/* left-1-1-foot-2 */
.left-1-1-foot-2{
	flex: 1;
	height: 280px;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	justify-content: center;
	box-sizing: border-box;
}
.left-1-1-foot-2-item{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height: 40%;
}

.aaa-1-com{
	height: 70px;
	line-height: 70px;
	text-align: center;
	background-color: #000000;
	width: 210px;
}
.yi-chu-li{
	border: 2.5px solid #02FF9A;
}
.yi-bao-jing{
	border: 2.5px solid #4089FF;
}
.shi-gu{
	border: 2.5px solid #DB1717;
}
.gu-zhang{
	border: 2.5px solid #E8FF78;
}
.jiu-fen{
	border: 2.5px solid #7500FF;
}
</style>
