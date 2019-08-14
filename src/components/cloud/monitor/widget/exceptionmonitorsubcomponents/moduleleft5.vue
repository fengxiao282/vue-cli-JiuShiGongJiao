<template>
		<div class="left-com-1"> <!-- 进出场异常情况 -->
			<div style="width:0;height:0;overflow:hidden;visibility:hidden;">{{jinChuChang_list}}</div>
			<investitemtitle titleName="进出场异常情况">
				<div slot="content" class="screen-count" @click="showParksList">
					<img class="position-icon" src="../../../../../../resource/images/cloud/monitor/position-icon.png">  
					<!-- <marquee class="marquee-item">{{showItem.parking}}</marquee> -->
					<div class="marquee-item2" v-if="showItem.parking.length > 5" @mouseenter="enter(showItem.parking,$event)" @mouseleave='out'>{{showItem.parking}}</div>
					<div class="marquee-item2" v-else>{{showItem.parking}}</div>
				</div>
			</investitemtitle>
			<div class="left-4-1-foot">
				<div class="left-4-1-foot-item">
					<div class="left-4-1-foot-item-left">
						<img class="abnormal-icon" src="../../../../../../resource/images/cloud/monitor/异常进场.png">
					</div>
					<div class="left-4-1-foot-item-right">
						<span class="left-4-1-foot-item-right-1">异常进场</span>
						<span>{{showItem.in}}</span>
					</div>
				</div>

				<div class="left-4-1-foot-item">
					<div class="left-4-1-foot-item-left">
						<img class="abnormal-icon" src="../../../../../../resource/images/cloud/monitor/异常出场.png">
					</div>
					<div class="left-4-1-foot-item-right">
						<span class="left-4-1-foot-item-right-1">异常出场</span>
						<span>{{showItem.out}}</span>
					</div>
				</div>
			</div>

			<!-- model -->
			<div class="park-manage-list" v-if="parksListShow"  @click="hideParksList">
				<ul>
					<li v-for="(item,i) in jinChuChang_list" :key="i" @click="selected(item,i)">
						<div class="marquee-ul" v-if="item.parking.length > 5" @mouseenter="enter(item.parking,$event)" @mouseleave='out'>{{item.parking}}</div>
						<div class="marquee-ul" v-else>{{item.parking}}</div>
					</li>
				</ul>
			</div>

			<!-- tip -->
			<div id="tip-msg-5">{{msg}}</div>
		</div>
</template>

<script>
import { mapState } from 'vuex';
import investitemtitle from '../../../../common/cloudmonitor/sourceinvest/investitemtitle.vue';

