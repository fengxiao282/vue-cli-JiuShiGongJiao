import { httpbase } from '../../../utils/ajax.js';
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
        manager_left:[],
        manager_right:[],
        selectedRailsupport:[], //选中项
        selectedMajorevents:[],
        selectedGuojiangSupport:[],
        selectedEmergencyevents:[],
        selectedActive:[],
        archives_list:[],
        archives_detaile:{},
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
        manager_left(state){
            return state.manager_left;
        },
        manager_right(state){
            // return state.manager_right;
            return [
                {
                    "company":"一公司",		
                    "name":"姓名1",				
                    "job":"上下客点位置",
                    "office":"职位1",
                    "radioCode":"001",
                    "itemName":"轨交1号线应急支援"
                },
                {
                    "company":"一公司",		
                    "name":"姓名2",				
                    "job":"上下客点位置",
                    "office":"职位2",
                    "radioCode":"002",
                    "itemName":"轨交1号线应急支援"
                },
                {
                    "company":"一公司",		
                    "name":"姓名3",				
                    "job":"上下客点位置",
                    "office":"职位3",
                    "radioCode":"003",
                    "itemName":"轨交1号线应急支援"
                },
                {
                    "company":"二公司",		
                    "name":"姓名4",				
                    "job":"上下客点位置",
                    "office":"职位4",
                    "radioCode":"004",
                    "itemName":"轨交2号线应急支援"
                },
                {
                    "company":"二公司",
                    "name":"姓名5",				
                    "job":"上下客点位置",
                    "office":"职位5",
                    "radioCode":"005",
                    "itemName":"轨交2号线应急支援"
                },
                {
                    "company":"二公司",		
                    "name":"姓名6",				
                    "job":"上下客点位置",
                    "office":"职位6",
                    "radioCode":"006",
                    "itemName":"轨交2号线应急支援"
                },
                {
                    "company":"二公司",		
                    "name":"姓名7",				
                    "job":"上下客点位置",
                    "office":"职位7",
                    "radioCode":"007",
                    "itemName":"轨交2号线应急支援"
                },
                {
                    "company":"二公司",		
                    "name":"姓名8",				
                    "job":"上下客点位置",
                    "office":"职位8",
                    "radioCode":"008",
                    "itemName":"轨交2号线应急支援"
                },
            ]
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

