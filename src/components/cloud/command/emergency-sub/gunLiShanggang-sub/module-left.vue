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
				<div v-if="item.address.length > 9" class="item-left-left cursor-pointer"
					@mouseenter="enter(item.address,$event)" @mouseleave='out'>&nbsp;&nbsp;{{item.address}}</div>
				<div  v-else class="item-left-left">&nbsp;&nbsp;{{item.address}}</div>
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
				<div v-for="(item,index) in reserve_plans[selected_planName]" :key="index" class="right-list-item">
					<div class="list-cell-com right-list-cell-1">{{item.company}}</div>
					<div class="list-cell-com right-list-cell-2">{{item.name}}</div>
					<div class="list-cell-com right-list-cell-3">{{item.office}}</div>
					<div class="list-cell-com right-list-cell-4">{{item.job}}</div>
					<div class="list-cell-com right-list-cell-5">{{item.radioCode}}</div>
				</div>
			</div>
		</div>

		<div v-if="show_modal_filter" class="modal-filter">
			<div class="modal-filter-item"
			 v-for="(item,index) in plans_name"
			 :key="index"
			 :style="{color:item == selected_planName ? '#008BFF' : '#ffffff'}"
			 @click="shift_planNames(item)">{{item}}</div>
		</div>

	</div>

	<div id="tip-msg-managerLeft">{{msg}}</div>
</div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';

export default {
	name: 'gunLi-shanggang',
	components: {},
	data () {
		return {
			msg:'',
			tipDom:{},
			arror_angle:180,
			show_modal_filter:false,
			selected_planName:'全部已启动预案',
			plans_name:['全部已启动预案'],
		}
	},
	created(){
		// 现场管理人员上岗 left
		this.$store.dispatch('emergencyPlan/manager_left',null);

		// 现场管理人员上岗 left
		this.$store.dispatch('emergencyPlan/manager_right',null);
	},
	mounted(){
		this.tipDom = document.getElementById('tip-msg-managerLeft');
	},
	methods:{
		out(){
			this.tipDom.style.visibility = 'hidden';
		},
		enter(msg,event){
			this.msg = msg;
			let cx = event.clientX;
			let cy = event.clientY - 100;

			this.tipDom.style.left = `${cx}px`;
			this.tipDom.style.top = `${cy}px`;
			this.tipDom.style.visibility = 'visible';
		},
		filter_data(){
			this.arror_angle = (this.arror_angle == 180 ? 0 : 180);
			this.show_modal_filter = !this.show_modal_filter;
		},
		shift_planNames(item){
			this.filter_data();
			if(this.selected_planName != item){
				this.selected_planName = item;
			}
		},
	},
	computed:{
		...mapGetters("emergencyPlan", ["manager_left","manager_right"]),
		list1(){
			let manager_left = this.manager_left;
			if(!manager_left){
				return [];
			}
			return manager_left;
		},
		reserve_plans(){
			let manager_right = this.manager_right;
			if(!manager_right){
				return [];
			}

			
			let reserve_plans = {
				'全部已启动预案':manager_right
			};

			//按 预案名 进行数据分类
			for(let i=0;i<manager_right.length;i++){
				let item = manager_right[i];
				let item_name = item.itemName;

				if(!reserve_plans[item_name]){
					reserve_plans[item_name] = [item];

					//统计 预案名
					this.plans_name.push(item_name);

				}else{
					reserve_plans[item_name].push(item);

				}

			}
			
			return reserve_plans;
		}
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
.cursor-pointer{
	cursor: pointer;
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
	max-height: 340px;
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
	cursor: pointer;
}
.modal-filter-item:last-child{
	margin-bottom: 0;
}
#tip-msg-managerLeft{
	position:fixed;
	visibility: hidden;
	background: #000015;
	box-shadow: 0 0 10px 0 #4089FF;
	font-family: PingFangSC-Regular;
	font-size: 40px;
	color: #4089FF;
	line-height: 70px;
	height: 70px;
	border-radius:4px;
	padding: 5px 10px;
	overflow: hidden;
	pointer-events: none;
	z-index: 999;
}
</style>