<template>
	<div id='jizhong-qingxiu'>
		<investitemtitle titleName="集中抢修情况">
			<div slot="content" class="screen-count"></div>
		</investitemtitle>

        <div class="bottom-container">
			<div class="left" id='jizhong_qingxiu_pie' :style="{transform: 'scale('+scale+')'}"></div>
			<div class="right">
				<div class="top">派单：<span class="pai-dan">{{qingxiu?qingxiu.dispatched:''}}</span></div>
				<div class="bottom">
					就近安排抢修数：<span class="qingxiu-val">{{qingxiu?qingxiu.nearby:''}}</span>
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
	name: 'jizhong-qingxiu',
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
		// this.initPie();
	},
	methods:{
    	changeScale(){ //echarts图表不同屏幕缩放
          this.scale = window.innerWidth/11520;
      	},
		initPie(newVal){ //初始化饼图
			let myChart = echarts.init(document.getElementById("jizhong_qingxiu_pie"));

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
					top:'25%',
					style:{
						text:`${newVal.checkIn}`,
						fill:'#ffffff',
						font:'50px PingFangSC-Medium'
					}
				},{
					type:'text',
					left:'center',
					top:'52%',
					style:{
						text:'接报',
						fill:'#ffffff',
						font:'40px PingFangSC-Regular'
					}
				}],
				series: {
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
							value:`${newVal.dispatched}`,
							name:'派单',
							itemStyle:{
								color: '#00C8FF'
							}
						},
						{
							value:`${newVal.nearby}`,
							name:'抢修',
							itemStyle:{
								color: '#FFB300'
							}
						}
					]
				}
			});
		},
	},
	computed:{
		...mapState('locomotiveguarantee',{
			qingxiu(state){
				if(state.jiwu_baoxiu_baoyang_liujiao){
					let data = state.jiwu_baoxiu_baoyang_liujiao.rushRepair;
					this.$nextTick(function(){
						this.initPie(data);
					});
					return data;
				}
				return null;
			},
		}),
	},
}
</script>

<style lang="postcss" scoped>
#jizhong-qingxiu{
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
	width: 210px;
	height: 100px;
	line-height: 100px;
	text-align: center;
	border: 2.5px solid #4089FF;
	box-sizing: border-box;
	background-color: #000000;
}
.pai-dan{
	color: #49D8FF;
}
.right .bottom{
	width: 440px;
	height: 100px;
	line-height: 100px;
	text-align: center;
	border: 2.5px solid #4089FF;
	box-sizing: border-box;
	background-color: #000000;
}
.qingxiu-val{
	color: #FFB300;
}
</style>