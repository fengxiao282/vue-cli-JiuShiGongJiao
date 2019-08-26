import { httpbase } from '../../../utils/ajax.js';
import axios from 'axios'
import { analog_data } from '../../../store/modules/emergencyPlan/analog_data.js';

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
        emergencyevents_buses:[], //
        majorevents_buses:[],
        active_buses:[],
        railsupport_buses:[],
        guojiangSupport_buses:[],
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
            // return state.archives_list;
            return [
                {
                    "uid":"档案id",
                    "itemName":"轨交1号线应急支援",
                    "line":"1号线人民广场",
                    "beginStation":"人民广场",
                    "endStation":"上海火车站",
                    "createTime":"2019-7-01 10:30:00"
                },
                {
                    "uid":"档案id",
                    "itemName":"轨交2号线应急支援",
                    "line":"2号线人民广场",
                    "beginStation":"人民广场",
                    "endStation":"上海火车站",
                    "createTime":"2019-8-16 10:30:00"
                }
            ]
        },
        archives_detaile(state){
            // return state.archives_detaile;
            return analog_data;
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
        resetlineConfigDetailInfo(state,data){
            // state.archives_detaile = data;
            state.lineConfigDetailInfo = analog_data
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
        emergencyevents_buses(context,params){  //请求 4.1.1.4 统计突发事件已启动线路应急支援车辆所属公司，在界面上高亮有车辆投入的公司
            let num = 0;
            let tempArr  = [];
            let len = params.length;
            for(let i = 0; i<len; i++){
                httpbase(`${baseUrl}`,'POST' , {"collectionName":'4_1_1_4',"itemId":params[i]}, null, 10000, {"Content-Type":"application/json;charset=UTF-8"}, 'raw')().then(function(res){
                    if(res.status == 200){
                        if(res.data.length){
                            tempArr.push(res.data[0]);
                        }
                        num++;
                        if(num == len){
                            context.commit("emergencyevents_buses", tempArr);
                        }
                    }
                },function(err){
                    console.log(err);
                });
            }
        },
        majorevents_buses(context,params){  //同上，大型赛事
            let num = 0;
            let tempArr  = [];
            let len = params.length;
            for(let i = 0; i<len; i++){
                httpbase(`${baseUrl}`,'POST' , {"collectionName":'4_1_1_4',"itemId":params[i]}, null, 10000, {"Content-Type":"application/json;charset=UTF-8"}, 'raw')().then(function(res){
                    if(res.status == 200){
                        if(res.data.length){
                            tempArr.push(res.data[0]);
                        }
                        num++;
                        if(num == len){
                            context.commit("majorevents_buses", tempArr);
                        }
                    }
                },function(err){
                    console.log(err);
                });
            }
        },
        active_buses(context,params){  //同上，大型活动
            let num = 0;
            let tempArr  = [];
            let len = params.length;
            for(let i = 0; i<len; i++){
                httpbase(`${baseUrl}`,'POST' , {"collectionName":'4_1_1_4',"itemId":params[i]}, null, 10000, {"Content-Type":"application/json;charset=UTF-8"}, 'raw')().then(function(res){
                    if(res.status == 200){
                        if(res.data.length){
                            tempArr.push(res.data[0]);
                        }
                        num++;
                        if(num == len){
                            context.commit("active_buses", tempArr);
                        }
                    }
                },function(err){
                    console.log(err);
                });
            }
        },
        railsupport_buses(context,params){  //同上，轨交支援
            let num = 0;
            let tempArr  = [];
            let len = params.length;
            for(let i = 0; i<len; i++){
                httpbase(`${baseUrl}`,'POST' , {"collectionName":'4_1_1_4',"itemId":params[i]}, null, 10000, {"Content-Type":"application/json;charset=UTF-8"}, 'raw')().then(function(res){
                    if(res.status == 200){
                        if(res.data.length){
                            tempArr.push(res.data[0]);
                        }
                        num++;
                        if(num == len){
                            context.commit("railsupport_buses", tempArr);
                        }
                    }
                },function(err){
                    console.log(err);
                });
            }
        },
        guojiangSupport_buses(context,params){  //同上，驳江支援
            let num = 0;
            let tempArr  = [];
            let len = params.length;
            for(let i = 0; i<len; i++){
                httpbase(`${baseUrl}`,'POST' , {"collectionName":'4_1_1_4',"itemId":params[i]}, null, 10000, {"Content-Type":"application/json;charset=UTF-8"}, 'raw')().then(function(res){
                    if(res.status == 200){
                        if(res.data.length){
                            tempArr.push(res.data[0]);
                        }
                        num++;
                        if(num == len){
                            context.commit("guojiangSupport_buses", tempArr);
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
                    // console.log('管理人员上岗计划right--',res.data);
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
                    context.commit('archives_list', res.data[0]);
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

