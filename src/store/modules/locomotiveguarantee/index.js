import { httpbase } from '../../../utils/ajax.js';
// import { httpbase } from '../../../../../../publicResource/A_Mock/http.js';

let baseUrl = 'http://203.156.246.55:2205/ScreenCenter/getScreenData';

// 状态管理
let locomotiveguarantee = {
	namespaced: true,
	state: {
        jiwu_cheliangzongti:null,
        jiwu_baoxiu_baoyang_liujiao:null,
        sanday:null,
        nengYuanChe_jiankong:null
    },
    getters: {
        jiwu_cheliangzongti(state){
            return state.jiwu_cheliangzongti;
        },
        jiwu_baoxiu_baoyang_liujiao(state){
            return state.jiwu_baoxiu_baoyang_liujiao;
        },
        sanday(state){
            return state.sanday;
        },
        nengYuanChe_jiankong(state){
            return state.nengYuanChe_jiankong;
        },
    },
    mutations: {
        jiwu_cheliangzongti(state,data){
            state.jiwu_cheliangzongti = data;
        },
        jiwu_baoxiu_baoyang_liujiao(state,data){
            state.jiwu_baoxiu_baoyang_liujiao = data;
        },
        sanday(state,data){
            state.sanday = data;
        },
        nengYuanChe_jiankong(state,data){
            state.nengYuanChe_jiankong = data;
        },
	},
	actions: {
        jiwu_cheliangzongti(context,params){  //车辆总体
            httpbase(`${baseUrl}/3_7_1`,'get' , null)().then(function(res){
                if(res.status == 200){
                    context.commit('jiwu_cheliangzongti', res.data[0]);
                }
            },function(err){
                console.log(err);
            });
        },
        jiwu_baoxiu_baoyang_liujiao(context,params){  //维修、保养、留交详细情况
            httpbase(`${baseUrl}/3_7_2`,'get' , null)().then(function(res){
                if(res.status == 200){
                    context.commit('jiwu_baoxiu_baoyang_liujiao', res.data[0]);
                }
            },function(err){
                console.log(err);
            });
        },
        sanday(context,params){  //三天一覆盖执行情况
            httpbase(`${baseUrl}/3_7_3`,'get' , null)().then(function(res){
                if(res.status == 200){
                    context.commit('sanday', res.data[0]);
                }
            },function(err){
                console.log(err);
            });
        },
        nengYuanChe_jiankong(context,params){  //新能源车远程监控情况
            httpbase(`${baseUrl}/3_7_4`,'get' , null)().then(function(res){
                if(res.status == 200){
                    context.commit('nengYuanChe_jiankong', res.data[0]);
                }
            },function(err){
                console.log(err);
            });
        },
	}
}

export default locomotiveguarantee;

