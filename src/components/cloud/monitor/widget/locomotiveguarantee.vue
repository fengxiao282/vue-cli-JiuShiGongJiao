<template>
<div class="container">	<!-- 机务保障 -->
<section class="main">
    
	<div id='locomotive-guarantee'>

		<div class="comClass cheLiang-zongTi-container"> <!-- 车辆总体情况 -->
			<cheliangzongti/>
		</div>

		<div class="comClass zaoChuChang-cheLiangLiuJiao-container"> <!-- 车辆留交情况 -->
			<zaochuchangbaoxiu/>
			<cheliangliujiao/>
		</div>

		<div class="comClass jiZhong-baoYang-xiaoXiu-container"> <!-- 集中抢修情况 -->
			<jizhongqingxiu/>
			<baoyangzhixing/>
			<xiaoxiuzhixing/>
		</div>

		<div class="comClass sanDayFuGai-xinNengYuanJianKong-container"> <!-- 三天一覆盖执行情况 -->
			<sandayfugai/>
			<nengyuanchejiankong/>
		</div>
		
	</div>

</section>
</div>
</template>


<script>
// import { mapState } from 'vuex';
// import investitemtitle from '../../../common/cloudmonitor/sourceinvest/investitemtitle.vue';
import cheliangzongti from './locomotiveguarantee-subcomponents/cheliang-zongti.vue';
import zaochuchangbaoxiu from './locomotiveguarantee-subcomponents/zaochuchang-baoxiu.vue';
import cheliangliujiao from './locomotiveguarantee-subcomponents/cheliang-liujiao.vue';
import jizhongqingxiu from './locomotiveguarantee-subcomponents/jizhong-qingxiu.vue';
import baoyangzhixing from './locomotiveguarantee-subcomponents/baoyang-zhixing.vue';
import xiaoxiuzhixing from './locomotiveguarantee-subcomponents/xiaoxiu-zhixing.vue';
import sandayfugai from './locomotiveguarantee-subcomponents/sanday-fugai.vue';
import nengyuanchejiankong from './locomotiveguarantee-subcomponents/nengyuanche-jiankong.vue';

export default {
	name: 'locomotive-guarantee',
	components: {
		cheliangzongti,
		zaochuchangbaoxiu,
		cheliangliujiao,
		jizhongqingxiu,
		baoyangzhixing,
		xiaoxiuzhixing,
		sandayfugai,
		nengyuanchejiankong
	},
	data () {
		return {
		}
	},
	mounted(){
		// 机务保障 - 维修、保养、留交详细情况
		this.$store.dispatch('locomotiveguarantee/jiwu_baoxiu_baoyang_liujiao');
	}
}
</script>

<style lang="postcss" scoped>
/* 记得下面要删除 */
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
/* 记得上面要删除 */
#locomotive-guarantee{
	background-color: #000000;
	font-family: PingFangSC-Medium;
	font-size: 40px;
	color: #FFF;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	height: 100%;
}
.comClass{
	width:2360px;
	background-color: #000000;
	box-sizing: border-box;
	margin-bottom: 40px;
	overflow: hidden;
}
.cheLiang-zongTi-container{
	height: 420px;
}
.zaoChuChang-cheLiangLiuJiao-container{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	height: 470px;
}
.jiZhong-baoYang-xiaoXiu-container{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	height: 470px;
}
.sanDayFuGai-xinNengYuanJianKong-container{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	height: 570px;
	margin-bottom: 0;
}
</style>