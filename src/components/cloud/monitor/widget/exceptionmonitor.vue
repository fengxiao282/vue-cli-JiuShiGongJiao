<template>
<div class="container">	<!-- 云监控异常 -->
<section class="main">
    
	<div id="exceptionmonitor">
		<!-- left -->
		<div class="left">

			<div class="left-1">
				<moduleleft1/>	<!-- 车辆异常处理 -->
				<moduleleft2/>	<!-- 新能源异常 -->
			</div>

			<moduleleft3/>	<!-- 大间隔异常情况 -->
			<moduleleft4/>	<!-- 大客流站点情况 -->

			<div class="left-4">
				<moduleleft5/>	<!-- 进出场异常 -->
				<moduleleft6/>	<!-- 一车一检 -->
			</div>
		</div>

		<!-- right -->
		<div class="right">	<!-- 异常提醒 -->
			<moduleright1/>
		</div>


	</div>

</section>
</div>
</template>

<script>
import { mapState } from 'vuex';
import investitemtitle from '../../../common/cloudmonitor/sourceinvest/investitemtitle.vue';
import moduleleft1 from './exceptionmonitorsubcomponents/moduleleft1.vue';
import moduleleft2 from './exceptionmonitorsubcomponents/moduleleft2.vue';
import moduleleft3 from './exceptionmonitorsubcomponents/moduleleft3.vue';
import moduleleft4 from './exceptionmonitorsubcomponents/moduleleft4.vue';
import moduleleft5 from './exceptionmonitorsubcomponents/moduleleft5.vue';
import moduleleft6 from './exceptionmonitorsubcomponents/moduleleft6.vue';
import moduleright1 from './exceptionmonitorsubcomponents/moduleright1.vue';
``
export default {
	name: 'exception-monitor',
	components: {
		investitemtitle,
		moduleleft1,
		moduleleft2,
		moduleleft3,
		moduleleft4,
		moduleleft5,
		moduleleft6,
		moduleright1
	},
	data(){
		return{
		}
	},
	created(){
	},
	methods:{
	},
}
</script>
<style lang="postcss" scoped>
/*基本布局*/
.container{
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: #000000;
}
.container .main{
	width: 2450px;
	height: 2125px;
	box-sizing: border-box;
	border-top: 5px solid #4089FF;
	border-bottom: 5px solid #4089FF;
	padding: 37.5px 40px 37.5px 50px;
}
#exceptionmonitor{
	font-family: PingFangSC-Medium;
	font-size: 40px;
	color: #FFF;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
/* left */
.left{
	width: 1560px;
	height: 2040px;
}
.left-1{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	height: 370px;
	margin-bottom: 40px;
}
.left-4{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	height: 370px;
}

/* right */
.right{
	width: 760px;
	height: 2040px;
	box-sizing: border-box;
	border: 1.25px solid #4089FF;
}
</style>
