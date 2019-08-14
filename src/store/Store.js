import state from './state.js';
import mutations from './mutations.js';
import getters from './getters.js';
import actions from './actions.js';

// 云智慧 - 客流密度分析
import densityAnalysisPOS from './modules/densityAnalysisPOS/index.js';
// 云监控 - 异常监控
import exceptionmonitor from './modules/exceptionmonitor/index.js';
// 云监控 - 机务保障
import locomotiveguarantee from './modules/locomotiveguarantee/index.js';
// 云指挥 - 应急支援
import emergencyPlan from './modules/emergencyPlan/index.js';
// 云监控 - 场站保障
import stationguarantee from './modules/stationguarantee/index.js';

var Store={
	state,
    mutations,
    getters,
    actions,
	modules: {
		densityAnalysisPOS,
		exceptionmonitor,
		locomotiveguarantee,
		emergencyPlan,
		stationguarantee,
	},
	strict:true
};

export default Store;

/**
 * 	在自己写的组件中,通过 $store.dispatch 触发 action.js
 *
 * 	在自己写的组件中通过 $store.commit("event-name","arguments") 执行commit(触发mutation.js),改变 state.js
 * 	action.js组件内通过 context.commit("event-name","arguments") 执行commit(触发mutation.js),改变 state.js
 * 	(异步操作放在action.js中)
 *
 * 	在自己写的组件中,通过 $store.getters.selectedIndex 调用 getters.js 获取 state.js 中的 selectedIndex
 * 	
 *  或者,在自己写的组件中,直接通过 $store.state.selectedIndex 获取 state.js 中的 selectedIndex
 * 	
 */