import { httpbase } from '../../../utils/ajax.js';

let baseUrl = 'http://203.156.246.55:2205/ScreenCenter/getScreenData';

// 状态管理
let exceptionmonitor = {
	namespaced: true,
	state: {
        daJianGe_yiChang:null,
        cheLiang_yiChang:{},
        jinChuChang_yiChang:[],
        xinNengYuan_yiChang:{},
        yiCheYiJian_yiChang:[],
        yichnag_tips:[],
        daZhanDian_keLiu:[],
        map_State:false,  //地图默认状态未加载完成
    },
    getters: {
        daJianGe_yiChang(state){
            return state.daJianGe_yiChang;
        },
        cheLiang_yiChang(state){
            return state.cheLiang_yiChang;
        },
        jinChuChang_yiChang(state){
            return state.jinChuChang_yiChang;
        },
        xinNengYuan_yiChang(state){
            return state.xinNengYuan_yiChang;
        },
        yiCheYiJian_yiChang(state){
            return state.yiCheYiJian_yiChang;
        },
        yichnag_tips(state){
            return state.yichnag_tips;
        },
        daZhanDian_keLiu(state){
            return state.daZhanDian_keLiu;
        },
        map_State(state){
            return state.map_State;
        },
    },
    mutations: {
        daJianGe_yiChang(state,data){
            state.daJianGe_yiChang = data;
        },
        cheLiang_yiChang(state,data){
            state.cheLiang_yiChang = data;
        },
        jinChuChang_yiChang(state,data){
            state.jinChuChang_yiChang = data;
        },
        xinNengYuan_yiChang(state,data){
            state.xinNengYuan_yiChang = data;
        },
        yiCheYiJian_yiChang(state,data){
            state.yiCheYiJian_yiChang = data;
        },
        yichnag_tips(state,data){
            state.yichnag_tips = data;
        },
        daZhanDian_keLiu(state,data){
            state.daZhanDian_keLiu = data;
        },
        map_State(state,data){
            state.map_State = data;
        },
	},
	actions: {
        daJianGe_yiChang(context,params){  //大间隔异常
            httpbase(`${baseUrl}/3_1_1`,'get' , null)().then(function(res){
                if(res.status == 200){
                    context.commit('daJianGe_yiChang', res.data[0]);
                }
            },function(err){
                console.log(err);
            });
        },
        cheLiang_yiChang(context,params){  //车辆异常处理
            httpbase(`${baseUrl}/3_1_2`,'get' , null)().then(function(res){
                if(res.status == 200){
                    context.commit('cheLiang_yiChang', res.data[0]);
                }
            },function(err){
                console.log(err);
            });
        },
        jinChuChang_yiChang(context,params){  //进出场异常
            httpbase(`${baseUrl}/3_1_3`,'get' , null)().then(function(res){
                if(res.status == 200){
                    context.commit('jinChuChang_yiChang', res.data[0].list);
                }
            },function(err){
                console.log(err);
            });
        },
        xinNengYuan_yiChang(context,params){  //新能源异常
            httpbase(`${baseUrl}/3_1_4`,'get' , null)().then(function(res){
                if(res.status == 200){
                    context.commit('xinNengYuan_yiChang', res.data[0]);
                }
            },function(err){
                console.log(err);
            });
        },
        yiCheYiJian_yiChang(context,params){  //一车一检
            httpbase(`${baseUrl}/3_1_5`,'get' , null)().then(function(res){
                if(res.status == 200){
                    context.commit('yiCheYiJian_yiChang', res.data[0].list);
                }
            },function(err){
                console.log(err);
            });
        },
        yichnag_tips(context,params){  //云监控首次打开 - 获取此时间点前 异常提醒 数据
            httpbase(`${baseUrl}/3_1_6`,'get' , null)().then(function(res){
                if(res.status == 200){
                    context.commit('yichnag_tips', res.data);
                }
            },function(err){
                console.log(err);
            });
        },
        daZhanDian_keLiu(context,params){  //大客流站点情况
            httpbase(`${baseUrl}/3_1_8`,'get' , null)().then(function(res){
                if(res.status == 200){
                    context.commit('daZhanDian_keLiu', res.data);
                }
            },function(err){
                console.log(err);
            });
        },
        map_State(context,params){  //存储地图加载状态
            context.commit('map_State', params);
        },
	}
}

export default exceptionmonitor;

