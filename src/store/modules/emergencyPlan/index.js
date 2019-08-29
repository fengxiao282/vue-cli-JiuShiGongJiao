import { httpbase } from '../../../utils/ajax.js';
let baseUrl = 'http://203.156.246.55:2205/ScreenCenter/getScreenData';

// 状态管理
let emergencyPlan = {
	namespaced: true,
	state: {
        emergencyevents:[],
        majorevents:[],
        active:[],
        railsupport:[],
        guojiangSupport:[],
        emergencyevents_buses:null, // 投入使用的车辆涉及到的公司
        majorevents_buses:null,
        active_buses:null,
        railsupport_buses:null,
        guojiangSupport_buses:null,
        manager_left:[],
        manager_right:[],
        selectedRailsupport:[], //选中项
        selectedMajorevents:[],
        selectedGuojiangSupport:[],
        selectedEmergencyevents:[],
        selectedActive:[],
        archives_list:[],
        archives_detaile:null,
        lineConfigDetailInfo: {},
    },
    getters: {
        emergencyevents(state){
            return state.emergencyevents;
        },
        majorevents(state){
            return state.majorevents;
        },
        active(state){
            return state.active;
        },
        railsupport(state){
            return state.railsupport;
        },
        guojiangSupport(state){
            return state.guojiangSupport;
        },
        emergencyevents_buses(state){ //
            return state.emergencyevents_buses;
        },
        majorevents_buses(state){
            return state.majorevents_buses;
        },
        active_buses(state){
            return state.active_buses;
        },
        railsupport_buses(state){
            return state.railsupport_buses;
        },
        guojiangSupport_buses(state){
            return state.guojiangSupport_buses;
        },
        manager_left(state){
            return state.manager_left;
        },
        manager_right(state){
            return state.manager_right;
        },
        selectedRailsupport(state){
            return state.selectedRailsupport;
        },
        selectedMajorevents(state){
            return state.selectedMajorevents;
        },
        selectedGuojiangSupport(state){
            return state.selectedGuojiangSupport;
        },
        selectedEmergencyevents(state){
            return state.selectedEmergencyevents;
        },
        selectedActive(state){
            return state.selectedActive;
        },
        archives_list(state){
            return state.archives_list;
        },
        archives_detaile(state){
            return state.archives_detaile;
        },
    },
    mutations: {
        emergencyevents(state,data){
            state.emergencyevents = data;
        },
        majorevents(state,data){
            state.majorevents = data;
        },
        active(state,data){
            state.active = data;
        },
        railsupport(state,data){
            state.railsupport = data;
        },
        guojiangSupport(state,data){
            state.guojiangSupport = data;
        },
        emergencyevents_buses(state,data){ //
            state.emergencyevents_buses = data;
        },
        majorevents_buses(state,data){ //
            state.majorevents_buses = data;
        },
        active_buses(state,data){ //
            state.active_buses = data;
        },
        railsupport_buses(state,data){ //
            state.railsupport_buses = data;
        },
        guojiangSupport_buses(state,data){ //
            state.guojiangSupport_buses = data;
        },
        manager_left(state,data){
            state.manager_left = data;
        },
        manager_right(state,data){
            state.manager_right = data;
        },
        selectedRailsupport(state,data){
            state.selectedRailsupport = data;
        },
        selectedMajorevents(state,data){
            state.selectedMajorevents = data;
        },
        selectedGuojiangSupport(state,data){
            state.selectedGuojiangSupport = data;
        },
        selectedEmergencyevents(state,data){
            state.selectedEmergencyevents = data;
        },
        selectedActive(state,data){
            state.selectedActive = data;
        },
        archives_list(state,data){
            state.archives_list = data;
        },
        archives_detaile(state,data){
            state.archives_detaile = data;
        },
        resetlineConfigDetailInfo(state,{data}){
            state.lineConfigDetailInfo = data;
        },
	},
	actions: {
        railSupport(context,params){  //应急预案
            httpbase(`${baseUrl}`,'POST' , params, null, 10000, {"Content-Type":"application/json;charset=UTF-8"}, 'raw')().then(function(res){
            // type: 突发事件(1) 、大型赛事(2) 、大型活动(3) 、轨交支援(4) 、驳江支援(5) 
                let commitEventName = '';
                if(params.type == 1){
                    commitEventName = 'emergencyevents';
                }else if(params.type == 2){
                    commitEventName = 'majorevents';
                }else if(params.type == 3){
                    commitEventName = 'active';
                }else if(params.type == 4){
                    commitEventName = 'railsupport';
                }else if(params.type == 5){
                    commitEventName = 'guojiangSupport';
                }

                if(res.status == 200){
                    context.commit(commitEventName, res.data);
                }
            },function(err){
                console.log(err);
            });
        },
        get_lines(context,args){  //请求 4.1.1.2 统计突发事件已启动线路，在界面上高亮有车辆投入的公司
            // console.log('get_lines--',args)
            let params = args.params;
            let len = params.length;
            if(!len){
                return;
            }
            let num = 0;
            let tempArr  = [];
            let arr_1 = [];

            //(1)ajax请求
            for(let i = 0; i<len; i++){
                httpbase(`${baseUrl}`,'POST' , {"collectionName":'4_1_1_2',"itemId":params[i]}, null, 20000, {"Content-Type":"application/json;charset=UTF-8"}, 'raw')().then(function(res){
                    if(res.status == 200){
                        if(res.data.length){
                            tempArr.push(res.data[0]);
                        }
                        num++;
                        if(num == len){
                            //(2.1)将数据根据 itemId 分类
                            for(let k = 0; k < tempArr.length; k++){
                                let itemId = tempArr[k].itemId;
                                let item_lineEmergency = tempArr[k].lineEmergency;

                                for(let m = 0; m < item_lineEmergency.length; m++){
                                    arr_1.push({
                                        'collectionName':'4_1_1_3',
                                        'itemId':itemId,
                                        'line':item_lineEmergency[m].line
                                    });
                                }
                            }

                            //(2)数据请求完毕,整理数据为指定格式，格式如下
                            // let arr_1 = [
                            //      {'collectionName':'4_1_1_3', itemId: "70A5367C647989F7E0531F2C220ACE15", line: "3号线上海火车站（北广场）-江湾镇站"},
                            //      {'collectionName':'4_1_1_3', itemId: "70A5367C647789F7E0531F2C220ACE15", line: "1号线莘庄站-人民广场站"},
                            //      {'collectionName':'4_1_1_3', itemId: "8B40B5CC79277357E0533370580AE584", line: "8号线曲阳路站-人民广场站"}
                            //       ......
                            //     ]                        //(2)数据请求完毕,整理数据为指定格式，格式如下
                            // let arr_1 = [
                            //      {'collectionName':'4_1_1_3', itemId: "70A5367C647989F7E0531F2C220ACE15", line: "3号线上海火车站（北广场）-江湾镇站"},
                            //      {'collectionName':'4_1_1_3', itemId: "70A5367C647789F7E0531F2C220ACE15", line: "1号线莘庄站-人民广场站"},
                            //      {'collectionName':'4_1_1_3', itemId: "8B40B5CC79277357E0533370580AE584", line: "8号线曲阳路站-人民广场站"}
                            //       ......
                            //     ]
                            // console.log('arr_1--',arr_1);
                            context.dispatch("get_buses",{'event_name':args.event_name,'params':arr_1});
                        }
                    }
                },function(err){
                    console.log(err);
                });
            }
        },
        get_buses(context,args){ // 分别获取 emergencyevents_lines, majorevents_lines, active_lines, railsupport_lines, guojiangSupport_lines 下的 bus
            // params数据格式见 railsupport_lines
            // console.log('railsupport_buses--',params)
            let params = args.params;
            let len = params.length;
            if(!len){
                return;
            }
            let num = 0;
            let tempArr  = [];
            let arr_1 = {};

            //(1)ajax请求
            for(let i = 0; i<len; i++){
                httpbase(`${baseUrl}`,'POST' , params[i], null, 20000, {"Content-Type":"application/json;charset=UTF-8"}, 'raw')().then(function(res){
                    if(res.status == 200){
                        if(res.data.length){
                            tempArr.push(res.data);
                        }
                        num++;

                        // tempArr 数据整理完毕格式:
                        // tempArr = [
                        //     [
                        //         {itemId: "70A5367C647789F7E0531F2C220ACE15", itemName: "1号线轨道交通支援", line: "1号线莘庄站-人民广场站", busList: []},
                        //         {itemId: "70A5367C647789F7E0531F2C220ACE15", itemName: "1号线轨道交通支援", line: "1号线莘庄站-人民广场站", busList: []},
                        //         ...
                        //     ],
                        //     [
                        //         {itemId: "70A5367C647789F7E0531F2C22jhdE15", itemName: "2号线轨道交通支援", line: "2号线莘庄站-人民广场站", busList: []},
                        //         ...
                        //     ],
                        //     ...
                        // ]
                        
                        if(num == len){
                            //(2.1)将数据根据 itemId 分类
                            for(let k = 0; k < tempArr.length; k++){
                                // console.log('bus_list--',tempArr[k]);
                                let tempArr_inner_item = tempArr[k];
                                let itemId = tempArr_inner_item[0].itemId;  //tempArr下子数组内每个元素的itemId一样，只取一次即可

                                for(let m = 0; m < tempArr_inner_item.length; m++){
                                    let item_ = tempArr_inner_item[m];
                                    let bus_list = item_.busList;
                                    arr_1[itemId] = [];

                                    for(let n = 0; n < bus_list.length; n++){
                                        arr_1[itemId].push(bus_list[n].company.substr(2,3));
                                    }

                                }
                            }

                            // (2)数据请求完毕,整理数据为指定格式，格式如下
                            // let arr_1 = {
                            // 	"65s4vd6sa1c6a":['一公司','一公司','一公司'],
                            // 	"65s4vd6csa5a4":['一公司','一公司','一公司'],
                            // 	"sca5a16ac665s":['一公司','一公司','一公司']
                            // 	......
                            // }

                            // console.log(`${args.event_name}--`,arr_1);
                            context.commit(args.event_name, arr_1);
                        }
                    }
                },function(err){
                    console.log(err);
                });

            }
        },
        manager_left(context,params){  //现场管理人员上岗 left
            // httpbase(`${baseUrl}/4_2_1`,'get' , params)().then(function(res){
            httpbase(`http://zh.84000.com.cn:27888/bimp-base-bigData/requestData.do?modularName=BigScreen&keyName=getExpoFieldManageInfo`,'get' , params)().then(function(res){
                if(res.status == 200){
                    context.commit('manager_left', res.data.mans);
                }
            },function(err){
                console.log(err);
            });
        },
        manager_right(context,params){  //现场管理人员上岗计划  right
            httpbase(`${baseUrl}/4_1_1_7`,'get' , params)().then(function(res){
                if(res.status == 200){
                    context.commit('manager_right', res.data);
                }
            },function(err){
                console.log(err);
            });
        },
        selectedRailsupport(context,params){  //选中项
            context.commit('selectedRailsupport', params);
        },
        selectedMajorevents(context,params){
            context.commit('selectedMajorevents', params);
        },
        selectedGuojiangSupport(context,params){
            context.commit('selectedGuojiangSupport', params);
        },
        selectedEmergencyevents(context,params){
            context.commit('selectedEmergencyevents', params);
        },
        selectedActive(context,params){
            context.commit('selectedActive', params);
        },
        archives_list(context,params){ //配置档案
            httpbase(`${baseUrl}/4_1_2_3`,'get' , null)().then(function(res){
                if(res.status == 200){
                    context.commit('archives_list', res.data);
                }
            },function(err){
                console.log(err);
            });
        },
        archives_detaile(context,params){ //预案线路详细清单
            console.log('params--',params)
            httpbase(`${baseUrl}`,'POST' , params, null, 10000, {"Content-Type":"application/json;charset=UTF-8"}, 'raw')().then(function(res){
                if(res.status == 200){
                    context.commit('archives_detaile', res.data[0]);
                }
            },function(err){
                console.log(err);
            });
        },
	}
}

export default emergencyPlan;

