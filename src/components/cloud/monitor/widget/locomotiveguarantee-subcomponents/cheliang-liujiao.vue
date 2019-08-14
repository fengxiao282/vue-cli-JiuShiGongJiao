<template>
	<div id='cheliang-liujiao'>
		<investitemtitle titleName="车辆留交情况">
			<div slot="content" class="screen-count"></div>
		</investitemtitle>

        <div class="bottom-container">
			<div class="left">
				<div class="zuo-ri">
					<div class="liujiao-title">昨日留交</div>
					<div class="liujiao-val">{{total}}</div>
				</div>
				<div class="horizonntal-line"></div>
				<div class="vertical-line"></div>
				<div class="zhaoshi-changfang-chejian">
					<div class="liujiao-item">肇事留交:{{liujiao?liujiao.trouble:''}}</div>
					<div class="liujiao-item">厂方留交:{{liujiao?liujiao.factorySide:''}}</div>
					<div class="liujiao-item">车间留交:{{liujiao?liujiao.workshop:''}}</div>
				</div>
			</div>
			<div class="right">
				<div id='cheliang_liujiao_pie' :style="{transform: 'scale('+scale+')'}"></div>
				<div class="right-2">
					<div class="right-2-2">
						<div class="gongsi-list">一公司: {{liujiao?liujiao.list[0].count:''}}</div><div class="gongsi-list">二公司: {{liujiao?liujiao.list[1].count:''}}</div>
					</div>
					<div class="right-2-2">
						<div class="gongsi-list">三公司: {{liujiao?liujiao.list[2].count:''}}</div><div class="gongsi-list">四公司: {{liujiao?liujiao.list[3].count:''}}</div>
					</div>
					<div class="right-2-2">五公司: {{liujiao?liujiao.list[4].count:''}}</div>
				</div>
			</div>
        </div>

	</div>
</template> 

<script>
import { mapState } from 'vuex';
import investitemtitle from '../../../../common/cloudmonitor/sourceinvest/investitemtitle.vue';
import { connect } from 'net';
let echarts = require('echarts');
export default {
	name: 'cheliang-liujiao',
	components: {
		investitemtitle
	},
	data () {
		return {
			scale: 1,
			total:'',
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
			let list = newVal.list;
			let all = 0;
			for(let i=0;i<list.length;i++){
				all += parseInt(list[i].count);
			}

			// let lv0 = (parseInt(list[0].count)/all*100).toFixed(1);
			// let lv1 = (parseInt(list[1].count)/all*100).toFixed(1);
			// let lv2 = (parseInt(list[2].count)/all*100).toFixed(1);
			// let lv3 = (parseInt(list[3].count)/all*100).toFixed(1);
			// let lv4 = (parseInt(list[4].count)/all*100).toFixed(1);

			let lv0 = (parseInt(list[0].count)/all*100).toFixed(0);
			let lv1 = (parseInt(list[1].count)/all*100).toFixed(0);
			let lv2 = (parseInt(list[2].count)/all*100).toFixed(0);
			let lv3 = (parseInt(list[3].count)/all*100).toFixed(0);
			let lv4 = (parseInt(list[4].count)/all*100).toFixed(0);

			let myChart = echarts.init(document.getElementById("cheliang_liujiao_pie"));

            myChart.resize({
                width: 300,
                height: 300
            });

			myChart.setOption({
				// tooltip: {
				// 	trigger: 'item',
				// 	formatter: "{b}：{c} <br/>占比：{d}%"
				// },
				textStyle:{
					fontSize:25,
					fontFamily:'PingFangSC-Medium'
				},
				series: {
					type: 'pie',
					radius: ['0%', '80%'],
					center: ['50%', '50%'],
					label: {
						normal: {
							show: true,
							position:'inside'
						}
					},
					labelLine: {
						normal: {
							show: false,
						}
					},
					data: [
						{
							value:lv0,
							name:`${lv0}%`,
							itemStyle:{
								color: '#6F00FF'
							}
						},
						{
							value:lv1,
							name:`${lv1}%`,
							itemStyle:{
								color: '#4968FB'
							}
						},
						{
							value:lv2,
							name:`${lv2}%`,
							itemStyle:{
								color: '#FFB300'
							}
						},
						{
							value:lv3,
							name:`${lv3}%`,
							itemStyle:{
								color: '#21E2B7'
							}
						},
						{
							value:lv4,
							name:`${lv4}%`,
							itemStyle:{
								color: '#0049FF'
							}
						}
					]
				}
			});
		},
	},
	computed:{
		...mapState('locomotiveguarantee',{
			liujiao(state){
				if(state.jiwu_baoxiu_baoyang_liujiao){
					let data = state.jiwu_baoxiu_baoyang_liujiao.retain;
					this.total = parseInt(data.trouble) + parseInt(data.factorySide) + parseInt(data.workshop);
					// console.log(data)
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
#cheliang-liujiao{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
	width: 1560px;
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
	position: relative;
	flex: 1;
	height: 100%;
}
.zuo-ri{
	position: absolute;
	left:0;
	bottom:70px;
	width: 280px;
	height: 170px;
	border: 2.5px solid #4089FF;
	box-sizing: border-box;
}
.liujiao-title{
	width: 100%;
	height: 85px;
	line-height: 90px;
	text-align: center;
}
.liujiao-val{
	width: 100%;
	height: 85px;
	line-height: 80px;
	font-size: 60px;
	text-align: center;
}
.horizonntal-line{
	position: absolute;
	left: 280px;
	bottom: 150px;
	width: 78px;
	border:2.5px solid #4089FF;
	border-bottom-style: none;
}
.vertical-line{
	position: absolute;
	left:330px;
	bottom:40px;
	width: 30px;
	height: 225px;
	border: 2.5px solid #4089FF;
	border-right-style: none;
	box-sizing: border-box;
}
.zhaoshi-changfang-chejian{
	position: absolute;
	left: 360px;
	bottom:0;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 320px;
	height: 310px;
}
.liujiao-item{
	width: 315px;
	height: 80px;
	line-height: 80px;
	text-align: center;
	border: 2.5px solid #4089FF;
	box-sizing: border-box;
}

.right{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 800px;
	height: 100%;
	padding-left: 20px;
	box-sizing: border-box;
}
#cheliang_liujiao_pie{
	transform-origin: left top;
	width: 300px;
	height: 300px;
}
.right-2{
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
}
.right-2-2{
	display: flex;
	flex-direction: row;
	height: 70px;
	line-height: 70px;
	width: 465px;
	text-align: center;
	box-sizing: border-box;
}
.gongsi-list{
	flex: 1;
	text-align: left;
}
</style>