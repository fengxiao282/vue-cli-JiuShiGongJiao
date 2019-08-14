import { httpbase } from '../../../utils/ajax.js';

let baseUrl = 'http://203.156.246.55:2205/ScreenCenter/getScreenData';

// 状态管理
let stationguarantee = {
	namespaced: true,
	state: {
        zaowan_shanggang:null,
        yingyun_jinchu:null,
        weixianWeizhang_jianKong:null,
        huodong_huibao:null,
    },
    getters: {
        zaowan_shanggang(state){
            return state.zaowan_shanggang;
        },
        yingyun_jinchu(state){
            return state.yingyun_jinchu;
        },
        weixianWeizhang_jianKong(state){
            return state.weixianWeizhang_jianKong;
        },
        huodong_huibao(state){
            return state.huodong_huibao;
        },
    },
    mutations: {
        zaowan_shanggang(state,data){
            state.zaowan_shanggang = data;
        },
        yingyun_jinchu(state,data){
            state.yingyun_jinchu = data;
        },
        weixianWeizhang_jianKong(state,data){
            state.weixianWeizhang_jianKong = data;
        },
        huodong_huibao(state,data){
            state.huodong_huibao = data;
        },
	},
	actions: {
        zaowan_shanggang(context,params){  //人员上岗
            httpbase(`${baseUrl}/3_8_1`,'get' , null)().then(function(res){
                if(res.status == 200){
                    context.commit('zaowan_shanggang', res.data[0]);
                }
            },function(err){
                console.log(err);
            });
        },
        yingyun_jinchu(context,params){  //营运车辆进出场情况
            httpbase(`${baseUrl}/3_8_2`,'get' , null)().then(function(res){
                if(res.status == 200){
                    context.commit('yingyun_jinchu', res.data[0]);
                }
            },function(err){
                console.log(err);
            });
        },
        weixianWeizhang_jianKong(context,params){  //设施设备、危险源、违章监控
            httpbase(`${baseUrl}/3_8_3`,'get' , null)().then(function(res){
                if(res.status == 200){
                    context.commit('weixianWeizhang_jianKong', res.data[0]);
                }
            },function(err){
                console.log(err);
            });
        },
        huodong_huibao(context,params){  //节假日及重大活动情况汇报
            httpbase(`${baseUrl}/3_8_4`,'get' , null)().then(function(res){
                if(res.status == 200){
                    context.commit('huodong_huibao', res.data[0]);
                }
            },function(err){
                console.log(err);
            });
        },
	}
}

export default stationguarantee;

