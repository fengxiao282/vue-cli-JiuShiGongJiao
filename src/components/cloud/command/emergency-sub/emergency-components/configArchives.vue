<template>
<div id="config-archives"> <!-- 配置档案列表 -->
	<div class="archives-list-body">
		<div class="archives-list-header">
			<div class="archives-list-header-cell-1" @click="sort_data">
				<img :style="{transform: `rotate(${arror_angle}deg)`}" src="../../../../../../resource/images/cloud/monitor/safetycontrol/三角.png" class="img-icon">
				配置时间
			</div>
			<div class="archives-list-header-cell-2">预案集合名称</div>
			<div class="archives-list-header-cell-3">预案线路名称</div>
			<div class="archives-list-header-cell-4">线路起点</div>
			<div class="archives-list-header-cell-5">线路终点</div>
		</div>
		<div class="archives-list-container">
			<div v-for="(item,index) in archivesList" :key="index" @click="nav_details(item)" class="archives-list-item">
				<div class="archives-list-item-cell-1">{{item.ForMat_Time.time}}</div>
				<div class="archives-list-item-cell-2">{{item.itemName}}</div>
				<div class="archives-list-item-cell-3">{{item.line}}</div>
				<div class="archives-list-item-cell-4">{{item.beginStation}}</div>
				<div class="archives-list-item-cell-5">{{item.endStation}}</div>
			</div>
		</div>
	</div>
</div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
	name: 'config-archives',
	components: {
	},
	data () {
		return {
			arror_angle:0,
		}
	},
	beforeMount(){
		// 获取配置档案列表
		this.$store.dispatch('emergencyPlan/archives_list',null);
	},
	methods:{
		sort_data(){
			this.arror_angle = (this.arror_angle == 180 ? 0 : 180);
			this.archivesList.reverse();
		},
		nav_details(item){
			//获取 预案线路详细清单
			this.$store.dispatch('emergencyPlan/archives_detaile',{"collectionName":"4_1_2_4","uid":item.uid});
			//切换到预案线路详细清单
			this.$emit("showDetails",item);
		},
		formatDate(date) { //日期格式化
			let greenwichTime = new Date(date);
			let year = greenwichTime.getFullYear();

			let month = greenwichTime.getMonth();
			let month2 = month < 10 ? `0${month}` : month;

			let dt = greenwichTime.getDate();
			let dt2 = dt < 10 ? `0${dt}` : dt;

			let hours = greenwichTime.getHours();
			let hours2 = hours < 10 ? `0${hours}` : hours;

			let minutes = greenwichTime.getMinutes();
			let minutes2 = minutes < 10 ? `0${minutes}` : minutes;

			let seconds = greenwichTime.getSeconds();
			let seconds2 = seconds < 10 ? `0${seconds}` : seconds;

			return {
				'time':`${year}.${month2}.${dt2} ${hours2}:${minutes2}:${seconds2}`,
				'timeStamp':greenwichTime.getTime()
			}
		},
		sortDate(arr){
			return arr.sort(function(a,b){
				return -a.ForMat_Time.timeStamp + b.ForMat_Time.timeStamp;
			})
		},
	},
	computed:{
		...mapGetters("emergencyPlan", ["archives_list"]),
		archivesList(){
			let archives_list = JSON.parse(JSON.stringify(this.archives_list));
			if(!archives_list.length){
				return [];
			}
			for(let i=0;i<archives_list.length;i++){
				archives_list[i].ForMat_Time = this.formatDate(archives_list[i].createTime);
			}
			return this.sortDate(archives_list);
		},
	},
}
</script>

<style lang="postcss" scoped>
#config-archives{
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 1080px;
	font-family: PingFangSC-Regular;
}
.archives-list-body{
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	width: 3195px;
	height: 1000px;
	box-shadow: inset 0 0 20px 0 #008BFF;
	border-radius: 10px;
}
.archives-list-header{
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	height: 110px;
	font-size: 40px;
	color: #4089FF;
}
.archives-list-header-cell-1{
	cursor: pointer;
	width: 230px;
	line-height: 110px;
	text-align: center;
	flex-grow:1;
}
.archives-list-header-cell-2{
	width: 350px;
	line-height: 110px;
	text-align: center;
	flex-grow:1;
}
.archives-list-header-cell-3{
	width: 600px;
	line-height: 110px;
	text-align: center;
	flex-grow:1;
}
.archives-list-header-cell-4{
	width: 200px;
	line-height: 110px;
	text-align: center;
	flex-grow:1;
}
.archives-list-header-cell-5{
	width: 200px;
	line-height: 110px;
	text-align: center;
	flex-grow:1;
}
.img-icon{
	width: 20px;
	height: 20px;
}

.archives-list-container{
	width: 100%;
	flex: 1;
	overflow: auto;
}
.archives-list-container::-webkit-scrollbar{
	display: none;
}
.archives-list-item{
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	width: 3155px;
	height: 110px;
	font-size: 45px;
	box-shadow: inset 0 0 20px 0 #008BFF;
	border-radius: 10px;
	margin: 0 auto 20px;
	cursor: pointer;
}
.archives-list-item-cell-1{
	width: 230px;
	line-height: 110px;
	text-align: center;
	flex-grow:1;
}
.archives-list-item-cell-2{
	width: 350px;
	line-height: 110px;
	text-align: center;
	flex-grow:1;
}
.archives-list-item-cell-3{
	width: 600px;
	line-height: 110px;
	text-align: center;
	flex-grow:1;
}
.archives-list-item-cell-4{
	width: 200px;
	line-height: 110px;
	text-align: center;
	flex-grow:1;
}
.archives-list-item-cell-5{
	width: 200px;
	line-height: 110px;
	text-align: center;
	flex-grow:1;
}
</style>