<template>
<div id="gunLi-shanggang"> <!-- 现场管理人员上岗 left-->
	<div class="title">
		<img class="img-icon" src="../../../../../../resource/images/exposition/main/管理人员.png">
		现场管理人员上岗
		<div class="title-right"  @click="filter_data">
			<img :style="{transform: `rotate(${arror_angle}deg)`}" src="../../../../../../resource/images/cloud/monitor/safetycontrol/三角.png" class="img-icon-angle">
			筛选
		</div>
	</div>
	<div class="gunLiShanggang-body">
		<!-- left -->
		<div class="left">
			<div v-for="(item,index) in list1" :key="index" class="item-left">
				<div class="item-left-left">&nbsp;&nbsp;{{item.address}}</div>
				<div class="item-left-right" :style="{ 'color': item.actMans == item.planMans?'#28EA8D':'#FF3939' }">{{item.actMans}}/{{item.planMans}}</div>
			</div>
		</div>
		<!-- right -->
		<div class="right">
			<div class="right-list-header">
				<div class="list-cell-com right-list-cell-1">公司</div>
				<div class="list-cell-com right-list-cell-2">姓名</div>
				<div class="list-cell-com right-list-cell-3">职位</div>
				<div class="list-cell-com right-list-cell-4">到达岗点</div>
				<div class="list-cell-com right-list-cell-5">电台编号</div>
			</div>
			<div class="right-list-container">
				<div v-for="(item,index) in 10" :key="index" class="right-list-item">
					<div class="list-cell-com right-list-cell-1">一公司</div>
					<div class="list-cell-com right-list-cell-2">姓名三</div>
					<div class="list-cell-com right-list-cell-3">职位</div>
					<div class="list-cell-com right-list-cell-4">上下客点位置</div>
					<div class="list-cell-com right-list-cell-5">0015</div>
				</div>
			</div>
		</div>

		<div v-if="show_modal_filter" class="modal-filter">
			<div v-for="(item,index) in list" :key="index" class="modal-filter-item">{{item}}</div>
		</div>

	</div>

</div>
</template>
<script>
import { mapState } from 'vuex';

export default {
	name: 'gunLi-shanggang',
	components: {},
	data () {
		return {
			arror_angle:0,
			show_modal_filter:true,
			list:['全部已启动预案','轨交1号线应急支援','轨交2号线应急支援','轨交3号线应急支援','轨交4号线应急支援']
		}
	},
	created(){
		// 现场管理人员上岗 left
		this.$store.dispatch('emergencyPlan/manager_left',null);
	},
	methods:{
		filter_data(){
			this.arror_angle = (this.arror_angle == 180 ? 0 : 180);
			this.show_modal_filter = !this.show_modal_filter;
		},
	},
	computed:{
		...mapState('emergencyPlan',{
			list1(state){
				if(state.manager_left){
					return state.manager_left;
				}
				return [];
			},
		}),
	},
}
</script>

<style lang="postcss" scoped>
#gunLi-shanggang{
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	width: 100%;
	height: 100%;
}
.title{
	width: 100%;
	height: 80px;
	line-height: 80px;
	font-size: 50px;
	border-bottom: 2.5px solid #008BFF;
	padding-left: 40px;
	box-sizing: border-box;
}
.img-icon{
	width: 45px;
	margin-bottom: -5px;
}
.title-right{
	display: inline-block;
	height: 100%;
	float: right;
	cursor: pointer;
	font-size: 40px;
	margin-right: 50px;
}
.img-icon-angle{
	width: 20px;
	height: 20px;
}
.gunLiShanggang-body{
	position: relative;
	flex: 1;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 40px;
	box-sizing: border-box;
	font-family: PingFangSC-Regular;
}
/* left */
.left{
	height: 760px;
	width: 570px;
	overflow: auto;
}
.left::-webkit-scrollbar{
	display: none;
}
.item-left{
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	height: 110px;
	line-height: 110px;
	background: #000517;
	box-shadow: inset 0 0 20px 0 rgba(0,139,255,0.50);
	border-radius: 4px;
	margin-bottom: 20px;
	color: #3D9AFF;
}
.item-left:last-child{
	margin-bottom: 0;
}
.item-left-left{
	height: 100%;
	flex: 1;
	overflow: hidden;
	white-space: nowrap;
	text-overflow:ellipsis;
}
.item-left-right{
	width: 160px;
	height: 100%;
	text-align: center;
	background: #000517;
	box-shadow: inset 0 0 20px 0 rgba(0,139,255,0.50);
	border-radius: 4px;
}
/* right */
.right{
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	height: 760px;
	width: 950px;
	box-shadow: inset 0 0 20px 0 rgba(0,139,255,0.50);
	border-radius: 4px;
	padding: 20px;
	box-sizing: border-box;
	overflow: hidden;
}
.right-list-header{
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	height: 80px;
	color: #4089FF;
}
.right-list-container{
	width: 100%;
	flex: 1;
	overflow: auto;
}
.right-list-container::-webkit-scrollbar{
	display: none;
}
.right-list-item{
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	height: 80px;
	box-shadow: inset 0 0 20px 0 #008BFF;
	border-radius: 10px;
	margin: 0 auto 10px;
}
.list-cell-com{
	line-height: 80px;
	text-align: center;
	flex-grow:1;
}
.right-list-cell-1{
	width: 120px;
}
.right-list-cell-2{
	width: 120px;
}
.right-list-cell-3{
	width: 80px;
}
.right-list-cell-4{
	width: 240px;
}
.right-list-cell-5{
	width: 160px;
}

/* modal-filter */
.modal-filter{
	position: absolute;
	top: 20px;
	right: 20px;
	width: 480px;
	height: 340px;
	background: #000000;
	border: 1.25px solid #4089FF;
	box-shadow: 0 0 10px 0 #4089FF;
	z-index: 999;
	overflow: auto;
}
.modal-filter::-webkit-scrollbar{
	display: none;
}
.modal-filter-item{
	width: 100%;
	height: 80px;
	line-height: 80px;
	margin-bottom: 5px;
	background-color: #000B26;
	box-sizing: border-box;
	padding-left: 40px;
}
.modal-filter-item:last-child{
	margin-bottom: 0;
}
</style>