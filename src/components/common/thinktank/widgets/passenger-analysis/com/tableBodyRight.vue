<template>
<div id="tablebodyright">

	<div class="table-header">
		<div class="table-header-1">排名</div>
		<div>线路</div>
		<div>运送乘客</div>
		<div>环比前日</div>
		<div>排名浮动</div>
	</div>

	<div class="table-body">
		<div id="item-container" :style="{paddingTop:containerPaddingTop}">
			<div class="item" v-for="(item,index) in list" :key="index">
				<div class="sort-index">{{item.idx}}</div>
				<div v-if="item.line.length > 7" class="cursor-pointer" @mouseenter="enter(item.line,$event)" @mouseleave='out'>{{item.line}}</div>
				<div v-else>{{item.line}}</div>
				<div>{{item.passenger}}</div>
				<div class="change">
					<img v-if='item.change >= 0' class="arror" src='../../../../../../../resource/images/cloud/thinktank/thinktankhome/绿上下.png'> 
					<img v-else class="arror" src='../../../../../../../resource/images/cloud/thinktank/thinktankhome/黄下上.png'>
					{{item.change}}
				</div>
				<div>{{item.idxChange}}</div>
			</div>
		</div>
	</div>

	<div id="tip-msg-station-tablebodyright">{{msg}}</div>

</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'tablebodyright',
	props: {
		propType:String,
	},
	data(){
		return{
			containerPaddingTop:'400px',
			msg:'',
			tipDom:{},
		}
	},
	mounted(){
		this.tipDom = document.getElementById('tip-msg-station-tablebodyright');
	},
	methods:{
		out(){
			this.tipDom.style.visibility = 'hidden';
		},
		enter(msg,event){
			this.msg = msg;
			let cx = document.body.clientWidth - event.clientX + 30;
			let cy = event.clientY - 70;

			this.tipDom.style.right = `${cx}px`;
			this.tipDom.style.top = `${cy}px`;
			this.tipDom.style.visibility = 'visible';
		},
		sortNumber(arr){
			return JSON.parse(JSON.stringify(arr)).sort(function(a,b){
				return a.idx - b.idx;
			})
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
			 if(!obj.list){
				 return;
			 }
			 let arr = this.sortNumber(obj.list);

			// 页面首次打开添加特效
			 if(arr){
				this.$nextTick(function(){
					this.containerPaddingTop = 0;
				});
			 }
			return arr;
		},
	}
}
</script>
<style lang="postcss" scoped>
#tablebodyright{
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
	/* width: 312px; */
	width: 305px;
	text-align: center;
}
.table-header-1{
	/* width: 180px !important; */
}

.table-body{
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 400px;
	border-bottom: 2.5px solid #333438;
	background-color: rgba(0,0,0,0.80);
	box-sizing: border-box;
	overflow: hidden;
}
#item-container{
	width: 100%;
	height: 100%;
	transition: padding-top 3s ease-out;
	-webkit-transition: padding-top 3s ease-out;
	overflow:auto;
	box-sizing: border-box;
	pointer-events: all;
}
#item-container::-webkit-scrollbar {
	display: none;
}
.item{
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 80px;
	color: #c6d1e2;
	/* border-bottom: 1px solid #333; */
}
.item > div{
	/* width: 283.75px; 含站点编号时宽度 */
	width: 305px;
	height: 80px;
	line-height:80px;
	text-align: center;
	overflow: hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
	/* border-left: 1px solid pink;
	border-right: 1px solid pink;
	box-sizing: border-box; */
}
/* .item:last-child{
	border-bottom-style: none;
} */
.item:nth-of-type(2n-1){
	background-color: rgba(0,0,0,0.80);
}
.item:nth-of-type(2n+0){
	background-color: #0f1325;
}
.sort-index{
	color: #FF3838;
	/* width: 180px !important; */
}
.cursor-pointer{
	cursor: pointer;
}
.change{
	display: flex;
	flex-direction: row;
	justify-content: left;
	align-items: center;
	box-sizing: border-box;
	padding-left: 60px;
}
.arror{
	width: 40px;
	height: 40px;
	margin-bottom:-5px; 
}
#tip-msg-station-tablebodyright{
	position:fixed;
	visibility: hidden;
	background: #000015;
	box-shadow: 0 0 10px 0 #4089FF;
	font-family: PingFangSC-Regular;
	font-size: 40px;
	color: #4089FF;
	line-height: 50px;
	height: 50px;
	border-radius:2px;
	padding: 5px 10px;
	overflow: hidden;
	pointer-events: none;
	z-index: 999;
}
</style>
