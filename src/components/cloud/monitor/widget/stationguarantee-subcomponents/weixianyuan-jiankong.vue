<template>
	<div id='weixianyuan-jiankong'>
		<investitemtitle titleName="危险源监控">
			<div slot="content" class="screen-count">{{changzhanJiankong?'':''}}</div>
		</investitemtitle>

        <div class="bottom-container">
			<div class="item-com">
				<img v-if="siteGas" class="img-icon" src="../../../../../../resource/images/cloud/monitor/安全hl.png" />
				<img v-else class="img-icon" src="../../../../../../resource/images/cloud/monitor/异常hl.png" />
				<span>场地加油站</span>
				<span v-if="!siteGas" class="red-dot">{{changzhanJiankong?changzhanJiankong.siteGas:''}}</span>
				<span  class="white-dot">{{allSiteGas}}</span>
			</div>
			<div class="item-com">
				<img v-if="chemicalsOuter" class="img-icon" src="../../../../../../resource/images/cloud/monitor/安全hl.png" />
				<img v-else class="img-icon" src="../../../../../../resource/images/cloud/monitor/异常hl.png" />
				<span>危化品库房外围</span>
				<span v-if="!chemicalsOuter" class="red-dot">{{changzhanJiankong?changzhanJiankong.chemicalsOuter:''}}</span>
				<span  class="white-dot">{{allchemicalsOuter}}</span>
			</div>
			<div class="item-com">
				<img v-if="constructionSite" class="img-icon" src="../../../../../../resource/images/cloud/monitor/安全hl.png" />
				<img v-else class="img-icon" src="../../../../../../resource/images/cloud/monitor/异常hl.png" />
				<span>维修施工项目现场</span>
				<span v-if="!constructionSite" class="red-dot">{{changzhanJiankong?changzhanJiankong.constructionSite:''}}</span>
				<span  class="white-dot">{{allConstructionSite}}</span>
			</div>
        </div>

	</div>
</template>

<script>
import { mapState } from 'vuex';
import investitemtitle from '../../../../common/cloudmonitor/sourceinvest/investitemtitle.vue';

export default {
	name: 'weixianyuan-jiankong',
	components: {
		investitemtitle
	},
	data () {
		return {
			siteGas:true,
			chemicalsOuter:true,
			constructionSite:true,
			allSiteGas:0,
			allchemicalsOuter:0,
			allConstructionSite:0,
		}
	},
	mounted(){
	},
	methods:{
	},
	computed:{
		...mapState('stationguarantee',{
			changzhanJiankong(state){
				if(state.weixianWeizhang_jianKong){
					let data = state.weixianWeizhang_jianKong.riskSource;

					this.siteGas = data.siteGas == '0';
					this.chemicalsOuter = data.chemicalsOuter == '0';
					this.constructionSite = data.constructionSite == '0';

					this.allSiteGas = data.allSiteGas;
					this.allchemicalsOuter = data.allchemicalsOuter;
					this.allConstructionSite = data.allConstructionSite;

					return data;
				}
				return null;
			},
		}),
	},
}
</script>

<style lang="postcss" scoped>
#weixianyuan-jiankong{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
	width: 1160px;
	height: 370px;
	padding: 20px 40px;
	border: 1.25px solid #4089FF;
	box-sizing: border-box;
	background-color: #000015;
}
.bottom-container{
    flex: 1;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
}
.item-com{
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	width: 33%;
	height: 210px;
}
.red-dot{
	position: absolute;
	top: -15px;
	right: 85px;
	width: 45px;
	height: 45px;
	line-height: 45px;
	text-align: center;
	border-radius: 50%;
	background-color: #FF3939;
	z-index: 2;
	font-size: 30px;
}
.white-dot{
	position: absolute;
	top: 95px;
	right: 85px;
	width: 45px;
	height: 45px;
	line-height: 45px;
	text-align: center;
	border-radius: 50%;
	/* background-color: #02FF9A; */
	border: 2.5px solid #4089FF;
	z-index: 2;
	font-size: 30px;
}
.img-icon{
	width: 100px;
	height: 120px;
}
</style>