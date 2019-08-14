<template>
<div id="railsupport-items"> <!-- 轨交支援 -->
	<!-- 北横轨道交通支援 暂时写死，跳转博协 -->
	<div @click="navTo()" class="style-com style-1 color1">
		<div v-if="-1 == selectedIndex" class="rotate-com rotate-sector1"></div>
		<div class="yingJi-item-com"
			:class="{'selectedStyle yingJi-item-1':-1 == selectedIndex,
					 'noSelectedStyle yingJi-item-2':-1 != selectedIndex}">
			<div class="d1-com d1-color1">北横轨道交通支援</div>
			<div class="d-com">
				<div class="d-com-title">配套线路</div>&nbsp;&nbsp;
				<div class="val-1">{{beiHengItem?beiHengItem.lineNum+'条':''}}</div>
			</div>
			<div class="d-com">
				<div class="d-com-title">配套车辆</div>&nbsp;&nbsp;
				<div class="val-1">{{beiHengItem?beiHengItem.busNum+'辆':''}}</div>
			</div>
			<div class="d4">
				<div class="join-company-com join-company-title">参与公司</div>
				<span v-if="beiHengItem">
					<div v-for="(item2,index2) in beiHengItem.joinCompany" :key="index2" class="join-company-com d4-val-2">{{item2}}</div>
				</span>
			</div>
		</div>
	</div>
<!-- 其它活动 -->
	<div v-for="(item,index) in supportList2" :key="index" @click="select(index,item)" class="style-com" :class="{ 'style-1 color1':item.status == '1', 'style-2 color2': item.status != '1' }">

		<div v-if="item.selectedStatus" class="rotate-com" :class="{ 'rotate-sector1':item.status == '1', 'rotate-sector2': item.status != '1' }"></div>

		<div class="yingJi-item-com"
			:class="{'selectedStyle yingJi-item-1':item.status == '1' && item.selectedStatus,
					 'noSelectedStyle yingJi-item-2':item.status == '1' && !item.selectedStatus,
					 'selectedStyle yingJi-item-3':item.status != '1' && item.selectedStatus,
					 'noSelectedStyle yingJi-item-4':item.status != '1' && !item.selectedStatus}">
			<div class="d1-com"
				:class="{ 'd1-color1':item.status == '1', 'd1-color2': item.status != '1' }">{{item.itemName}}</div>
			<div class="d-com">
				<div class="d-com-title">配套线路</div>&nbsp;&nbsp;
				<div class="val-1">{{item.lineNum}}条</div>
			</div>
			<div class="d-com">
				<div class="d-com-title">配套车辆</div>&nbsp;&nbsp;
				<div class="val-1">{{item.busNum}}辆</div>
			</div>
			<div class="d4">
				<div class="join-company-com join-company-title">参与公司</div>
				<div v-for="(item2,index2) in item.joinCompany" :key="index2" class="join-company-com d4-val-2">{{item2}}</div>
			</div>
		</div>
	</div>
	<div class="hidden">{{supportList}}</div>
</div>
</template>
<script>
import { mapState,mapGetters } from 'vuex';
import { eventHub } from '../../../../store/index.js';

export default {
	name: 'railsupport-items',
	props: {
		showStatus:Number,
	},
	components: {
		videoStatus:false, //默认关闭
	},
	data () {
		return {
			selectedIndex:-5,
			selectedIds:[],
			supportList2:[],
			beiHengItem:null,
		}
	},
	watch:{
		showStatus(newVal, oldVal) {
			if(newVal == 3){
				let arr = JSON.parse(JSON.stringify(this.$store.getters["emergencyPlan/selectedRailsupport"]));
				this.$store.dispatch('emergencyLineBus/loopGetLines',arr);
				this.$store.dispatch('emergencyLineBus/loopGetBuses',arr);
				if(this.videoStatus){
					eventHub.$emit('yun_videoOpen');
				}
			}
		}
	},
	mounted(){
	},
	methods:{
		navTo(){
			// this.selectedIndex = -1;
			// 进入应急处置web页方法: 
			this.$root.$children[0].$children[0].$refs.menu.go2page('command/emergencydisposal', 'web')
		},
		select(index,item){
			item.selectedStatus = !item.selectedStatus;

			// 开关中间地图部分视频
			if(index == 0){
				if(item.selectedStatus){
					eventHub.$emit('yun_videoOpen');
					this.videoStatus = true;
				}else{
					eventHub.$emit('yun_videoClose');
					this.videoStatus = false;
				}
			}

			this.supportList2.splice(index,1,item);

			//发送已经启动项
			this.filterArr(item.itemId);
		},
		filterArr(itemId){ // selectedIds 中如果存在 itemId，则从 selectedIds 中删除 itemId，否则将 itemId 添加到 selectedIds 中
			if (this.selectedIds.includes(itemId)) {
				let temp = this.selectedIds.filter(function(value, index) {
					return itemId != value;
				})
				this.selectedIds = temp;
			} else {
				this.selectedIds.push(itemId);
			}
			this.sendSelectedIds();
		},
		sendSelectedIds(){ //发送并且存储已经启动项
			this.$store.dispatch('emergencyLineBus/loopGetLines',this.selectedIds);
			this.$store.dispatch('emergencyLineBus/loopGetBuses',this.selectedIds);

			//存储已选中项
			this.$store.dispatch('emergencyPlan/selectedRailsupport',JSON.parse(JSON.stringify(this.selectedIds)));
		},
		sortNumber(arr){
			return arr.sort(function(a,b){
				return a.itemNameIndex - b.itemNameIndex;
			})
		},
	},
	computed:{
		...mapState('emergencyPlan',{
			supportList(state){
				if(state.railsupport.length){
					let data = JSON.parse(JSON.stringify(state.railsupport[0].supportList));
					this.supportList2 = data;
					// console.log(data);

					let qiDong = [];
					for(let i=0;i<data.length;i++){
						
						//参与公司名字截取处理
						if(data[i].joinOrg.length == 0){
							data[i].joinCompany = [];
						}else{
							data[i].joinCompany  = data[i].joinOrg.split(',').map(function(value,index){
								return value.substr(2);
							});
						}

						//统计已启动项
						// if(data[i].status == "1"){
						// 	qiDong.push(data[i].itemId);
						// }

						//设置选项选中默认状态,默认未选中
						data[i].selectedStatus = false;

						let pattern = /^\d*/g;
						let res = pattern.exec(data[i].itemName);
						if(res[0] != ''){
							data[i].itemNameIndex = res[0];
						}else{
							data[i].itemNameIndex = 999;
						}
					}

					//发送已经启动项
					// if(qiDong.length){
					// 	this.$store.dispatch('emergencyLineBus/loopGetLines',qiDong);
					// 	this.$store.dispatch('emergencyLineBus/loopGetBuses',qiDong);
					// }
					this.sortNumber(data);
					this.beiHengItem = data[data.length-1];
					return data;
				}
				return [];
			},
		}),
	},
}
</script>

