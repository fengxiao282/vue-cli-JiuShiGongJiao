<template>
<div class="container">
<section class="main">
	<div id='station-guarantee'> <!-- 场站保障 -->
		<div class="comClass changZhan-left">
			<guanlizao/>
			<baoanBaoJiezao/>
			<yunyingcheliangChu/>
			<sheshishebei/>
			<changdiweizhang/>
		</div>
		<div class="comClass changZhan-right">
			<guanliwan/>
			<baoanBaoJiewan/>
			<yunyingcheliangJin/>
			<weixianyuanjiankong/>
			<jiejiariactive/>
		</div>
	</div>
</section>
</div>
</template>
<script>
// import { mapState } from 'vuex';
// import investitemtitle from '../../../common/cloudmonitor/sourceinvest/investitemtitle.vue';
import guanlizao from './stationguarantee-subcomponents/guanli-zao.vue';
import guanliwan from './stationguarantee-subcomponents/guanli-wan.vue';
import baoanBaoJiezao from './stationguarantee-subcomponents/baoanBaoJie-zao.vue';
import baoanBaoJiewan from './stationguarantee-subcomponents/baoanBaoJie-wan.vue';
import yunyingcheliangChu from './stationguarantee-subcomponents/yunyingcheliang-chu.vue';
import yunyingcheliangJin from './stationguarantee-subcomponents/yunyingcheliang-jin.vue';
import sheshishebei from './stationguarantee-subcomponents/sheshi-shebei.vue';
import weixianyuanjiankong from './stationguarantee-subcomponents/weixianyuan-jiankong.vue';
import changdiweizhang from './stationguarantee-subcomponents/changdi-weizhang.vue';
import jiejiariactive from './stationguarantee-subcomponents/jiejiari-active.vue';

export default {
	name: 'station-guarantee',
	components: {
		guanlizao,
		guanliwan,
		baoanBaoJiezao,
		baoanBaoJiewan,
		yunyingcheliangChu,
		yunyingcheliangJin,
		sheshishebei,
		weixianyuanjiankong,
		changdiweizhang,
		jiejiariactive
	},
	data () {
		return {
		}
	},
	mounted(){
		// 管理人员 早/晚 上岗
		this.$store.dispatch('stationguarantee/zaowan_shanggang');

		// 营运车辆进出场情况
		this.$store.dispatch('stationguarantee/yingyun_jinchu');

		//设施设备、危险源、违章监控
		this.$store.dispatch('stationguarantee/weixianWeizhang_jianKong');

		//节假日及重大活动情况汇报
		this.$store.dispatch('stationguarantee/huodong_huibao');
	},
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
#station-guarantee{
	background-color: #000000;
	font-family: PingFangSC-Medium;
	font-size: 40px;
	color: #FFF;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 2360px;
	height: 2060px;
}
.comClass{
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
	width: 1160px;
}
</style>