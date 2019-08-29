<template>
<div class="container">

	<div id='emergency'> <!-- 应急预案 -->
		<div v-show="!show_dang_an" class="yingJi-top-title">
			<div class="yingJi-title font50">
				<img class="img-icon" src="../../../../resource/images/exposition/main/应急预案.png">
				应急预案
				<span class="btn-com bt-1" @click="shua_xin">
					<img class="img-icon" src="../../../../resource/images/exposition/main/刷新.png">
					刷新
				</span>
				<span class="btn-com" @click="open_dang_an(true,'应急预案')">
					<img class="img-icon" src="../../../../resource/images/exposition/main/档案.png">
					档案
				</span>
			</div>
			<div class="nav-bar-container">
				<div @click="select(0)" class="nav-item font50" :class="{ 'activebgColor': 0 == selectedIndex }">
					突发事件
					<div class="tip-dot" v-if="!!emergencyevents_num">{{emergencyevents_num?emergencyevents_num:''}}</div>
				</div>
				<div @click="select(1)" class="nav-item font50" :class="{ 'activebgColor': 1 == selectedIndex }">
					大型赛事
					<div class="tip-dot" v-if="!!majorevents_num">{{majorevents_num?majorevents_num:''}}</div>
				</div>
				<div @click="select(2)" class="nav-item font50" :class="{ 'activebgColor': 2 == selectedIndex }">
					大型活动
					<div class="tip-dot" v-if="!!active_num">{{active_num?active_num:''}}</div>
				</div>

				<div @click="select(3)" class="nav-item font50" :class="{ 'activebgColor': 3 == selectedIndex }">
					轨交支援
					<div class="tip-dot" v-if="!!railsupport_num">{{railsupport_num?railsupport_num:''}}</div>
				</div>

				<div @click="select(4)" class="nav-item font50" :class="{ 'activebgColor': 4 == selectedIndex }">
					驳江支援
					<div class="tip-dot" v-if="!!guojiangSupport_num">{{guojiangSupport_num?guojiangSupport_num:''}}</div>
				</div>
			</div>
		</div>

		<div v-show="!show_dang_an" class="yingJi-container">
			<emergencyevents v-show="selectedIndex == 0" :showStatus="selectedIndex"></emergencyevents>
			<majorevents v-show="selectedIndex == 1" :showStatus="selectedIndex"></majorevents>
			<active v-show="selectedIndex == 2" :showStatus="selectedIndex"></active>
			<railsupport v-show="selectedIndex == 3" :showStatus="selectedIndex"></railsupport>
			<guojiangSupport v-show="selectedIndex == 4" :showStatus="selectedIndex"></guojiangSupport>
		</div>

		<div v-show="show_dang_an" class="dang-an-container">
			<div class="dang-an-title">
				<div class="dang-an-title-left font50">
					<img class="img-icon" :src="show_dang_an_list?icon1:icon2">
					{{show_dang_an_list?"配置档案":"预案线路详细清单"}}
				</div>
				<div class="dang-an-title-right" @click="open_dang_an(false,'配置档案')">返回</div>
			</div>
			<configArchives v-if="show_dang_an_list"  @showDetails="show_details"></configArchives>
			<archivesDetaile v-if="!show_dang_an_list"></archivesDetaile>
		</div>

		<div class="railsupport-bottom"> <!-- bottom -->
			<div class="gunLi-shangGang-container">
				<moduleLeft/>
			</div>
			<div class="heDuiJiang-container" :style="{'position':position_status}">
				<heduijiang @heduijiang_changePosition='change_osition'/>
			</div>
		</div>

	</div>
	
