<template>
	<div id='yunyingcheliang-jin'>
		<investitemtitle titleName="营运车辆进场情况">
			<div slot="content" class="screen-count"></div>
		</investitemtitle>

        <div class="bottom-container">
			<div class="item-com item-top">
				<img class="img-icon" src="../../../../../../resource/images/cloud/monitor/场站进场.png" />
				<div class="item-container">
					<div class="item-title">进场车辆总数</div>
					<div class="item-body-com">{{yingyunJinchu?yingyunJinchu.busCt:''}}</div>
				</div>
			</div>
			<div class="item-com item-bottom">
				<img class="img-icon" src="../../../../../../resource/images/cloud/monitor/拒检.png" />
				<div class="item-container">
					<div class="item-title">一车一检拒检数</div>
					<div class="item-body-com">{{yingyunJinchu?yingyunJinchu.refuseCheck:''}}</div>
				</div>
			</div>
        </div>

	</div>
</template>


<script>
import { mapState } from 'vuex';
import investitemtitle from '../../../../common/cloudmonitor/sourceinvest/investitemtitle.vue';

export default {
	name: 'yunyingcheliang-jin',
	components: {
		investitemtitle
	},
	data () {
		return {
		}
	},
	computed:{
		...mapState('stationguarantee',{
			yingyunJinchu(state){
				if(state.yingyun_jinchu){
					let data = state.yingyun_jinchu.in;
					return data;
				}
				return null;
			},
		}),
	},
}
</script>

<style lang="postcss" scoped>
#yunyingcheliang-jin{
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
	padding: 0 20px;
}
.item-com{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 470px;
	height: 200px;
}
.item-top{
	border: 2.5px solid #4089FF;
}
.item-bottom{
	border: 2.5px solid #FF3939;
}
.img-icon{
	width: 100px;
	height: 100px;
	/* margin-bottom: -10px; */
}
.item-container{
	width: 320px;
	height: 170px;
	/* border: 2.5px solid #4089FF;
	box-sizing: border-box; */
}
.item-title{
	height: 85px;
	line-height: 95px;
	text-align: center;
}
.item-body-com{
	height: 85px;
	line-height: 70px;
	text-align: center;
	font-size: 50px;
}
</style>