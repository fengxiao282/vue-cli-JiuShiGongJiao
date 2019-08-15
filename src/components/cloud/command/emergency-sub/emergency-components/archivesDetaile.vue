<template>
<div id="archives-detaile"> <!-- 配置档案列表详情 -->
	<div class="archives-detaile-body">
		<!-- left -->
		<div class="archives-detaile-left">
			<div class="detaile-left-1">线路配置信息</div>
			<div class="detaile-left-com1"><span class="fontColor1">线路编号</span> &nbsp; 0801</div>
			<div class="detaile-left-com1"><span class="fontColor1">线路名称</span> &nbsp; 1号线人民广场</div>
			<div class="detaile-left-com1"><span class="fontColor1">开始时间</span> &nbsp; 07.20 08:00</div>
			<div class="detaile-left-com1"><span class="fontColor1">结束时间</span> &nbsp; -</div>
			
			<div class="detaile-left-com2 detaile-left-6"
			:class="{'detaile-delected-6':delected6}"
			@click="change_detaile_delected(true)">
				<div class="detaile-left-com2-top">
					<span class="fontColor1">起点位置</span> &nbsp; 人民广场
				</div>
				<div class="detaile-left-com2-middle">
					<div class="circle-green"></div>
					<div class="horizontal-line"></div>
				</div>
				<div class="detaile-left-com2-bottom">
					<span class="fontColor1">起点范围</span> &nbsp; 3km
				</div>
			</div>
			
			<div class="detaile-left-com2" :class="{'detaile-delected-6':!delected6}"
			@click="change_detaile_delected(false)">
				<div class="detaile-left-com2-top">
					<span class="fontColor1">终点位置</span> &nbsp; 上海火车站
				</div>
				<div class="detaile-left-com2-middle">
					<div class="horizontal-line"></div>
					<div class="circle-red"></div>
				</div>
				<div class="detaile-left-com2-bottom">
					<span class="fontColor1">终点范围</span> &nbsp; 2km
				</div>
			</div>
		</div>

		<!-- right -->
		<div class="archives-detaile-right">
			<div class="archives-detaile-right-top fontColor1">资源明细</div>

			<div class="archives-detaile-right-bottom">

				<div class="detaile-right-bottom-left">
					<div class="bottom-left-1">
						<div class="bottom-left-1-sheji-gongsi fontColor1">涉及公司</div>
						<div class="bottom-left-1-sheji-gongsi-list">
							<span v-for="(item,index) in shejiGongsi_list" :key="index" class="shejigongsi-item">{{item}}</span>
						</div>
					</div>

					<div class="bottom-left-2">
						<div class="archives-aaa-bbb fontColor1">范围内起讫站</div>
						<div class="archives-ccc-ddd">
							<span class="item-container-com cursor-pointert"
								v-for="(item,index) in qiQiZhang_list"
								:key="index"
								:class="{'selected-item':qiQiZhang_selected_index == index}"
								@click="shift_qiQiZhang(index)">
								{{item.name}}
								<span class="vertical-line"></span>
								<span class="color-green">{{item.num}}</span>
								<span class="font20">辆</span>
							</span>
						</div>
					</div>

					<div class="bottom-left-3">
						<div class="archives-aaa-bbb fontColor1">起讫站关联线路</div>
						<div class="archives-ccc-ddd">
							<span class="item-container-com cursor-pointert"
								v-for="(item,index) in guanLianLine_list"
								:key="index"
								:class="{'selected-item':guanLianLine_selected_index == index}"
								@click="shift_guanLianLine(index)">
								{{item.name}}
								<span class="vertical-line"></span>
								<span>{{item.num}}</span>
								<span class="font20">辆</span>
							</span>
						</div>
					</div>
				</div>

				<div class="detaile-right-bottom-right">
					<div class="bottom-right-1">
						<div class="bottom-left-1-sheji-gongsi fontColor1">车队办公点</div>
						<div class="bottom-left-1-sheji-gongsi-list">
							<span v-for="(item,index) in banGong_position" :key="index" class="shejigongsi-item">{{item}}</span>
						</div>
					</div>
					<div class="bottom-right-2">
						<div class="archives-eee-fff fontColor1">所选线路可用车辆</div>
						<div class="archives-ccc-ddd">
							<span v-for="(item,index) in keyong_cheliang" :key="index" class="item-container-com color-green">
								{{item}}
							</span>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</div>
