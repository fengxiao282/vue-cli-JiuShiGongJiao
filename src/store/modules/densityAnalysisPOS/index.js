import { httpbase } from '../../../utils/ajax.js';

let baseUrl = 'http://203.156.246.55:2205/ScreenCenter/getScreenData';

// 状态管理
let densityAnalysisPOS = {
	namespaced: true,
	state: {
        zhanDian_all:{},
        zhanDian_zaoGaoFeng:{},
        zhanDian_wanGaoFeng:{},
        xianlu_all:{},
        xianlu_zaoGaoFeng:{},
        xianlu_wanGaoFeng:{},
    },
    getters: {
        zhanDian_all(state){
            return state.zhanDian_all;
        },
        zhanDian_zaoGaoFeng(state){
            return state.zhanDian_zaoGaoFeng;
        },
        zhanDian_wanGaoFeng(state){
            return state.zhanDian_wanGaoFeng;
        },
        xianlu_all(state){
            return state.xianlu_all;
        },
        xianlu_zaoGaoFeng(state){
            return state.xianlu_zaoGaoFeng;
        },
        xianlu_wanGaoFeng(state){
            return state.xianlu_wanGaoFeng;
        },
    },
	mutations: {
        xianlu_all(state,data){
            state.xianlu_all = data;
        },
        xianlu_zaoGaoFeng(state,data){
            state.xianlu_zaoGaoFeng = data;
        },
        xianlu_wanGaoFeng(state,data){
            state.xianlu_wanGaoFeng = data;
        },
        zhanDian_all(state,data){
            state.zhanDian_all = data;
        },
        zhanDian_zaoGaoFeng(state,data){
            state.zhanDian_zaoGaoFeng = data;
        },
        zhanDian_wanGaoFeng(state,data){
            state.zhanDian_wanGaoFeng = data;
        }
	},
	actions: {
        getLineDensityPOS(context,params){  //线路客流排名
            let mutationsType = '';
            let url = '';
            if(params.type == 1){
                mutationsType = 'xianlu_zaoGaoFeng';
                url = '5_3_2_2_1';
            }else if(params.type == 2){
                mutationsType = 'xianlu_wanGaoFeng';
                url = '5_3_2_2_2';
            }else{
                mutationsType = 'xianlu_all';
                url = '5_3_2_2_3';
            }

            httpbase(`${baseUrl}/${url}`,'POST' , params)().then(function(res){
                if(res.status == 200){
                    context.commit(mutationsType, res.data[0]);
                }
            },function(err){
                console.log(err);
            });
        },
        getZhanDianDensityPOS(context,params){  //站点客流排名
            let mutationsType = '';
            let url = '';
            if(params.type == 1){
                mutationsType = 'zhanDian_zaoGaoFeng';
                url = '5_3_2_1_1';
            }else if(params.type == 2){
                mutationsType = 'zhanDian_wanGaoFeng';
                url = '5_3_2_1_2';
            }else{
                mutationsType = 'zhanDian_all';
                url = '5_3_2_1_3';
            }

            httpbase(`${baseUrl}/${url}`,'POST' , params)().then(function(res){
                if(res.status == 200){
                    context.commit(mutationsType, res.data[0]);
                }
            },function(err){
                console.log(err);
            });
        },
	}
}

export default densityAnalysisPOS;

