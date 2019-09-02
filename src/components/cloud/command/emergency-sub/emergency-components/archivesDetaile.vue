<template>
<div id="archives-detaile"> <!-- 配置档案列表详情 -->
	<div class="archives-detaile-body">
		<!-- left -->
		<div class="archives-detaile-left">
			<div class="detaile-left-1">线路配置信息</div>
			<div class="detaile-left-com1"><span class="fontColor1">线路编号</span> &nbsp; -</div>
			<div class="detaile-left-com1" v-if="archivesDetaile.line.length > 9"><span class="fontColor1">线路名称</span> &nbsp; <span class="cursor-pointer" @mouseenter="enter(archivesDetaile.line,$event)" @mouseleave='out'>{{archivesDetaile.line}}</span></div>
			<div class="detaile-left-com1" v-else><span class="fontColor1">线路名称</span> &nbsp; <span>{{archivesDetaile.line}}</span></div>
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
								@click="shift_qiQiZhan(item,index)">
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
								v-for="(item,index) in showData.guanlian_line[selected_qiqizhan].lines"
								:key="index"
								:class="{'selected-item':guanLianLine_selected_index == index}"
								@click="shift_guanLianLine(item,index)">
								{{item.line_name}}
								<span class="vertical-line"></span>
								<span class="color-green">{{item.value}}</span><span class="font20"> 辆</span>
							</span>
						</div>
					</div>
				</div>

				<div class="detaile-right-bottom-right">
					<div class="bottom-right-1">
						<div class="bottom-left-1-sheji-gongsi fontColor1">车队办公点</div>
						<div class="bottom-left-1-sheji-gongsi-list cursor-pointert" v-html="show_offices_html"></div>
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
	<div id="tip_line_name">{{msg}}</div>
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
			show_offices_html:'',
			showData:{},   //用于在页面上显示的数据
			begin_data:{}, //存放起点位置数据
			end_data:{},   //存放终点位置数据
			msg:'',
			tipDom:{},
		}
	},
	mounted(){
		this.tipDom = document.getElementById('tip_line_name');
	},
	methods:{
		out(){
			this.tipDom.style.visibility = 'hidden';
		},
		enter(msg,event){
			this.msg = msg;
			let cx = event.clientX - 30;
			let cy = event.clientY - 90;
			this.tipDom.style.left = `${cx}px`;
			this.tipDom.style.top = `${cy}px`;
			this.tipDom.style.visibility = 'visible';
		},
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

				this.show_offices_html = this.begin_data.offices_html;
			}else{	//（2） 选中终点位置
				this.showData = this.end_data;
				this.selected_qiqizhan = this.end_data.selected_qiqizhan;
				this.selected_guanlianline = this.end_data.selected_guanlianline;

				this.show_offices_html = this.end_data.offices_html;
			}
		},
		shift_qiQiZhan(item,index){
			// if(this.qiQiZhang_selected_index != index){
				this.qiQiZhang_selected_index = index;
				this.guanLianLine_selected_index = 0; //重置 '起讫站关联线路' 选项
				let qiqizhan_name = item.stationId; //获取选中的 '范围内起讫站' 站点名
				this.selected_qiqizhan = qiqizhan_name;
				//重置 '所选线路可用车辆' 内容为 此刻选中的 '范围内起讫站' 下第一条线关联路下的 '所选线路可用车辆'
				this.selected_guanlianline = this.showData.guanlian_line[qiqizhan_name].first_line;
			// }
		},
		shift_guanLianLine(item,index){
			if(this.guanLianLine_selected_index != index){
				this.guanLianLine_selected_index = index;
				this.selected_guanlianline = item.line_name;
			}
		},
		formatDate(date) { //日期格式化
			let greenwichTime = new Date(date);
			// let year = greenwichTime.getFullYear();
			let month = greenwichTime.getMonth() + 1;
			let month2 = month < 10 ? `0${month}` : month;
			let dt = greenwichTime.getDate();
			let dt2 = dt < 10 ? `0${dt}` : dt;
			let hours = greenwichTime.getHours();
			let hours2 = hours < 10 ? `0${hours}` : hours;
			let minutes = greenwichTime.getMinutes();
			let minutes2 = minutes < 10 ? `0${minutes}` : minutes;
			return `${month2}.${dt2} ${hours2}:${minutes2}`;
		},
		sort_stations(arr){
			return arr.sort(function(a,b){
				return -parseInt(a.busNum) + parseInt(b.busNum);
			})
		},
		sort_lines(arr){
			return arr.sort(function(a,b){
				return -a.value + b.value;
			})
		},
		construct_data(beginEnd_data){  //构造特定格式数据 begin_data 与 end_data
			let begin_end = JSON.parse(JSON.stringify(beginEnd_data));
			//【1】站点按 busNum 排序，获取排序后的 stations
			let stations_begin_or_end = this.sort_stations(begin_end.stations);
			begin_end.stations = stations_begin_or_end;

			let buses_begin_or_end = begin_end.buses;
			let offices_begin_or_end = begin_end.offices;

			begin_end.selected_qiqizhan = begin_end.stations[0].name;  //设置 '范围内起讫站' 初始选中项
			begin_end.selected_guanlianline = '';	//设置 '所选线路可用车辆' 初始选中项
			begin_end.guanlian_line = {};

			//临时存储数据的变量
			let init_guanlianline_times = true;
			// let classify_lines_by_station = {};
			let classify_lines_by_station = [];
			let classify_buses_by_station = {};
			let not_remove_repeat_companies = []; //未去重的 company 统计数组。用于统计 '涉及公司'
			
			// 【2】
			for(let i=0;i<stations_begin_or_end.length;i++){
				let station_item = stations_begin_or_end[i];
				let station_name = station_item.name;
				let station_id = station_item.stationId;

				//(1.1)整理每个 stations 内的 lines，初始每条线路内车辆数量为0，最终classify_lines_by_station格式:
				// {
				// 	"sa14ds2d":[
				// 		{"line_name":"01路", value:0},
				// 		{"line_name":"02路", value:0},
				// 	],
				// 	"s2a14ca2":[
				// 		{"line_name":"03路", value:0},
				// 		{"line_name":"04路", value:0},
				// 	],
				// 	"asc1c13d":[
				// 		{"line_name":"05路", value:0},
				// 		{"line_name":"06路", value:0},
				// 	]
				//  ......
				// }
				if(!classify_lines_by_station[station_id]){
					classify_lines_by_station[station_id] = [];
				}
				if(station_item.lines){
					let station_lines_array = station_item.lines.split("、")
					for(let x = 0; x < station_lines_array.length; x++){
						classify_lines_by_station[station_id].push({
							"line_name":station_lines_array[x],
							"bus_num":0
						});
					}

				}else{
					classify_lines_by_station[station_id] = [];
				}

				//(1.3)根据站点 station 将 buses 归类,最终classify_buses_by_station格式:
				// {
				// 			"5f61s616s":[
				// 					{vno: "S1L-034G", station: "上海火车站", line: "02路", company: "一公司"}
				// 			],
				// 			"sd4c1616ds":[
				// 					{vno: "S2L-035G", station: "宜山路站", line: "03路", company: "二公司"},
				// 					{vno: "S2L-036G", station: "宜山路站", line: "03路", company: "二公司"},
				// 					{vno: "S2L-037G", station: "宜山路站", line: "04路", company: "二公司"}
				// 			],
				// 			"5cv6sd1vd6":[
				// 					{vno: "S3L-038G", station: "江月路站", line: "05路", company: "三公司"},
				// 					{vno: "S3L-039G", station: "江月路站", line: "06路", company: "三公司"}
				// 			],
				// 		......
				// }
				classify_buses_by_station[station_id] = [];
				for(let j=0;j<buses_begin_or_end.length;j++){
					if(station_id == buses_begin_or_end[j].stationId){
						classify_buses_by_station[station_id].push(buses_begin_or_end[j])
					}

					//(1.4)统计每个站点下的公司(未去重)
					not_remove_repeat_companies.push(buses_begin_or_end[j].company);
				}

			}
			//(1.4.1)公司去重,赋值
			begin_end.involving_companies = [...new Set(not_remove_repeat_companies)];
			
			//【3】设置 guanlian_line
			for(let station_id in classify_lines_by_station){
				let classify_lines_item = classify_lines_by_station[station_id];
				let classify_buses_item = classify_buses_by_station[station_id];
				begin_end.guanlian_line[station_id] = {
					'first_line':'',
					'lines':[],
					'buses':{}
				};
				for(let m=0; m<classify_lines_item.length; m++){
					let line_item_name = classify_lines_item[m].line_name;

					let temp_busNum = 0; //计数每条线路下车辆数
					begin_end.guanlian_line[station_id].buses[line_item_name] = [];

					for(let n=0; n < classify_buses_item.length; n++){
						if(classify_buses_item[n].line == line_item_name){
							temp_busNum++;
							begin_end.guanlian_line[station_id].buses[line_item_name].push(classify_buses_item[n].vno);
						}
					}
					
					begin_end.guanlian_line[station_id].lines.push({
						"line_name":line_item_name,
						"value":temp_busNum
					});
				}
			}
	
			//【4】排序 guanlian_line
			let guanlian_line = begin_end.guanlian_line;
			for(let station_id in guanlian_line){
				let lines_item = guanlian_line[station_id].lines;
				guanlian_line[station_id].lines = this.sort_lines(lines_item);
			}
			
			//【5】设置first_line
			for(let station_id in guanlian_line){
				let guanlian_line_item = guanlian_line[station_id];
				if(!guanlian_line_item.lines.length){
					continue;
				}
				guanlian_line_item.first_line = guanlian_line_item.lines[0].line_name;
			}

			//【6】设置selected_guanlianline
			let station_id = begin_end.stations[0].stationId;
			if(begin_end.guanlian_line[station_id].lines.length){
				begin_end.selected_guanlianline = begin_end.guanlian_line[station_id].lines[0].line_name;
			}

			//【7】处理 offices 数据为 <marquee> 包括的 html 字符串，目的：解决首次滚动到容器左侧边界时突然消失重新滚动
			let offices_html_1 = '<marquee onMouseOut="this.start()" onMouseOver="this.stop()" scrollamount=15>';
			let offices_html_2 = '';
			let offices_html_3 = '</marquee>';
			for(let t=0; t<offices_begin_or_end.length; t++){
				offices_html_2 = `${offices_html_2}<span>${offices_begin_or_end[t].name}</span>&nbsp;&nbsp;&nbsp;`
			}
			begin_end.offices_html = `${offices_html_1}${offices_html_2}${offices_html_3}`;
			// console.log(begin_end.offices_html)
			// console.log("classify_lines_by_station--",classify_lines_by_station);
			console.log("begin_end----",begin_end);
			return begin_end;
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
				"companyNum":"3",
				"officeNum":"2",
				"stationNum":"3",
				"lineNum":"6",
				"busNum":"15",
				"buses":start_buses,
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
				"selected_qiqizhan":'上海火车站',
				"selected_guanlianline":'01路',
				"involving_companies":['一公司','二公司','三公司'],
				"stations":[
					{
						"name":"上海火车站",
						"lnglat":['经度','纬度'],
						"busNum":"4",
						"lines":"01路、02路",
						"lines_arr":["01路","02路"],
						"stationId":"1"
					},
					{
						"name":"宜山路站",
						"lnglat":['经度','纬度'],
						"busNum":"3",
						"lines":"03路、04路",
						"lines_arr":["03路","04路"],
						"stationId":"2"
					},
					{
						"name":"江月路站",
						"lnglat":['经度','纬度'],
						"busNum":"2",
						"lines":"05路、06路",
						"lines_arr":["05路","06路"],
						"stationId":"3"
					}
				],
				"guanlian_line":{
					'1':{
						'first_line':'01路',
						'lines':[
							{"line_name":"01路", value:3},
							{"line_name":"02路", value:1}
						],
						'buses':{
							'01路':['S2L-039G','S2L-039G','S2L-039G'],
							'02路':['S2L-039G'],
						}
					},
					'2':{
						'first_line':'03路',
						'lines':[
							{"line_name":"01路", value:3},
							{"line_name":"02路", value:1}
						],
						'buses':{
							'03路':['S2L-039G','S2L-039G'],
							'04路':['S2L-039G'],
						}
					},
					'3':{
						'first_line':'05路',
						'lines':[
							{"line_name":"01路", value:3},
							{"line_name":"02路", value:1}
						],
						'buses':{
							'05路':['S2L-039G'],
							'06路':['S2L-039G'],
						}
					},
				},
				"offices_html":'<marquee onmouseout="this.start()" onmouseover="this.stop()" scrollamount="15"><span>二公司二车队</span>&nbsp;&nbsp;&nbsp;<span>三公司二车队</span>&nbsp;&nbsp;&nbsp;</marquee>'
			}
*/
			//【1】起点位置数据
			let sit_begin_msg = archives_detaile.begin;
			//构造特定格式数据 begin_data，便于页面切换展示不同数据（begin_data 与 end_data）
			let begin_data = this.construct_data(sit_begin_msg);
			this.selected_qiqizhan = begin_data.selected_qiqizhan;
			this.selected_guanlianline = begin_data.selected_guanlianline;
			this.show_offices_html = begin_data.offices_html;
			this.begin_data = begin_data;
			//【2】终点位置数据
			let sit_end_msg = archives_detaile.end;
			//构造特定格式数据 end_data，便于页面切换展示不同数据（begin_data 与 end_data）
			let end_data = this.construct_data(sit_end_msg);
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
.bottom-left-1:last-child{
	margin-right: 0;
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
	overflow: hidden;
}
.bottom-left-1-sheji-gongsi-list::-webkit-scrollbar{
	display: none;
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
#tip_line_name{
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
.cursor-pointer{
	cursor: pointer;
}
</style>