export default {
	name: 'moduleleft5',
	components: {investitemtitle},
	data(){
		return{
			parksListShow:false,
			parkIndex: 0,
			showItem:{parking: "", in: "0", out: "0"},
			msg:'',
			tipDom:{},
			timer5:null,
			fixedIndex:0,
		}
	},
	mounted(){
		// 进出场异常
		this.$store.dispatch('exceptionmonitor/jinChuChang_yiChang');

		this.tipDom = document.getElementById('tip-msg-5');
	},
	beforeDestroy(){
		clearTimeout(this.timer5);
	},
	methods: {
		polling(){	//轮询
			if(this.timer5){
					clearTimeout(this.timer5);
			}

			this.timer5 = setTimeout(()=>{
				this.fixedIndex++;
				if(this.fixedIndex >= this.jinChuChang_list.length){
					this.fixedIndex = 0;
				}
				this.showItem = this.jinChuChang_list[this.fixedIndex];
				this.timer5 = undefined;
				this.polling();
			},10000)
		},
		fixed(){	//选中时固定1分钟
			clearTimeout(this.timer5);
			setTimeout(()=>{
				this.polling();
			},60000);
		},
		out(){
			this.tipDom.style.visibility = 'hidden';
		},
		enter(msg,event){
			this.msg = msg;
			let cx = document.body.clientWidth - event.clientX + 30;
			let cy = event.clientY - 50;

			this.tipDom.style.right = `${cx}px`;
			this.tipDom.style.top = `${cy}px`;
			this.tipDom.style.visibility = 'visible';
		},
		showParksList(){
			this.parksListShow = true;
		},
		selected(item,i){
			this.fixedIndex = i;
			this.out();
			this.showItem = item;
			this.fixed();
		},
		hideParksList(){
			this.parksListShow = false;
		},
	},
	computed:{
		...mapState('exceptionmonitor',{
			jinChuChang_list(state){
				if(state.jinChuChang_yiChang.length){
					let data = JSON.parse(JSON.stringify(state.jinChuChang_yiChang));

					for(let i=0;i<data.length;i++){
						data[i].parking = data[i].parking.replace('停车场','');
					}

					this.showItem = data[0];

					setTimeout(()=>{
						this.polling();
					},0);
					
					return data;
				}
			},
		}),
	},
}
</script>
<style lang="postcss" scoped>
.left-com-1{
	position: relative;
	width:760px;
	height:370px;
	box-sizing: border-box;
	background: #000015;
	border: 1.25px solid #4089FF;
	padding: 20px 40px;
}
.screen-count{
	font-family: PingFangSC-Medium;
	font-size: 40px;
	line-height: 60px;
	color: #FFF;
	width: 250px;
	text-align: center;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.screen-count:hover{
	cursor: pointer;
}
.position-icon{
	margin-bottom: -10px;
	width: 30px;
	height: 35px;
}
.marquee-item{
	white-space: nowrap;
	vertical-align: bottom;
}
.marquee-item2{
	flex: 1;
	height: 60px;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space:nowrap;
}
/* model */
.park-manage-list{
	position: absolute;
	top: 20px;
	right: 15px;
	width: 280px;
	height: 222px;
	box-sizing: border-box;
	background-color: #000;
	border: 1.25px solid #4089ff;
	box-shadow: 0px 0px 10px 0px #4089FF;
	font-size: 40px;
	line-height: 70px;
	text-align: left;
	color: #fff;
	font-family: PingFangSC-Regular;
	z-index: 10;
}
.list-title{
	margin: 0px;
	padding: 0px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	width: auto;
	height: 70px;
	margin-bottom: 5px;
	padding:0 15px 0 20px;
	background: #000b26;
	color: #4089ff;
	white-space: nowrap;
	vertical-align: bottom;
}
.parking-name{
	display: inline-block;
	white-space: nowrap;
	vertical-align: bottom;
	width:200px;
}
.marquee-ul{
	display: inline-block;
	vertical-align: bottom;
	width:100%;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space:nowrap;
}
.park-manage-list ul{
	display: block;
	margin: 0px;
	padding: 0px;
	width: 100%;
	height: 220px;
	overflow-x: hidden;
	overflow-y: auto;
}
.park-manage-list ul::-webkit-scrollbar-track-piece{
	width:10px;background-color:#001B41;
	}

.park-manage-list ul::-webkit-scrollbar{
	width:10px;
	}

.park-manage-list ul::-webkit-scrollbar-thumb{background:#002B62; cursor:pointer;}
.park-manage-list ul li{
	margin: 0px;
	display: block;
	box-sizing: border-box;
	width: 100%;
	height: 70px;
	margin-bottom: 5px;
	padding:0 20px;
	background: #000b26;
	cursor: pointer;
	white-space: nowrap;
	vertical-align: bottom;
	overflow: hidden;
    /* text-overflow:ellipsis;
    white-space:nowrap */
}
.left-4-1-foot{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	height: 200px;
	margin-top: 40px;
}
.left-4-1-foot-item{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
	width: 320px;
	height: 200px;
	border: 2.5px solid #FF3939;
  padding: 45px 20px;
	box-sizing: border-box;
	background-color:#000000;
  font-size: 40px;
}
.abnormal-icon{
	width: 90px;
	height: 81px;
}
.left-4-1-foot-item-left{
  width: 90px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.left-4-1-foot-item-right{
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.left-4-1-foot-item-right-1{
  margin-bottom: 10px;
}
#tip-msg-5{
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
