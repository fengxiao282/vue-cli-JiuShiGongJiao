<template>
<div id="config-archives"> <!-- 配置档案列表 -->
	<div class="archives-list-body">
		<div class="archives-list-header">
			<div class="archives-list-header-cell header-cell-sort-data" @click="sort_data">
				<img :style="{transform: `rotate(${arror_angle}deg)`}" src="../../../../../../resource/images/cloud/monitor/safetycontrol/三角.png" class="img-icon">
				配置时间
			</div>
			<div class="archives-list-header-cell">预案集合名称</div>
			<div class="archives-list-header-cell">预案线路名称</div>
			<div class="archives-list-header-cell">线路起点</div>
			<div class="archives-list-header-cell">线路终点</div>
		</div>
		<div class="archives-list-container">
			<div v-for="(item,index) in 10" :key="index" @click="nav_details(item)" class="archives-list-item">
				<div class="archives-list-item-cell">2019.08.03 08:00</div>
				<div class="archives-list-item-cell">轨交1号线应急支援</div>
				<div class="archives-list-item-cell">1号线人民广场</div>
				<div class="archives-list-item-cell">人民广场</div>
				<div class="archives-list-item-cell">上海火车站</div>
			</div>
		</div>
	</div>
</div>
</template>
<script>
// import { mapState,mapGetters } from 'vuex';

export default {
	name: 'config-archives',
	components: {
	},
	data () {
		return {
			arror_angle:0,
		}
	},
	mounted(){
	},
	methods:{
		sort_data(){
			this.arror_angle = (this.arror_angle == 180 ? 0 : 180);
		},
		nav_details(item){
			this.$emit("showDetails",item);
		}
	},
	computed:{
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
.header-cell-sort-data{
	cursor: pointer;
}
.archives-list-header-cell{
	flex: 1;
	line-height: 110px;
	text-align: center;
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
.archives-list-item-cell{
	flex: 1;
	line-height: 110px;
	text-align: center;
}
</style>