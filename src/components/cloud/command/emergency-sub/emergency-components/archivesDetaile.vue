<template>
<div id="archives-detaile"> <!-- 配置档案列表详情 -->
	<div class="archives-detaile-body">
		<!-- left -->
		<div class="archives-detaile-left">
			<div class="detaile-left-1">线路配置信息</div>
			<div class="detaile-left-com1"><span class="fontColor1">线路编号</span> &nbsp; -</div>
			<div class="detaile-left-com1"><span class="fontColor1">线路名称</span> &nbsp; <span>{{archivesDetaile.line}}</span></div>
			<div class="detaile-left-com1"><span class="fontColor1">开始时间</span> &nbsp; {{archivesDetaile.show_createTime}}</div>
			<div class="detaile-left-com1"><span class="fontColor1">结束时间</span> &nbsp; -</div>

			<div class="detaile-left-com2 detaile-left-6"
			:class="{'detaile-delected-6':delected_start}"
			@click="change_detaile_delected(true)">
				<div class="detaile-left-com2-top">
					<span class="fontColor1">起点位置</span> &nbsp; {{archivesDetaile.beginStation}}
				</div>
				<div class="detaile-left-com2-middle">
					<div class="circle-green"></div>
					<div class="horizontal-line"></div>
				</div>
				<div class="detaile-left-com2-bottom">
					<span class="fontColor1">起点范围</span> &nbsp; {{archivesDetaile.beginRange}}km
				</div>
			</div>
			
			<div class="detaile-left-com2" :class="{'detaile-delected-6':!delected_start}"
			@click="change_detaile_delected(false)">
				<div class="detaile-left-com2-top">
					<span class="fontColor1">终点位置</span> &nbsp; {{archivesDetaile.endStation}}
				</div>
				<div class="detaile-left-com2-middle">
					<div class="horizontal-line"></div>
					<div class="circle-red"></div>
				</div>
				<div class="detaile-left-com2-bottom">
					<span class="fontColor1">终点范围</span> &nbsp; {{archivesDetaile.endRange}}km
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
							<span v-for="(item,index) in showData.involving_companies" :key="index" class="shejigongsi-item">{{item}}</span>
						</div>
					</div>

					<div class="bottom-left-2">
						<div class="archives-aaa-bbb fontColor1">范围内起讫站</div>
						<div class="archives-ccc-ddd" v-if="!!selected_qiqizhan">
							<span class="item-container-com cursor-pointert"
								v-for="(item,index) in showData.stations"
								:key="index"
								:class="{'selected-item':qiQiZhang_selected_index == index}"
								@click="shift_qiQiZhang(item,index)">
								{{item.name}}
								<span class="vertical-line"></span>
								<span class="color-green">{{item.busNum}}</span><span class="font20"> 辆</span>
							</span>
						</div>
					</div>

					<div class="bottom-left-3">
						<div class="archives-aaa-bbb fontColor1">起讫站关联线路</div>
						<div class="archives-ccc-ddd" v-if="!!selected_qiqizhan">
							<span class="item-container-com cursor-pointert"
								v-for="(value,key,index) in showData.guanlian_line[selected_qiqizhan].lines"
								:key="index"
								:class="{'selected-item':guanLianLine_selected_index == index}"
								@click="shift_guanLianLine(value,key,index)">
								{{key}}
								<span class="vertical-line"></span>
								<span class="color-green">{{value}}</span><span class="font20"> 辆</span>
							</span>
						</div>
					</div>
				</div>

				<div class="detaile-right-bottom-right">
					<div class="bottom-right-1">
						<div class="bottom-left-1-sheji-gongsi fontColor1">车队办公点</div>
						<div class="bottom-left-1-sheji-gongsi-list">
							<span v-for="(item,index) in showData.offices" :key="index" class="shejigongsi-item">{{item.name}}</span>
						</div>
					</div>
					<div class="bottom-right-2">
						<div class="archives-eee-fff fontColor1">所选线路可用车辆</div>
						<div class="archives-ccc-ddd" v-if="!!selected_qiqizhan && !!selected_guanlianline">
							<span class="item-container-com color-green"
								v-for="(value,key,index) in showData.guanlian_line[selected_qiqizhan].buses[selected_guanlianline]"
							 	:key="index">
								{{value}}
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
import { mapGetters } from 'vuex';

