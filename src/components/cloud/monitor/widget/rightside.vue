<template>
	<div class="container">
		<section class="navgation">
			<div :class="['row-1',activeStatus[0]?'active':'']" @click="changeActiveStatus(0)">异常处理情况</div>
			<div :class="['row-2',activeStatus[1]?'active':'']" @click="changeActiveStatus(1)">供电保障</div>
			<div :class="['row-3',activeStatus[2]?'active':'']" @click="changeActiveStatus(2)">机务保障</div>
			<div :class="['row-4',activeStatus[3]?'active':'']" @click="changeActiveStatus(3)">场站保障</div>
		</section>

		<section class="main">
			<div v-if="activeStatus[0]"><ExceptionMonitor/></div>
			<div v-else-if="activeStatus[1]"><PowerGuarantee/></div>
			<div v-else-if="activeStatus[2]"><LocomotiveGuarantee/></div>
			<div v-else-if="activeStatus[3]"><StationGuarantee/></div>
		</section>
	</div>
</template>

<script>
//异常监控
import ExceptionMonitor from './exceptionmonitor'
//供电保障
import PowerGuarantee from './powerguarantee'
//场站保障
import StationGuarantee from './stationguarantee'
//机务保障
import LocomotiveGuarantee from './locomotiveguarantee'

export default {
	name: 'right-side',
	components: {ExceptionMonitor,PowerGuarantee,StationGuarantee,LocomotiveGuarantee},
	data(){
		return {
			activeStatus: [true,false,false,false],
		}
	},
	methods: {
		changeActiveStatus(index){
			this.activeStatus = [false,false,false,false];
			this.activeStatus[index] = true;
		},
	}
}
</script>

<style lang="postcss" scoped>
/*基本布局*/
.container{
	width: 2590px;
	height: 2125px;
	display: flex;
	justify-content: space-between;
}
.container .main{
	width: 2450px;
	height: 2125px;
	box-sizing: border-box;
	border-top: 5px solid #4089FF;
	border-bottom: 5px solid #4089FF;
	padding: 37.5px 40px 37.5px 50px;
}
.container .navgation{
	width: 140px;
	height: 2125px;
	display: flex;
	flex-direction: column;
	text-align: center;
}

/*main*/

/*navgation*/
.container .navgation .active{
	box-shadow: inset 0px 0px 40px 0px #3B86FF;
}
.container .navgation .row-1,
.container .navgation .row-2,
.container .navgation .row-3,
.container .navgation .row-4{
	display: flex;
	align-items: center;

	box-sizing: border-box;
	width: 140px;
	border: 2.5px solid #4089FF;
	padding: 30px;

	font-size: 60px;
	line-height: 70px;
	color: #4089FF;
	font-family: PingFangSC-Medium;

	cursor: pointer;
}
.container .navgation .row-1{
	height: 520px;
}
.container .navgation .row-2{
	height: 542.5px;
	/* opacity: 0.3; */
}
.container .navgation .row-3{
	height: 542.5px;
	/* opacity: 0.3; */
}
.container .navgation .row-4{
	height: 520px;
	/* opacity: 0.3; */
}
</style>