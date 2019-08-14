<template>
	<div class="left-com-1"> <!-- 新能源异常 -->
		<investitemtitle titleName="新能源异常">
			<div slot="content" class="screen-count"><span class="outer-text">新能源车接入<span class="inner-text">2425</span>辆</span></div>
		</investitemtitle>
		<div class="left-1-2-foot">
			<div class="left-1-2-foot-1">
				<div>三级警报</div>
				<div class="height-light">{{xinNengYuan_yiChang.level3}}</div>
			</div>
			<div class="left-1-2-foot-2">
				<div>二级警报</div>
				<div>{{xinNengYuan_yiChang.level2}}</div>
			</div>
			<div class="left-1-2-foot-3">
				<div>一级警报</div>
				<div>{{xinNengYuan_yiChang.level1}}</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import investitemtitle from '../../../../common/cloudmonitor/sourceinvest/investitemtitle.vue';

export default {
	name: 'moduleleft2',
	components: {investitemtitle},
	data(){
		return{
			xinnengyuan_timer:null,
		}
	},
	created(){
		// 新能源异常
		this.$store.dispatch('exceptionmonitor/xinNengYuan_yiChang');
		this.getData();
	},
	beforeDestroy(){
		clearTimeout(this.xinnengyuan_timer);
	},
	methods:{
		getData(){	//轮询(5分钟)
			if(this.xinnengyuan_timer){
					clearTimeout(this.xinnengyuan_timer);
			}
			this.xinnengyuan_timer = setTimeout(()=>{
				this.$store.dispatch('exceptionmonitor/xinNengYuan_yiChang');
				this.xinnengyuan_timer = null;
				this.getData();
			},300000)
		},
		// getData(){	//轮询(5分钟)
		// 	this.xinnengyuan_timer = setTimeout(()=>{
		// 		this.$store.dispatch('exceptionmonitor/xinNengYuan_yiChang');
		// 		clearTimeout(this.xinnengyuan_timer);
		// 		this.getData();
		// 	},300000)
		// }
	},
	computed:{
		...mapState('exceptionmonitor',['xinNengYuan_yiChang']),
	},
}
</script>
<style lang="postcss" scoped>
.left-com-1{
	width:760px;
	height:370px;
	box-sizing: border-box;
	background: #000015;
	border: 1.25px solid #4089FF;
	padding: 20px 40px;
}
.outer-text{
	font-size: 30px;
}
.inner-text{
	font-size: 45px;
	color: #02FF9A;
}
/* left-1-1 header */
.screen-count{
	font-family: PingFangSC-Medium;
	font-size: 45px;
	line-height: 60px;
	color: #FFF;
}

.left-1-2-foot{
	height: 170px;
	width: 100%;
	margin-top: 50px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.left-1-2-foot > div{
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 170px;
	padding: 20px;
	box-sizing: border-box;
	text-align: center;
	background-color: #000000;
}
.left-1-2-foot-1{
	border: 2.5px solid #FF3939;
}
.height-light{
	color: #FF3939;
}
.left-1-2-foot-2{
	border: 2.5px solid #3D84F6;
}
.left-1-2-foot-3{
	border: 2.5px solid #3D84F6;
}

</style>