</template>
<script>
// import { mapState,mapGetters } from 'vuex';

export default {
	name: 'archives-detaile',
	props:{
		info:Number,
	},
	components: {
	},
	data () {
		return {
			delected6:false,
			shejiGongsi_list:['一公司','二公司','三公司'],
			qiQiZhang_selected_index:0,
			qiQiZhang_list:[
				{'name':'上海火车站','num':20},
				{'name':'上海火车站','num':20},
				{'name':'上海火车站','num':20},
				{'name':'上海火车站','num':20},
				{'name':'上海火车站','num':20},
				{'name':'上海火车站','num':20},
				{'name':'上海火车站','num':20},
				{'name':'上海火车站','num':20},
				{'name':'上海火车站','num':20},
				{'name':'上海火车站','num':20},
				{'name':'上海火车站','num':20},
				{'name':'上海火车站','num':20},
				{'name':'上海火车站','num':20},
			],
			guanLianLine_selected_index:0,
			guanLianLine_list:[
				{'name':'01路','num':3},
				{'name':'02路','num':2},
				{'name':'03路','num':5},
				{'name':'01路','num':3},
				{'name':'02路','num':2},
				{'name':'03路','num':5},
				{'name':'01路','num':3},
				{'name':'02路','num':2},
				{'name':'03路','num':5},
				{'name':'01路','num':3},
				{'name':'02路','num':2},
			],
			banGong_position:['四公司一车队','四公司二车队','四公司三车队'],
			keyong_cheliang:[
				'S2L-039G','S2L-039G','S2L-039G','S2L-039G','S2L-039G','S2L-039G','S2L-039G','S2L-039G','S2L-039G','S2L-039G','S2L-039G','S2L-039G','S2L-039G',
				'S2L-039G','S2L-039G','S2L-039G','S2L-039G','S2L-039G','S2L-039G','S2L-039G','S2L-039G','S2L-039G','S2L-039G','S2L-039G','S2L-039G','S2L-039G',
				'S2L-039G','S2L-039G','S2L-039G','S2L-039G','S2L-039G','S2L-039G','S2L-039G','S2L-039G','S2L-039G','S2L-039G','S2L-039G','S2L-039G','S2L-039G',
				'S2L-039G','S2L-039G','S2L-039G','S2L-039G','S2L-039G','S2L-039G','S2L-039G','S2L-039G','S2L-039G','S2L-039G','S2L-039G','S2L-039G','S2L-039G',
			],
		}
	},
	mounted(){
	},
	methods:{
		change_detaile_delected(bool){
			if(this.delected6 != bool){
				this.delected6 = bool;
			}
		},
		shift_qiQiZhang(index){
			if(this.qiQiZhang_selected_index != index){
				this.qiQiZhang_selected_index = index;
			}
		},
		shift_guanLianLine(index){
			if(this.guanLianLine_selected_index != index){
				this.guanLianLine_selected_index = index;
			}
		},
	},
	computed:{
	},
}
</script>

<style lang="postcss" scoped>
#archives-detaile{
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 1080px;
	font-family: PingFangSC-Regular;
}
.archives-detaile-body{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 3195px;
	height: 1000px;
}
.fontColor1{
	color: #4089FF;
}
.font20{
	font-size: 20px;
}
/* left */
.archives-detaile-left{
	width: 675px;
	height: 100%;
	box-shadow: inset 0 0 20px 0 #008BFF;
	border-radius: 10px;
	padding: 0 20px;
	box-sizing: border-box;
}
.detaile-left-1{
	width: 100%;
	height: 110px;
	line-height: 110px;
	color: #4089FF;
	box-sizing: border-box;
	padding-left: 40px;
}
.detaile-left-com1{
	width: 100%;
	height: 80px;
	line-height: 80px;
	border: 2px solid rgba(0,139,255,0.50);
	border-radius: 10px;
	margin-bottom: 25px;
	box-sizing: border-box;
	padding-left: 40px;
}
.detaile-left-com2{
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	height: 160px;
	line-height: 160px;
	border-radius: 10px;
	box-sizing: border-box;
	padding-left: 40px;
	border: 2px solid rgba(0,139,255,0.50);
	cursor: pointer;
}
.detaile-left-6{
	margin: 95px 0 40px;
}
.detaile-delected-6{
	box-shadow: inset 0 0 40px 0 #008BFF;
	border: 0 solid #008BFF;
}
.detaile-left-com2-top{
	flex: 1;
	line-height: 70px;
	width: 100%;
}
.detaile-left-com2-middle{
	display: flex;
	flex-direction: row;
	justify-content:flex-start;
	align-items: center;
	width: 100%;
	height: 20px;
}
.circle-green{
	width: 20px;
	height: 20px;
	box-sizing: border-box;
	border: 5px solid #28EA8D;
	border-radius: 50%;
	margin-right: 20px;
}
.horizontal-line{
	width: 515px;
	height: 5px;
	border: none;
	background-color: rgba(0,139,255,0.50);
	margin-right: 20px;
}
.circle-red{
	width: 20px;
	height: 20px;
	box-sizing: border-box;
	border: 5px solid #EA2828;
	border-radius: 50%;
}
.detaile-left-com2-bottom{
	flex: 1;
	line-height: 70px;
	width: 100%;
}

