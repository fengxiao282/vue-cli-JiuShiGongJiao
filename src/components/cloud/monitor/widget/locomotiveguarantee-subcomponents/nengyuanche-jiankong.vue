<template>
	<div id='nengyuanche-jiankong'>
		<investitemtitle titleName="新能源车远程监控情况">
			<div slot="content" class="screen-count"></div>
		</investitemtitle>

        <div class="bottom-container">
			<div class="item">
				<div class="m-item-title">
					<img class="list-icon" src="../../../../../../resource/images/cloud/monitor/二级报警.png">&nbsp;
					三级报警
				</div>
				<div class="item-body">{{nengYuanCheJK?nengYuanCheJK.lv3:''}}</div>
			</div>
			<div class="item">
				<div class="m-item-title">需处理</div>
				<div class="item-body">{{nengYuanCheJK?nengYuanCheJK.lv3Hang:''}}</div>
			</div>
        </div>

	</div>
</template>


<script>
import { mapState } from 'vuex';
import investitemtitle from '../../../../common/cloudmonitor/sourceinvest/investitemtitle.vue';

export default {
	name: 'nengyuanche-jiankong',
	components: {
		investitemtitle
	},
	data () {
		return {
		}
	},
	mounted(){
		// 新能源车远程监控情况
		this.$store.dispatch('locomotiveguarantee/nengYuanChe_jiankong');
	},
	methods:{
	},
	computed:{
		...mapState('locomotiveguarantee',{
			nengYuanCheJK(state){
				if(state.nengYuanChe_jiankong){
					let data = state.nengYuanChe_jiankong;
					// console.log(data)
					return data;
				}
				return null;
			},
		}),
	},
}
</script>

<style lang="postcss" scoped>
#nengyuanche-jiankong{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
	width: 760px;
	height: 100%;
	padding: 20px 40px;
	border: 1.25px solid #4089FF;
	box-sizing: border-box;
	background-color: #000015;
}
.bottom-container{
    flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding-top: 60px;
	box-sizing: border-box;
}
.bottom-container .item{
	width: 680px;
	height: 170px;
	border: 2.5px solid #FF3939;
	box-sizing: border-box;
}
.m-item-title{
	height: 85px;
	line-height: 85px;
	text-align: center;
}
.item-body{
	height: 85px;
	line-height: 80px;
	text-align: center;
	color: #FF3939;
	font-size: 50px;
}
.list-icon{
	margin-bottom: -5px;
	width: 45px;
	height: 45px;
}
</style>