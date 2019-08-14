<template>
	<div id='sheshi-shebei'>
		<investitemtitle titleName="设施设备监控">
			<div slot="content" class="screen-count">{{changzhanJiankong?'':''}}</div>
		</investitemtitle>

        <div class="bottom-container">
			<div class="item-com">
				<img v-if="siteFacility" class="img-icon" src="../../../../../../resource/images/cloud/monitor/安全hl.png" />
				<img v-else class="img-icon" src="../../../../../../resource/images/cloud/monitor/异常hl.png" />
				<span>场地设施设备</span>
				<span v-if="!siteFacility" class="red-dot">{{changzhanJiankong?changzhanJiankong.siteFacility:''}}</span>
				<span  class="white-dot">{{allSiteFacilityNum}}</span>
			</div>
			<div class="item-com">
				<img v-if="importantRoad" class="img-icon" src="../../../../../../resource/images/cloud/monitor/安全hl.png" />
				<img v-else class="img-icon" src="../../../../../../resource/images/cloud/monitor/异常hl.png" />
				<span>重要道路</span>
				<span v-if="!importantRoad" class="red-dot">{{changzhanJiankong?changzhanJiankong.importantRoad:''}}</span>
				<span  class="white-dot">{{allImportantRoadNum}}</span>
			</div>
			<div class="item-com">
				<img v-if="fireExits" class="img-icon" src="../../../../../../resource/images/cloud/monitor/安全hl.png" />
				<img v-else class="img-icon" src="../../../../../../resource/images/cloud/monitor/异常hl.png" />
				<span>消防通道情况</span>
				<span v-if="!fireExits" class="red-dot">{{changzhanJiankong?changzhanJiankong.fireExits:''}}</span>
				<span  class="white-dot">{{allFireExitsNum}}</span>
			</div>
        </div>

	</div>
</template>

<script>
import { mapState } from 'vuex';
import investitemtitle from '../../../../common/cloudmonitor/sourceinvest/investitemtitle.vue';

export default {
	name: 'sheshi-shebei',
	components: {
		investitemtitle
	},
	data () {
		return {
			siteFacility:true,
			importantRoad:true,
			fireExits:true,
			allSiteFacilityNum:0,
			allImportantRoadNum:0,
			allFireExitsNum:0,
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
					let data = state.weixianWeizhang_jianKong.facility;

					this.siteFacility = data.siteFacility == '0';
					this.importantRoad = data.importantRoad == '0';
					this.fireExits = data.fireExits == '0';

					this.allSiteFacilityNum = data.allSiteFacilityNum;
					this.allImportantRoadNum = data.allImportantRoadNum;
					this.allFireExitsNum = data.allFireExitsNum;

					return data;
				}
				return null;
			},
		}),
	},
}
</script>

<style lang="postcss" scoped>
#sheshi-shebei{
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
	width: 100%;
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