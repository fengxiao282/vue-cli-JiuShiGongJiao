<template>
	<div id='baoanBaoJie-wan'>
		<investitemtitle titleName="管理人员晚上岗">
			<div slot="content" class="screen-count"></div>
		</investitemtitle>

        <div class="bottom-container">
			<div class="left" id='baoanBaoJie_wan_pie' :style="{transform: 'scale('+scale+')'}"></div>
			<div class="right">
				<div class="item-container">
					<div class="item-title">计划</div>
					<div class="item-body-com bai-color">{{zaoShangGang?zaoShangGang.plan:'— —'}}</div>
				</div>
				<div class="item-container">
					<div class="item-title">实际</div>
					<div class="item-body-com">{{zaoShangGang?zaoShangGang.actual:'— —'}}</div>
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
	name: 'baoanBaoJie-wan',
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

			let lv = (parseInt(newVal.actual)/parseInt(newVal.plan)*100).toFixed(1);
			if(lv == 100.0){
				lv = 100;
			}
			let actual = newVal.actual;
			let weiShangGang = parseInt(newVal.plan) - parseInt(newVal.actual);

			let myChart = echarts.init(document.getElementById("baoanBaoJie_wan_pie"));

            myChart.resize({
                width: 260,
                height: 260
            });

			myChart.setOption({
				tooltip: {
					trigger: 'item',
					formatter: "{b}：{c} <br/>占比：{d}%"
				},
				graphic:[{
					type:'text',
					left:'center',
					top:'31%',
					style:{
						text:`${lv}%`,
						fill:'#02FF9A',
						font:'50px PingFangSC-Medium'
					}
				},{
					type:'text',
					left:'center',
					top:'54%',
					style:{
						text:'上岗率',
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
							value:actual,
							name:'上岗',
							itemStyle:{
								color: '#02FF9A'
							}
						},
						{
							value:weiShangGang,
							name:'未上岗',
							itemStyle:{
								color: '#43494F'
							}
						}
					]
				}
			});
		},
	},
	computed:{
		...mapState('stationguarantee',{
			zaoShangGang(state){
				if(state.zaowan_shanggang){
					let data = state.zaowan_shanggang.pm.manager;
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
#baoanBaoJie-wan{
    display: flex;
    flex-direction: column;
    justify-content:space-between;
	width: 1160px;
	height: 370px;
	padding: 20px 40px;
	border: 1.25px solid #4089FF;
	box-sizing: border-box;
	background-color: #000015;
}
.bai-color{
	color: #ffffff !important;
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
	width: 260px;
	height: 260px;
}
.right{
	flex: 1;
    height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
    align-items: center;
	padding: 0 45px;
	box-sizing: border-box;
}
.item-container{
	width: 320px;
	height: 170px;
	border: 2.5px solid #4089FF;
	box-sizing: border-box;
}
.item-container .item-title{
	height: 85px;
	line-height: 85px;
	text-align: center;
}
.item-body-com{
	height: 85px;
	line-height: 60px;
	text-align: center;
	color: #02FF9A;
	font-size: 60px;
}
</style>