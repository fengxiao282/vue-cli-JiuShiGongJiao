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
        manager_left:null,
        selectedRailsupport:[], //选中项
        selectedMajorevents:[],
        selectedGuojiangSupport:[],
        selectedEmergencyevents:[],
        selectedActive:[],
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
        }
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
	}
}

export default emergencyPlan;