</div>
</template>
<script>
import { mapState } from 'vuex';
import emergencyevents from './emergency-sub/emergencyevents.vue';
import majorevents from './emergency-sub/majorevents.vue';
import active from './emergency-sub/active.vue';
import railsupport from './emergency-sub/railsupport.vue';
import guojiangSupport from './emergency-sub/guojiangSupport.vue';
import moduleLeft from './emergency-sub/gunLiShanggang-sub/module-left.vue';
import heduijiang from './emergency-sub/gunLiShanggang-sub/heduijiang.vue';
import { eventHub } from '../../../store/index.js';
import configArchives from './emergency-sub/emergency-components/configArchives.vue';
import archivesDetaile from './emergency-sub/emergency-components/archivesDetaile.vue';
import icon1 from "../../../../resource/images/exposition/main/档案.png";
import icon2 from "../../../../resource/images/cloud/monitor/safetycontrol/报告单.png";
export default {
	name: 'emergency',
	components: {
		emergencyevents,
		majorevents,
		active,
		railsupport,
		guojiangSupport,
		moduleLeft,
		heduijiang,
		configArchives,
		archivesDetaile
	},
	data () {
		return {
			icon1:icon1,
			icon2:icon2,
			show_dang_an:true,
			show_dang_an_list:true,
			navList:[
				{name:'突发事件',num:0},
				{name:'大型赛事',num:0},
				{name:'大型活动',num:0},
				{name:'轨交支援',num:0},
				{name:'驳江支援',num:0}
			],
			selectedIndex:0,
			position_status:"relative",
		}
	},
	mounted(){
		this.getData();
	},
	methods:{
		shua_xin(){
			this.getData();
		},
		getData(){
			// 突发事件
			this.$store.dispatch('emergencyPlan/railSupport',{"collectionName":"4_1_1_1","type":"1"});
			// 大型赛事
			this.$store.dispatch('emergencyPlan/railSupport',{"collectionName":"4_1_1_1","type":"2"});
			// 大型活动
			this.$store.dispatch('emergencyPlan/railSupport',{"collectionName":"4_1_1_1","type":"3"});
			// 轨交支援
			this.$store.dispatch('emergencyPlan/railSupport',{"collectionName":"4_1_1_1","type":"4"});
			// 驳江支援
			this.$store.dispatch('emergencyPlan/railSupport',{"collectionName":"4_1_1_1","type":"5"});
		},
		open_dang_an(bool,flag){
			if(flag == "应急预案"){
				this.show_dang_an = bool;
				
			}else if(flag == "配置档案"){

				if(this.show_dang_an_list){ //当前页：配置档案。返回 -> 应急预案
					this.show_dang_an = bool;

				}else{ //当前页：配置详情。返回 -> 配置档案

					this.show_dang_an_list = true;
				}
			}
		},
		show_details(selected_item_info){
			this.show_dang_an_list = false;
		},
		select(index){
			if(index == this.selectedIndex){
				return;
			}
			this.selectedIndex = index;
			//关闭视频
			eventHub.$emit('yun_videoClose');
		},
		change_osition(data){
			this.position_status = data;
		}
	},
	computed:{
		...mapState('emergencyPlan',{
			emergencyevents_num(state){
				if(state.emergencyevents.length){
					let data = state.emergencyevents[0].supportList;
					return data.length;
				}
				return 0;
			},
			majorevents_num(state){
				if(state.majorevents.length){
					let data = state.majorevents[0].supportList;
					return data.length;
				}
				return 0;
			},
			active_num(state){
				if(state.active.length){
					let data = state.active[0].supportList;
					return data.length;
				}
				return 0;
			},
			railsupport_num(state){
				if(state.railsupport.length){
					let data = state.railsupport[0].supportList;
					return data.length;
				}
				return 0;
			},
			guojiangSupport_num(state){
				if(state.guojiangSupport.length){
					let data = state.guojiangSupport[0].supportList;
					return data.length;
				}
				return 0;
			}
		}),
	},
}
</script>

<style lang="postcss" scoped>
/* 记得下面要删除 */
.container{
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: #000000;
}
/* 记得上面要删除 */
#emergency{
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	background-color: #000517;
	font-family: PingFangSC-Medium;
	font-size: 40px;
	color: #FFF;
	width: 3275px;
	height: 2120px;
	border: 2.5px solid #008BFF;
	box-sizing: border-box;
	overflow: hidden;
}
.font50{
	font-size: 50px;
}
/* yingJi-top */
.yingJi-top-title{
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	height: 140px;
	border-top:2.5px solid #008BFF;
	border-bottom:2.5px solid #008BFF;
	box-sizing: border-box;
}
.yingJi-title{
	width: 1275px;
	line-height:120px;
	height: 100%;
	padding-left: 40px;
	box-sizing: border-box;
}
.img-icon{
	width: 45px;
	margin-bottom: -7px;
}
.btn-com{
	font-size: 40px;
	display: inline-block;
	width: 180px;
	height: 80px;
	text-align: center;
	line-height: 80px;
	border: 2.5px solid #00488B;
	border-radius: 10px;
	cursor: pointer;
}
.bt-1{
	margin-left: 70px;
	margin-right: 35px;
}
.nav-bar-container{
	flex: 1;
	display: flex;
	flex-direction: row;
	justify-items: center;
	align-items: center;
	height: 100%;
}
.nav-bar-container:last-child{
	margin-right: -1px;
}
.nav-item{
	position: relative;
	flex: 1;
	margin-left: -1px;
	height: 100%;
	line-height:120px;
	text-align: center;
	border-left: 2.5px solid #008BFF;
	box-shadow: inset 0 0 10px 0 #008BFF;
	background-image: #000517;
}
.nav-item:hover{
	cursor: pointer;
}
.activebgColor{
	background-image: linear-gradient(-180deg, #004BFF 0%, #008BFF 100%);
	background-image: -webkit-linear-gradient(-180deg, #004BFF 0%, #008BFF 100%);
}
.tip-dot{
	position: absolute;
	top: 10px;
	right: 10px;
	width: 54px;
	height: 54px;
	line-height: 54px;
	border-radius: 50%;
	text-align: center;
	background-color: #233A8B;
	font-size: 40px;
}
/* yingJi-container */
.yingJi-container{
	height: 1060px;
	width: 100%;
}
/* 档案 */
.dang-an-container{
	height: 1200px;
	width: 100%;
}
.dang-an-title{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 120px;
	border: 2.5px solid #008BFF;
	box-sizing: border-box;
	padding: 0 40px;
}
.dang-an-title-left{
	flex: 1;
	height: 100%;
	line-height: 120px;
}
.dang-an-title-right{
	width: 160px;
	height: 80px;
	text-align: center;
	line-height: 80px;
	border: 2.5px solid #00488B;
	border-radius: 10px;
	cursor: pointer;
}

/* railsupport-bottom */
.railsupport-bottom{
	flex: 1;
    width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	border: 2.5px solid #008BFF;
	box-sizing: border-box;
}
.gunLi-shangGang-container{
	width: 1640px;
	height: 100%;
	border-right: 2.5px solid #008BFF;
}
.heDuiJiang-container{
	flex: 1;
	height: 100%;
	border-left: 2.5px solid #008BFF;
}
</style>