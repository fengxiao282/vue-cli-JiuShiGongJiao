<template>
	<div class="gauge-chart">
		<div class="title">
			{{titleName}}
			<div class="line line-1"></div>
			<div class="line line-2"></div>
		</div>

		<div class="chart" :style="{backgroundImage:`url(${chartbg})`}">
			<img class="arrow" :style="{transform: `rotate(${computedArrowDeg}deg)`}" src="../../../../../../../../resource/images/cloud/thinktank/passengeranalysis/gaugechart-arrow.png"/>
			<div class="comfort-value">
				<p v-if="comfortValue == 0">暂无</p>
				<p v-else-if="comfortValue > 0 && comfortValue <= 30" class="color-green">舒适</p>
				<p v-else-if="comfortValue > 30 && comfortValue <= 70" class="color-yellow">较舒适</p>
				<p v-else-if="comfortValue > 70 && comfortValue <= 100" class="color-red">拥挤</p>
			</div>
		</div>
	</div>
</template>

<script>
let chartbg = require('../../../../../../../../resource/images/cloud/thinktank/passengeranalysis/gaugechart-bg.png')

export default {
	name: 'comfort-gaugechart',
	props: {
		titleName: String,
		comfortValue: {
			type: Number,
			default: 0,
		},
	},
	data(){
		return {
			chartbg: chartbg,
			arrowDeg: 0,
		}
	},
	computed: {
		computedArrowDeg: function(){
			return 180*(this.comfortValue/100)
		}
	}
}
</script>

<style scoped lang="postcss">
.gauge-chart{
	width: 490px;
	height: 380px;
	margin: 0px 60px;
}
.gauge-chart .title{
	position: relative;
	width: 490px;
	height: 60px;
	text-align: center;
	font-size: 50px;
	line-height: 60px;
	color: #FFF;
	font-family: PingFangSC-Regular;
}
.gauge-chart .chart{
	position: relative;
	width: 490px;
	height: 300px;
	box-sizing: border-box;
	margin: 20px 0px 0px 0px;
	padding: 0px 30px;
	background-repeat: no-repeat;
	background-size: 430px 300px;
	background-position: 30px 0px;
}

/**/
.gauge-chart .title .line{
	position: absolute;
	width: 170px;
	height: 5px;
	background: linear-gradient(left,rgba(151,151,151,0.2) 0%,rgba(151,151,151,0.5) 100%);
}
.gauge-chart .title .line-1{
	left: 0px;
	top: 27.5px;
}
.gauge-chart .title .line-2{
	right: 0px;
	top: 27.5px;
	transform: rotate(180deg);
}

.gauge-chart .chart .arrow{
	position: absolute;
	left: 35px;
	top: 210px;
	width: 210px;
	height: 20px;
	transition: transform 1s ease;
	transform-origin: 100% 50%;
	transform: rotate(0deg);
}
.gauge-chart .chart .comfort-value{
	position: absolute;
	left: 0px;
	bottom: 0px;
	width: 490px;
	height: 50px;
}
.gauge-chart .chart .comfort-value p{
	margin: 0px;
	padding: 0px;
	text-align: center;
	font-size: 50px;
	line-height: 50px;
	color: #FFF;
	font-family: PingFangSC-Medium;
}
.gauge-chart .chart .comfort-value p.color-green{
	color: #00FF8D;
}
.gauge-chart .chart .comfort-value p.color-yellow{
	color: #FFFC00;
}
.gauge-chart .chart .comfort-value p.color-red{
	color: #FF0000;
}
</style>