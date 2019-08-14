<template>
	<div id='changdi-weizhang'>
		<investitemtitle titleName="场地违章监控">
			<div slot="content" class="screen-count">{{changzhanJiankong?'':''}}</div>
		</investitemtitle>

        <div class="bottom-container">
			<div class="item-com">
				<img v-if="nonMotorRiding" class="img-icon" src="../../../../../../resource/images/cloud/monitor/安全.png" />
				<img v-else class="img-icon" src="../../../../../../resource/images/cloud/monitor/异常hl.png" />
				<span>非机动车骑行</span>
				<span v-if="!nonMotorRiding" class="red-dot">{{changzhanJiankong?changzhanJiankong.nonMotorRiding:''}}</span>
			</div>
			<div class="item-com">
				<img class="img-icon" src="../../../../../../resource/images/cloud/monitor/安全.png" />
				<!-- <img class="img-icon" src="../../../../../../resource/images/cloud/monitor/异常hl.png" /> -->
				<span class="opcityFont">违章项目</span>
				<!-- <span class="red-dot">2</span> -->
			</div>
			<div class="item-com">
				<img class="img-icon" src="../../../../../../resource/images/cloud/monitor/安全.png" />
				<!-- <img class="img-icon" src="../../../../../../resource/images/cloud/monitor/异常hl.png" /> -->
				<span class="opcityFont">违章项目</span>
				<!-- <span class="red-dot">2</span> -->
			</div>
        </div>

	</div>
</template>


<script>
import { mapState } from 'vuex';
import investitemtitle from '../../../../common/cloudmonitor/sourceinvest/investitemtitle.vue';

export default {
	name: 'changdi-weizhang',
	components: {
		investitemtitle
	},
	data () {
		return {
			nonMotorRiding:true,
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
					let data = state.weixianWeizhang_jianKong.siteViolation;

					this.nonMotorRiding = data.nonMotorRiding == '0';
					
					return data;
				}
				return null;
			},
		}),
	},
}
</script>

<style lang="postcss" scoped>
#changdi-weizhang{
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
}
.img-icon{
	width: 100px;
	height: 120px;
}
.opcityFont{
	opacity: 0.3;
}
</style>