<style lang="postcss" scoped>
#railsupport-items{
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	flex-wrap:wrap;
	overflow: auto;
	width: 100%;
	height: 100%;
	padding:40px 0 40px 40px;
	box-sizing: border-box;
}
#railsupport-items::-webkit-scrollbar{
	display: none;
}
#railsupport-items > div{
	cursor: pointer;
}
.style-com{
	position: relative;
	width: 620px;
	height: 480px;
	border-radius: 20px;
	margin-bottom: 20px;
	margin-right: 23px;
	box-sizing: border-box;
	overflow: hidden;
}
.style-1{
	background: #28EA8D;
}
.style-2{
	background: #008BFF;
}
.rotate-com{
	position: absolute;
	top: 240px;
	left: 260px;
	height:400px;
	width:100px;
	transform-origin: 50% top;
	animation: rotateSector 7s linear infinite;
}
.rotate-sector1{
	background:linear-gradient(left,#28EA8D 0%,#ffffff 30%,#ffffff 70%,#28EA8D 100%);
	background:-webkit-linear-gradient(left,#28EA8D 0%,#ffffff 30%,#ffffff 70%,#28EA8D 100%);
}
.rotate-sector2{
	background:linear-gradient(left,#008BFF 0%,#ffffff 30%,#ffffff 70%,#008BFF 100%);
	background:-webkit-linear-gradient(left,#008BFF 0%,#ffffff 30%,#ffffff 70%,#008BFF 100%);
}
@keyframes rotateSector {
	0%{transform:rotate(0deg);}
	50%{transform:rotate(180deg);}
	100%{transform:rotate(360deg);}
	0%{-webkit-transform:rotate(0deg);}
	50%{-webkit-transform:rotate(180deg);}
	100%{-webkit-transform:rotate(360deg);}
}
.yingJi-item-com{
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: center;
	background: #000517;
	border-radius: 20px;
	padding-left:42px;
	padding-bottom: 10px;
	box-sizing: border-box;
}
.yingJi-item-1{
	box-shadow: inset 0 0 20px 0 #28EA8D, inset 0 0 40px 0 #28EA8D;
}
.yingJi-item-2{
	box-shadow: inset 0 0 20px 0 #45FFB0;
	border: 1px solid #45FFB0;
}
.yingJi-item-3{
	box-shadow: inset 0 0 20px 0 #008BFF, inset 0 0 40px 0 #008BFF;
}
.yingJi-item-4{
	box-shadow: inset 0 0 20px 0 #008BFF;
}
.selectedStyle{
	top: 4px;
	bottom: 4px;
	left: 4px;
	right: 4px;
}
.noSelectedStyle{
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
}
.d1-com{
	font-size: 45px;
	width: 100%;
	height: 120px;
	line-height: 120px;
}
.d1-color1{
    background-image:linear-gradient(left,#28EA8D 10%,#ffffff 45%,#28EA8D 55%);
	background-image:-webkit-linear-gradient(left,#28EA8D 10%,#ffffff 45%,#28EA8D 55%);
    -webkit-background-clip:text;
	background-clip:text; 
    -webkit-text-fill-color:transparent;
	 color: transparent;
    text-fill-color:transparent;
}
.d1-color2{
    color: #3D9AFF;
}
.d-com{
	width: 100%;
	height: 90px;
	line-height: 90px;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
}
.d-com-title{
	width: 165px;
	height: 60px;
	line-height: 60px;
	color: #ffffff;
}
.val-1{
	width: 339px;
	height: 60px;
	line-height: 60px;
	box-shadow: inset 0 0 10px 0 #008BFF;
	border-radius: 10px;
	text-align: center;
}
.d4{
	flex: 1;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	flex-wrap:wrap;
	box-sizing: border-box;
	overflow-y:auto;
	box-sizing: border-box;
	/* background-color: pink; */
}
.d4::-webkit-scrollbar{
	display: none;
}
.join-company-com{
	width: 160px;
	height: 60px;
	line-height: 60px;
	text-align: center;
	margin-top: 17px;
	margin-right: 24px;
}
.join-company-title{
	color: #ffffff;
}
.d4-val-2{
	box-shadow: inset 0 0 10px 0 #008BFF;
	border-radius: 10px;
}
.color1{
	color: #28EA8D;
}
.color2{
	color: #3D9AFF;
}
.hidden{
	height: 0;
	width: 0;
	overflow: hidden;
	visibility: hidden;
}
</style>