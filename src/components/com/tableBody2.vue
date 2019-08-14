<template>
<div id="tableBody2">

	<div class="table-header">
		<div class="table-header-1">排名</div>
		<div>线路</div>
		<div>运速乘客</div>
		<div>环比前日</div>
		<div>排名浮动</div>
	</div>

	<div class="table-body">
		<div id="item-container" :style="{top:containerTop}">
			<div class="item" v-for="(item,index) in list" :key="index">
				<div class="sort-index">{{item.idx}}</div>
				<div>{{item.line}}</div>
				<div>{{item.passenger}}</div>
				<div>
					<img v-if='item.idxChange < 0' class="arror" src='../../assets/image/绿上下.png'> 
					<img v-else class="arror" src='../../assets/image/黄下上.png'> 
					{{item.change}}
				</div>
				<div>{{item.idxChange}}</div>
			</div>
		</div>
	</div>

</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'tableBody2',
	props: {
		propType:String,
	},
	data(){
		return{
			containerTop:'404px'
		}
	},
	methods:{
		transationItemContainer(){ // 页面首次打开添加特效
			// let itemContainerDOM = document.getElementById('item-container');

			// 【方法1：只有第一个起作用】
			// itemContainerDOM.style.top = 0;
			
			// 【方法2：只有第一个起作用】
			// let top = 404;
			// let spead = -3;
			// let timer;
			// function g(){
			// 	clearTimeout(timer);
			// 	timer = setTimeout(function(){
			// 		top += spead;
			// 		if(top > 0){
			// 			itemContainerDOM.style.top = `${top}px`;
			// 			g();
			// 		}else{
			// 			itemContainerDOM.style.top = '0';
			// 			itemContainerDOM.style.bottom = '0';
			// 		}
			// 	},8);
			// }
			// g();
		},
	},
	computed:{
		...mapState("densityAnalysisPOS",{
			listObj(state){
				return state[this.propType];
			},
		}),
		list(){
			 let obj = this.listObj;
			 let arr = obj.list;

			// 页面首次打开添加特效
			 if(arr){
				this.$nextTick(function(){
					this.containerTop = 0;
					// this.transationItemContainer(); 不能用，为什么？
				});
			 }
			return arr;
		},
	}
}
</script>
<style lang="postcss" scoped>
#tableBody2{
	flex: 1;
	width: 100%;
	display: flex;
	flex-direction: column;
}
.table-header{
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 70px;
	line-height:70px;
	border-bottom:2.5px solid #FF1818;
}
.table-header > div{
	width: 312px;
	text-align: center;
}
.table-header-1{
	width: 180px !important;
}

.table-body{
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 400px;
	border-bottom: 2.5px solid #333438;
	background-color: rgba(0,0,0,0.80);
	box-sizing: border-box;
	position: relative;
}
.table-body::-webkit-scrollbar {
	display: none;
}
#item-container{
	display: flex;
	flex-direction: column;
	overflow: hidden;
	position: absolute;
	// top:404px;
	bottom:0;
	transition: top 2s ease-out;
	-webkit-transition: top 2s;
}
.item{
	display: flex;
	flex-direction: row;
	width: 100%;
	flex: 1;
	max-height: 80px;
	border-bottom: 1px solid #333;
}
.item > div{
	width: 283.75px;
	height: 80px;
	line-height:80px;
	text-align: center;
}

.item:last-child{
	border-bottom-style: none;
}
.sort-index{
	color: #FF3838;
	width: 180px !important;
}
.arror{
	width: 40px;
	height: 40px;
}

</style>
