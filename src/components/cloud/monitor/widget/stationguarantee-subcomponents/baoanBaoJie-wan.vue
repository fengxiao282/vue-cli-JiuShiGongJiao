<template>
	<div id='baoanBaoJie-wan'>
		<investitemtitle titleName="保安保洁人员晚上岗">
			<div slot="content" class="screen-count"></div>
		</investitemtitle>

        <div class="bottom-container">

			<div class="item-com top">
				<div class="item-left font50">
					<img class="img-icon" src="../../../../../../resource/images/cloud/monitor/保安.png" alt="保安">
					&nbsp;保安
				</div>

				<div class="item-center">
					<div class="item-center-top">
						<div :style="{width : baoAnRatio}" class="shang-gang-val"></div>
					</div>
					<div class="item-center-bottom">
						<span>{{zaoShangGang?zaoShangGang.security.actual:''}}</span>
						<span>{{zaoShangGang?zaoShangGang.security.plan:''}}</span>
					</div>
				</div>

				<div class="item-right font50">{{baoAnRatio}}</div>
			</div>

			<div class="item-com">
				<div class="item-left font50">
					<img class="img-icon" src="../../../../../../resource/images/cloud/monitor/保洁.png" alt="保洁">
					&nbsp;保洁
				</div>

				<div class="item-center">
					<div class="item-center-top">
						<div :style="{width : baoJieRatio}" class="shang-gang-val"></div>
					</div>
					<div class="item-center-bottom">
						<span>{{zaoShangGang?zaoShangGang.cleaner.actual:''}}</span>
						<span>{{zaoShangGang?zaoShangGang.cleaner.plan:''}}</span>
					</div>
				</div>

				<div class="item-right font50">{{baoJieRatio}}</div>
			</div>

        </div>

	</div>
</template>


<script>
import { mapState } from 'vuex';
import investitemtitle from '../../../../common/cloudmonitor/sourceinvest/investitemtitle.vue';

export default {
	name: 'baoanBaoJie-wan',
	components: {
		investitemtitle
	},
	data () {
		return {
			baoAnRatio:0,
			baoJieRatio:0,
		}
	},
	methods:{
		computeProgress(actual = 0, plan = 0, type){

			let ratio = (parseInt(actual)/parseInt(plan)*100).toFixed(1)+'%';
			if(ratio == '100.0%'){
				ratio = '100%';
			}
			if(plan == 0){
				ratio = '';
			}

			if(type == '保安'){
				this.baoAnRatio = ratio;
			}else{
				this.baoJieRatio = ratio;
			}
		},
	},
	computed:{
		...mapState('stationguarantee',{
			zaoShangGang(state){
				if(state.zaowan_shanggang){
					let data = state.zaowan_shanggang.pm;
					this.computeProgress(data.security.actual,data.security.plan, '保安');
					this.computeProgress(data.cleaner.actual,data.cleaner.plan, '保洁');
					return data;
				}
				return null;
			},
		}),
	},
}
</script>

<style lang="postcss" scoped>
#baoanBaoJie-wan{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
	width: 1160px;
	height: 420px;
	padding: 20px 40px;
	border: 1.25px solid #4089FF;
	box-sizing: border-box;
	background-color: #000015;
}
.bottom-container{
    flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.item-com{
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 50%;
	width: 980px;
}
.top{
	border-bottom: 1.25px dashed #4089FF;
}
.item-left{
	width:205px;
	height: 70px;
	line-height: 70px;
}
.img-icon{
	width: 50px;
	height: 50px;
	margin-bottom: -10px;
}
.item-center{
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
}
.item-center-top{
	width: 540px;
	height: 25px;
	background-color: #002846;
}
.shang-gang-val{
	background-color: #368CFF;
	height: 100%;
}
.item-center-bottom{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 540px;
	height: 40px;
	line-height: 40px;
	margin-top: 5px;
	color: #cccccc;
}
.item-right{
	width:180px;
	height: 80px;
	line-height: 80px;
	text-align: center;
	background-color: #002846;
}
.font50{
	font-size: 50px;
}
</style>