<template>
	<div id='baoyang-zhixing'>
		<investitemtitle titleName="保养执行情况">
			<div slot="content" class="screen-count"></div>
		</investitemtitle>

        <div class="bottom-container">
			<div class="left" id='baoyang_zhixing_pie' :style="{transform: 'scale('+scale+')'}"></div>
			<div class="right">
				<div class="top">
					<div class="jihua-baoxiu">计划：{{baoyangzhixing?baoyangzhixing.plan:''}}</div>
					<div class="jihua-baoxiu">执行：<span class="baoxiu-val">{{baoyangzhixing?baoyangzhixing.checkIn:''}}</span></div>
				</div>
				<div class="bottom">
					<div class="jun-gong">竣工：<span class="jun-gong-val">{{baoyangzhixing?baoyangzhixing.done:''}}</span></div>
					<div class="zai-xiu">在保：{{baoyangzhixing?baoyangzhixing.doing:''}}</div>
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
	name: 'baoyang-zhixing',
	components: {
		investitemtitle
	},
	data () {
		return {
			scale: 1,
		}
	},
	mounted(){
		this.changeScale();
	},
    updated(){
	},
	methods:{
    	changeScale(){ //echarts图表不同屏幕缩放
          this.scale = window.innerWidth/11520;
      	},
		initPie(newVal){ //初始化饼图
			// console.log('---',data)

			let jihua = newVal.plan;
			let baoxiu = newVal.checkIn;

			let jungong = newVal.done;
			let zaixiu = newVal.doing;

			let myChart = echarts.init(document.getElementById("baoyang_zhixing_pie"));

            myChart.resize({
                width: 250,
                height: 250
            });

			myChart.setOption({
				tooltip: {
					trigger: 'item',
					formatter: "{b}：{c} <br/>占比：{d}%"
				},
				graphic:[{
					type:'text',
					left:'center',
					top:'center',
					style:{
						text:'保养',
						fill:'#ffffff',
						font:'40px PingFangSC-Regular'
					}
				}],
				series: [
							{
							type: 'pie',
							radius: ['50%', '60%'],
							center: ['50%', '50%'],
							label: {
								normal: {
									show: false,
								}
							},
							labelLine: {
								normal: {
									show: false
								}
							},
							data: [
								{
									value:jungong,
									name:'竣工',
									itemStyle:{
										color: '#02FF9A'
									}
								},
								{
									value:zaixiu,
									name:'在保',
									itemStyle:{
										color: '#43494F'
									}
								}
							]
						},
						{
						type: 'pie',
						radius: ['70%', '80%'],
						center: ['50%', '50%'],
						label: {
							normal: {
								show: false,
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						data: [
							{
								value:jihua,
								name:'计划',
								itemStyle:{
									color: '#00C8FF'
								}
							},
							{
								value:baoxiu,
								name:'执行',
								itemStyle:{
									color: '#43494F'
								}
							}
						]
					}
				]
			});
		},
	},
	computed:{
		...mapState('locomotiveguarantee',{
			baoyangzhixing(state){
				if(state.jiwu_baoxiu_baoyang_liujiao){
					let data = state.jiwu_baoxiu_baoyang_liujiao.maintain;
					// console.log('---',data)
					this.$nextTick(function(){
						this.initPie(data);
					});
					return data;
				}
				return null;
			}
		}),
	},
}
</script>

<style lang="postcss" scoped>
#baoyang-zhixing{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
	width: 760px;
	height: 100%;
	padding: 20px 40px;
	border: 1.25px solid #4089FF;
	box-sizing: border-box;
	background-color: #000015;
}
.bottom-container{
    flex: 1;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
}
.left{
	transform-origin: left top;
	width: 250px;
	height: 250px;
}
.right{
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 250px;
}
.right .top{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 440px;
	height: 100px;
	box-sizing: border-box;
	background-color: #000000;
}
.top .jihua-baoxiu{
	width: 210px;
	height: 100px;
	line-height: 100px;
	text-align: center;
	border: 2.5px solid #4089FF;
	box-sizing: border-box;
}
.baoxiu-val{
	color: #00C8FF;
}
.right .bottom{
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 440px;
	height: 100px;
	border: 2.5px solid #4089FF;
	box-sizing: border-box;
	background-color: #000000;
}
.jun-gong{
	flex: 1;
	border-right: 2.5px solid #3D84F6;
	height: 60px;
	text-align: center;
}
.jun-gong-val{
	color: #02FF9A;
}
.zai-xiu{
	flex: 1;
	border-left: 2.5px solid #3D84F6;
	height: 60px;
	text-align: center;
}
</style>