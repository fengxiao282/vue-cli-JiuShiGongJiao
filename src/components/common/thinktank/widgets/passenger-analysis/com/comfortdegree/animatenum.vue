<template>
	<div>
		<div class="item-num" v-show="value !== ','">
			<div class="num-item" v-show="!isAnimating">{{value}}</div>
			<div class="animate-num" v-if="isAnimating">
				<div class="num-item">1</div>
				<div class="num-item">9</div>
				<div class="num-item">5</div>
				<div class="num-item">3</div>
				<div class="num-item">8</div>
				<div class="num-item">2</div>
				<div class="num-item">4</div>
				<div class="num-item">7</div>
				<div class="num-item">6</div>
				<div class="num-item">0</div>
			</div>
		</div>
		<div class="no-num" v-show="value === ','">,</div>
	</div>
</template>

<script>
export default {
	name: 'animate-num',
	props: {
		value: [String,Number],
	},
	data(){
		return {
			isAnimating: false,
		}
	},
	watch: {
		value: function(newval,oldval){
			this.isAnimating = true;
			setTimeout(() => this.isAnimating = false, 1000);
		},
	},
	mounted(){
		this.isAnimating = true;
		setTimeout(() => this.isAnimating = false, 1000);
	}
}
</script>

<style scoped lang="postcss">
.item-num{
	position: relative;
	width: 50px;
	height: 70px;
	margin-right: 10px;
	border-radius: 10px;
	background: radial-gradient( rgba(0,164,255,0.10) 30%, rgba(0,164,255,0.3) 75%);
	overflow: hidden;
}
.item-num .animate-num{
	position: absolute;
	left: 0px;
	top: 0px;
	width: 50px;
	height: 700px;
	animation: animatenum 0.5s steps(9,start) infinite;
}
@keyframes animatenum{
	0%{
		top: 0px;
	}
	100%{
		top: -630px;
	}
}

.item-num .num-item{
	width: 50px;
	height: 70px;
	font-size: 60px;
	line-height: 70px;
	text-align: center;
	color: #49D8FF;
	font-family: EurostileBold;
}
.no-num{
	margin-right: 10px;
	font-size: 60px;
	line-height: 70px;
	text-align: center;
	color: #49D8FF;
	font-family: EurostileBold;
}
</style>