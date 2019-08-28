import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import test from '../components/test.vue';
// import posAnalysis from '../components//common/thinktank/widgets/passenger-analysis/pos-analysis.vue';
// import exceptionmonitor from '../components/cloud/monitor/widget/exceptionmonitor.vue';
// import locomotiveguarantee from '../components/cloud/monitor/widget/locomotiveguarantee.vue';
// import stationguarantee from '../components/cloud/monitor/widget/stationguarantee.vue';
import emergency from '../components/cloud/command/emergency.vue';

export default new Router({
	// history: false,
	// hashbang: false,
	routes: [
		{
			name:'emergency',
			path: '/emergency',
			component:emergency
		},
		// {
		// 	name:'station-guarantee',
		// 	path: '/stationguarantee',
		// 	component:stationguarantee
		// },
		// {
		// 	name:'locomotive-guarantee',
		// 	path: '/locomotiveguarantee',
		// 	component:locomotiveguarantee
		// },
		// {
		// 	name:'exceptionmonitor',
		// 	path: '/exceptionmonitor',
		// 	component:exceptionmonitor
		// },
		// {
		// 	name:'posAnalysis',
		// 	path: '/posAnalysis',
		// 	component:posAnalysis
		// },
		{	
			name:'test',
			path: '/test',
			component:test
		},
		{
			path: '/',
			redirect:'/test'
		}
	],
});