/* right */
.archives-detaile-right{
	width: 2500px;
	height: 100%;
	box-sizing: border-box;
	padding: 0 20px;
	box-shadow: inset 0 0 20px 0 #008BFF;
	border-radius: 10px;
}
.archives-detaile-right-top{
	width: 100%;
	height: 110px;
	line-height: 110px;
	text-align: left;
}
/* archives-detaile-right-bottom */
.archives-detaile-right-bottom{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
}
/* detaile-right-bottom-left */
.detaile-right-bottom-left{
	width: 1220px;
	min-height: 100px;
}
.bottom-left-1{
	width: 100%;
	height: 150px;
	box-shadow: inset 0 0 15px 0 #008BFF;
	border-radius: 10px;
	box-sizing: border-box;
	padding-left: 20px;
}
.bottom-left-1-sheji-gongsi{
	height: 50%;
	line-height: 75px;
}
.bottom-left-1-sheji-gongsi-list{
	height: 50%;
	line-height: 75px;
}
.bottom-left-1:last-child{
	margin-right: 0;
}
.shejigongsi-item{
	margin-right: 40px;
}
.bottom-left-2{
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	width: 100%;
	height: 320px;
	box-shadow: inset 0 0 15px 0 #008BFF;
	border-radius: 10px;
	margin: 40px 0 20px;
	box-sizing: border-box;
	padding-left: 20px;
}
.bottom-left-3{
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	width: 100%;
	height: 320px;
	box-shadow: inset 0 0 15px 0 #008BFF;
	border-radius: 10px;
	box-sizing: border-box;
	padding-left: 20px;
}
.cursor-pointert{
	cursor: pointer;
}
.archives-aaa-bbb{
	height: 80px;
	line-height: 90px;
	width: 100%;
}
.archives-ccc-ddd{
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-content:flex-start;
	flex-wrap: wrap;
	flex: 1;
	width: 100%;
	overflow: auto;
}

.archives-ccc-ddd::-webkit-scrollbar{
	display: none;
}
.item-container-com{
	padding-right:10px;
	height: 60px;
	line-height: 60px;
	margin: 0 20px 20px 0;
	border: 2px solid rgba(0,139,255,0.50);
	border-radius: 10px;
}
.vertical-line{
	display: inline-block;
	width: 5px;
	height: 20px;
	margin-left: 8px;
	margin-right: 8px;
	background-color: #0068C4;
}
.color-green{
	color: #28EA8D;
}
.selected-item{
	box-shadow: inset 0 0 40px 0 #008BFF;
}
/* detaile-right-bottom-right */
.detaile-right-bottom-right{
	width: 1220px;
	min-height: 100px;
}
.bottom-right-1{
	width: 100%;
	height: 150px;
	box-shadow: inset 0 0 15px 0 #008BFF;
	border-radius: 10px;
	box-sizing: border-box;
	padding-left: 20px;
}
.bottom-right-2{
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	/* align-items: flex-start; */
	margin-top: 40px;
	width: 100%;
	height: 660px;
	box-shadow: inset 0 0 15px 0 #008BFF;
	border-radius: 10px;
	box-sizing: border-box;
	padding-left: 20px; 
}
.archives-eee-fff{
	height: 85px;
	line-height: 80px;
	width: 100%;
}
</style>