export default {
	name: 'archives-detaile',
	components: {
	},
	data () {
		return {
			delected_start:true,
			selected_qiqizhan:'',
			selected_guanlianline:'',
			qiQiZhang_selected_index:0,
			guanLianLine_selected_index:0,
			showData:{},   //用于在页面上显示的数据
			begin_data:{}, //存放起点位置数据
			end_data:{},   //存放终点位置数据
		}
	},
	mounted(){
	},
	methods:{
		change_detaile_delected(bool){
			if(this.delected_start == bool){
				return;
			}

			this.delected_start = bool;
			//重置选中项 index
			this.qiQiZhang_selected_index = 0;
			this.guanLianLine_selected_index = 0;

			if(bool){	//（1） 选中起点位置

				this.showData = this.begin_data;
				this.selected_qiqizhan = this.begin_data.selected_qiqizhan;
				this.selected_guanlianline = this.begin_data.selected_guanlianline;

			}else{	//（2） 选中终点位置

				this.showData = this.end_data;
				this.selected_qiqizhan = this.end_data.selected_qiqizhan;
				this.selected_guanlianline = this.end_data.selected_guanlianline;
			}
		},
		shift_qiQiZhang(item,index){
			if(this.qiQiZhang_selected_index != index){
				this.qiQiZhang_selected_index = index;
				this.guanLianLine_selected_index = 0; //重置 '起讫站关联线路' 选项

				let qiqizhan_name = item.name; //获取选中的 '范围内起讫站' 站点名
				this.selected_qiqizhan = qiqizhan_name;

				//重置 '所选线路可用车辆' 内容为 此刻选中的 '范围内起讫站' 下第一条线关联路下的 '所选线路可用车辆'
				this.selected_guanlianline = this.showData.guanlian_line[qiqizhan_name].first_line;
			}
		},
		shift_guanLianLine(value,key,index){
			if(this.guanLianLine_selected_index != index){
				this.guanLianLine_selected_index = index;
				this.selected_guanlianline = key;
			}
		},
		formatDate(date) { //日期格式化
			let greenwichTime = new Date(date);
			// let year = greenwichTime.getFullYear();

			let month = greenwichTime.getMonth();
			let month2 = month < 10 ? `0${month}` : month;

			let dt = greenwichTime.getDate();
			let dt2 = dt < 10 ? `0${dt}` : dt;

			let hours = greenwichTime.getHours();
			let hours2 = hours < 10 ? `0${hours}` : hours;

			let minutes = greenwichTime.getMinutes();
			let minutes2 = minutes < 10 ? `0${minutes}` : minutes;

			return `${month2}.${dt2} ${hours2}:${minutes2}`;
		},
		construct_data(stations_begin_or_end,buses_begin_or_end,offices_begin_or_end){  //构造特定格式数据 begin_data 与 end_data
			//（1.1）根据 起讫站 将数据分类存储到 temp_stations
			let temp_stations = {};
			let not_remove_repeat_companies = []; //未去重的 company 统计数组。用于统计 '涉及公司'

			let selected_qiqizhan = ''; //'范围内起讫站' 初始选中项
			let selected_guanlianline = ''; //所选线路可用车辆 初始选中项

			for(let i=0;i<stations_begin_or_end.length;i++){
				
				let stations_item = stations_begin_or_end[i];
				temp_stations[stations_item.name] = [];
				
				for(let j=0;j<buses_begin_or_end.length;j++){

					if(stations_item.name == buses_begin_or_end[j].station){
						temp_stations[stations_item.name].push(buses_begin_or_end[j])
					}

					not_remove_repeat_companies.push(buses_begin_or_end[j].company);

				}
				
			}
			//not_remove_repeat_companies 去重，统计 '涉及公司'
			let no_repeat_companies = [...new Set(not_remove_repeat_companies)];
			// console.log('temp_stations--',temp_stations)

			//（1.2）根据每个 '范围内起讫站' 选项 对'关联线路' 进行分类，然后根据 每个 '关联线路' 统计每个 '关联线路' 选项下对应的车辆(编码)
			let temp_guanlian_lineS = {};
			let init_qiqizhan_times = true;
			let init_guanlianline_times = true;
			for(let key in temp_stations){
				//（1.2.1）为 '范围内起讫站' 设置选中初始值
				if(init_qiqizhan_times){
					selected_qiqizhan = key;
					init_qiqizhan_times = false;
				}
				//（1.2.2）根据每个 '范围内起讫站' 选项 对'关联线路' 进行分类
				let single_station_lines = temp_stations[key];
				temp_guanlian_lineS[key] = {
				'lines':{},
				'buses':{},
				};

				let init_firstLine_times = true;
				// 根据 每个 '关联线路' 统计每个 '关联线路' 选项下对应的车辆(编码)
				for(let n=0;n<single_station_lines.length;n++){
					let line_name = single_station_lines[n].line;
					let vno_name = single_station_lines[n].vno;

					//（2.1）为 '起讫站关联线路' 设置选中初始值。作用:确定 页面首次打开时 '所选线路可用车辆' 的数据是哪条线路下的数据
					if(init_guanlianline_times){
						selected_guanlianline = line_name;
						init_guanlianline_times = false;
					}

					// （2.2）为 guanlian_line 下每个选项添加 first_line，用于保存每个 '范围内起讫站' 站点下第一个 '关联线路'
					// 用途：在切换 '范围内起讫站' 选项时，重置 '所选线路可用车辆' 内容为 此刻选中的 '范围内起讫站' 下第一条线关联路下的 '所选线路可用车辆'
					if(init_firstLine_times){
						temp_guanlian_lineS[key].first_line = line_name;
						init_firstLine_times = false;
					}
					

					if(!temp_guanlian_lineS[key].lines[line_name]){
						//初始化每条线路，并设置每条线路下初始车辆数为1
						temp_guanlian_lineS[key].lines[line_name] = 1;

						//统计每条线路内对应的车辆
						temp_guanlian_lineS[key].buses[line_name] = [vno_name];

					}else{

						temp_guanlian_lineS[key].lines[line_name]++;
						temp_guanlian_lineS[key].buses[line_name].push(vno_name);
					}
				}
			}
			// console.log('temp_guanlian_lineS--',temp_guanlian_lineS)

			/* （1.3）判断 stations_begin_or_end 中是否有数据，无数据时后台返回数据如下：
				let stations_begin_or_end = [
					{
						"name":null,
						"lnglat":[],
						"busNum":""
					}
				]
			*/
			// for(let h = stations_begin_or_end.length - 1; h>=0; h--){
			// 	if(!stations_begin_or_end[h].name){
			// 		stations_begin_or_end.splice(h,1);
			// 	}
			// }
			
			// console.log("stations--",stations_begin_or_end)
			// console.log("guanlian_line--",temp_guanlian_lineS)
			// console.log("最后--")

			let begin_or_end_data = {
				"selected_qiqizhan":selected_qiqizhan,  		//'范围内起讫站' 初始选中项
				"selected_guanlianline":selected_guanlianline,	//所选线路可用车辆 初始选中项
				"involving_companies":no_repeat_companies,
				"stations":stations_begin_or_end,
				"guanlian_line":temp_guanlian_lineS,
				"offices":offices_begin_or_end,
			};
			return begin_or_end_data;
		},		
	},
	computed:{
		...mapGetters("emergencyPlan", ["archives_detaile"]),
		archivesDetaile(){
			let archives_detaile = this.archives_detaile;
			if(!archives_detaile){
				return {
					"uid":"",
					"itemName":"",
					"line":"",
					"createTime":"",
					"beginStation":"",
					"beginPoint":"",
					"beginRange":"",
					"endStation":"",
					"endPoint":"",
					"endRange":"",
				};
			}
			if(archives_detaile.createTime){
				archives_detaile.show_createTime = this.formatDate(archives_detaile.createTime);
			}
			
	/*
		begin_data / end_data 最终处理完毕后数据格式如下:
		{
			selected_qiqizhan:'上海火车站',
			selected_guanlianline:'01路',
			"involving_companies":['一公司','二公司','三公司'],
			"stations":[
				{
					"name":"上海火车站",
					"lnglat":['经度','纬度'],
					"busNum":"4",
				},
				{
					"name":"宜山路站",
					"lnglat":['经度','纬度'],
					"busNum":"3",
				},
				{
					"name":"江月路站",
					"lnglat":['经度','纬度'],
					"busNum":"2",
				}
			],
			"guanlian_line":{
				'上海火车站':{
					'first_line':'01路',
					'lines':{'01路':3,'02路':1},
					'buses':{
						'01路':['S2L-039G','S2L-039G','S2L-039G'],
						'02路':['S2L-039G'],
					}
				},
				'宜山路站':{
					'first_line':'03路',
					'lines':{'03路':2,'04路':1},
					'buses':{
						'03路':['S2L-039G','S2L-039G'],
						'04路':['S2L-039G'],
					}
				},
				'江月路站':{
					'first_line':'05路',
					'lines':{'05路':1,'06路':1},
					'buses':{
						'05路':['S2L-039G'],
						'06路':['S2L-039G'],
					}
				},
			},
			"offices":[
				{
					"name":"一公司二车队",
					"lnglat":['经度','纬度'],
				},
				{
					"name":"二公司二车队",
					"lnglat":['经度','纬度'],
				},
				{
					"name":"三公司二车队",
					"lnglat":['经度','纬度'],
				}
			],
		};
	*/
			//【1】起点位置数据
			let sit_begin_msg = archives_detaile.begin;
			let stations_begin = sit_begin_msg.stations;
			let buses_begin = sit_begin_msg.buses;
			let offices_begin = sit_begin_msg.offices;

			//构造特定格式数据 begin_data，便于页面切换展示不同数据（begin_data 与 end_data）
			let begin_data = this.construct_data(stations_begin,buses_begin,offices_begin);
			this.selected_qiqizhan = begin_data.selected_qiqizhan;
			this.selected_guanlianline = begin_data.selected_guanlianline;
			this.begin_data = begin_data;

			//【2】终点位置数据
			let sit_end_msg = archives_detaile.end;
			let stations_end = sit_end_msg.stations;
			let buses_end = sit_end_msg.buses;
			let offices_end = sit_end_msg.offices;

			//构造特定格式数据 end_data，便于页面切换展示不同数据（begin_data 与 end_data）
			let end_data = this.construct_data(stations_end,buses_end,offices_end);
			this.end_data = end_data;

			this.showData = begin_data;
			return archives_detaile;
		},
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
	font-size: 40px;
	color: #fff;
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
	overflow: hidden;
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
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-content:flex-start;
	flex-wrap: wrap;
	height: 50%;
	line-height: 75px;
	overflow: auto;
}
.bottom-left-1-sheji-gongsi-list::-webkit-scrollbar{
	display: none;
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