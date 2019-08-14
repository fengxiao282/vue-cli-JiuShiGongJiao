// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex';
import Store from './store/Store.js';
// import 'font-awesome/css/font-awesome.css';
import "leaflet/dist/leaflet.css";
import L from "leaflet";//全局引用

Vue.prototype.bus = new Vue;

//mock.js
// import './assets/js/MockIntence.js';

//axios
// import axios from 'axios';	//开发调节 临时 使用
// Vue.prototype.$http = axios;
// import { $ajax} from './assets/js/tools.js';
// Vue.prototype.$ajax = $ajax;

//vuex状态管理
Vue.use(Vuex);
var store = new Vuex.Store(Store);

// vux
// import {
// 	XHeader,
// 	Drawer,
// 	Tabbar,
// 	TabbarItem,
// 	Group,
// 	Cell,
// 	XButton,
// 	ButtonTab,
// 	ButtonTabItem,
// 	PopupHeader,
// 	Popup,
// 	XSwitch,
// 	Radio,
// 	Datetime,
// 	Search,
// 	ToastPlugin,
// 	LoadingPlugin,
// } from 'vux'
// Vue.component('x-header', XHeader)
// Vue.component('drawer', Drawer)
// Vue.component('tabbar', Tabbar)
// Vue.component('tabbarItem', TabbarItem)
// Vue.component('group', Group)
// Vue.component('cell', Cell)
// Vue.component('x-button', XButton)
// Vue.component('button-tab', ButtonTab)
// Vue.component('button-tab-item', ButtonTabItem)
// Vue.component('popup-header', PopupHeader)
// Vue.component('popup', Popup)
// Vue.component('x-switch', XSwitch)
// Vue.component('radio', Radio)
// Vue.component('datetime', Datetime)
// Vue.component('search', Search)

// Vue.use(ToastPlugin)
// Vue.use(LoadingPlugin)

// 无限滚动
import infiniteScroll from 'vue-infinite-scroll';
Vue.use(infiniteScroll);

// import MugenScroll from 'vue-mugen-scroll';
// Vue.component('MugenScroll', MugenScroll)



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
})