import * as d3 from 'd3'
import axios from 'axios'
const baseUrl = 'http://203.156.246.55:2205/ScreenCenter/getScreenData/';
export default {
	namespaced: true,
	state: {
		plansId: [],

		lines: [],
		normalLineIndex: null,
		emergencyLineIndex: null,

		lineBuses: {},
		lineBusesShow: false,
		isEmergencyLine: false,
		lineBusIndex: null,

		emergencyBuses: [],
		busSelect: null,

		//选择列表
		selectListShow: [{isShow: false},{isShow: false}],
	},
	getters: {
		normalLines: function(state){
			let data = state.lines.map((lineitem,a) => lineitem.lineNormal.map(item => {
				item.itemId = lineitem.itemId;
				return item
			}));

			let arr = [];
			for(let i = 0, len = data.length; i<len; i++){
				arr = arr.concat(data[i])
			}
			return arr
		},
		emergencyLines: function(state){
			let data = state.lines.map((lineitem,a) => lineitem.lineEmergency.map(item => {
				item.itemId = lineitem.itemId;
				return item
			}))

			let arr = [];
			for(let i = 0, len = data.length; i<len; i++){
				arr = arr.concat(data[i])
			}
			return arr
		},
		emergencyBusesGetters: function(state){
			if(state.emergencyBuses.length === 0){
				return {
					groupData: {allBusNum: 0, workBusNum: 0, busList: []},
					oneData: {allBusNum: 0, workBusNum: 0, busList: []},
					twoData: {allBusNum: 0, workBusNum: 0, busList: []},
					threeData: {allBusNum: 0, workBusNum: 0, busList: []},
					fourData: {allBusNum: 0, workBusNum: 0, busList: []},
					fiveData: {allBusNum: 0, workBusNum: 0, busList: []},
				}
			}
			let group = state.emergencyBuses.map(item => item.list.filter(item => item.company === '集团全部')[0]||{allBusNum: 0, workBusNum: 0, busList: []});
			let one = state.emergencyBuses.map(item => item.list.filter(item => item.company === '巴士一公司')[0]||{allBusNum: 0, workBusNum: 0, busList: []});
			let two = state.emergencyBuses.map(item => item.list.filter(item => item.company === '巴士二公司')[0]||{allBusNum: 0, workBusNum: 0, busList: []});
			let three = state.emergencyBuses.map(item => item.list.filter(item => item.company === '巴士三公司')[0]||{allBusNum: 0, workBusNum: 0, busList: []});
			let four = state.emergencyBuses.map(item => item.list.filter(item => item.company === '巴士四公司')[0]||{allBusNum: 0, workBusNum: 0, busList: []});
			let five = state.emergencyBuses.map(item => item.list.filter(item => item.company === '巴士五公司')[0]||{allBusNum: 0, workBusNum: 0, busList: []});

			let groupData = {allBusNum: 0, workBusNum: 0, busList: []};
			group.forEach(item => {
				groupData.allBusNum = groupData.allBusNum+parseInt(item.allBusNum);
				groupData.workBusNum = groupData.workBusNum+parseInt(item.workBusNum);
				groupData.busList = groupData.busList.concat(item.busList);
			})
			let oneData = {allBusNum: 0, workBusNum: 0, busList: []};
			one.forEach(item => {
				oneData.allBusNum = oneData.allBusNum+parseInt(item.allBusNum);
				oneData.workBusNum = oneData.workBusNum+parseInt(item.workBusNum);
				oneData.busList = oneData.busList.concat(item.busList);
			})
			let twoData = {allBusNum: 0, workBusNum: 0, busList: []};
			two.forEach(item => {
				twoData.allBusNum = twoData.allBusNum+parseInt(item.allBusNum);
				twoData.workBusNum = twoData.workBusNum+parseInt(item.workBusNum);
				twoData.busList = twoData.busList.concat(item.busList);
			})
			let threeData = {allBusNum: 0, workBusNum: 0, busList: []};
			three.forEach(item => {
				threeData.allBusNum = threeData.allBusNum+parseInt(item.allBusNum);
				threeData.workBusNum = threeData.workBusNum+parseInt(item.workBusNum);
				threeData.busList = threeData.busList.concat(item.busList);
			})
			let fourData = {allBusNum: 0, workBusNum: 0, busList: []};
			four.forEach(item => {
				fourData.allBusNum = fourData.allBusNum+parseInt(item.allBusNum);
				fourData.workBusNum = fourData.workBusNum+parseInt(item.workBusNum);
				fourData.busList = fourData.busList.concat(item.busList);
			})
			let fiveData = {allBusNum: 0, workBusNum: 0, busList: []};
			five.forEach(item => {
				fiveData.allBusNum = fiveData.allBusNum+parseInt(item.allBusNum);
				fiveData.workBusNum = fiveData.workBusNum+parseInt(item.workBusNum);
				fiveData.busList = fiveData.busList.concat(item.busList);
			})
			return {
				groupData: groupData,
				oneData: oneData,
				twoData: twoData,
				threeData: threeData,
				fourData: fourData,
				fiveData: fiveData,
			}
		}
	},
	mutations: {
		resetPlansId(state, payload){
			state.plansId = payload.plansId;
		},
		resetLines(state, payload){
			state.lines.push(payload.planLine);
			state.lines = state.lines;
		},
		clearLines(state){
			state.lines = [];
		},
		resetNormalLineIndex(state,payload){
			state.normalLineIndex = payload.index;
		},
		resetEmergencyLineIndex(state,payload){
			state.emergencyLineIndex = payload.index;
		},
		resetLineBuses(state, payload){
			state.lineBuses = payload.lineBuses;
		},
		resetIsEmergencyLine(state,payload){
			state.isEmergencyLine = payload.isEmergencyLine;
		},
		resetLineBusIndex(state,payload){
			state.lineBusIndex = payload.index;
		},
		resetLineBusShow(state,payload){
			if(payload.type === 'hide'){
				state.lineBusesShow = false;
			}else if(payload.type === 'show'){
				state.lineBusesShow = true;
			}
		},
		resetEmergencyBuses(state,payload){
			state.emergencyBuses.push(payload.emergencyBuses);
			state.emergencyBuses = state.emergencyBuses;
		},
		clearEmergencyBuses(state){
			state.emergencyBuses = [];
		},
		resetBusSelect(state,payload){
			state.busSelect = payload.busSelect;
		},

		//选择列表
		toggleList(state,payload){
			state.selectListShow = state.selectListShow.map((item,i) => {
				if(i === payload.index){
					if(item.isShow){
						item.isShow = false
					}else{
						item.isShow = true;
					}
				}else{
					item.isShow = false;
				}

				return item
			})
		},
	},
	actions: {
		loopGetLines({state,commit,dispatch},itemIdList){
			// let itemIds = ['5CC192AD72F15C87E0531F2C220A8699','6D18073C8A823EDFE0531F2C220AEC4B'];
			commit({type: 'clearLines'});
			commit({type: 'resetNormalLineIndex', index: null});
			commit({type: 'resetEmergencyLineIndex', index: null});
			commit({type: 'resetLineBuses', lineBuses: []});
			commit({type: 'resetLineBusIndex', index: null});

			for(let i = 0, len = itemIdList.length; i<len; i++){
				dispatch('getLines',itemIdList[i])
			}
		},
		loopGetBuses({state,commit,dispatch},itemIdList){
			// let itemIds = ['5CC192AD72F15C87E0531F2C220A8699','6D18073C8A823EDFE0531F2C220AEC4B'];
			commit({type: 'clearEmergencyBuses'});
			commit({type: 'resetEmergencyLineIndex', index: null});

			for(let i = 0, len = itemIdList.length; i<len; i++){
				dispatch('getEmergencyBuses',itemIdList[i])
			}
		},
		getLines({state,commit},itemId){
			axios({
				method: 'post',
				url: `${baseUrl}`,
				headers: {
					'Content-Type': 'application/json',
				},
				data: {
					collectionName: '4_1_1_2',
					itemId: itemId
				}
			})
			.then(res => {
				let data = res.data;
				if(data.length === 0){
					console.log('getLines no data');
				}else{
					let a = data[0];
					commit({
						type: 'resetLines',
						planLine: a,
					});
				}
			})
			.catch(err => console.log('getLines error'))
		},
		getLineBuses({state,commit},{itemId,line}){
			axios({
				method: 'post',
				url: `${baseUrl}`,
				headers: {
					'Content-Type': 'application/json',
				},
				data: {
					collectionName: '4_1_1_3',
					itemId: itemId,
					line: line
				}
			})
			.then(res => {
				let data = res.data;
				if(data.length === 0){
					console.log('getLineBuses no data');
				}else{
					let a = data[0];
					commit({
						type: 'resetLineBuses',
						lineBuses: a,
					})
				}
			})
			.catch(err => console.log('getLineBuses error'))
		},
		getEmergencyBuses({state,commit},itemId){
			axios({
				method: 'post',
				url: `${baseUrl}`,
				headers: {
					'Content-Type': 'application/json',
				},
				data: {
					collectionName: '4_1_1_4',
					itemId: itemId,
				}
			})
			.then(res => {
				let data = res.data;
				if(data.length === 0){
					console.log('getEmergencyBuses no data');
				}else{
					let a = data[0];
					commit({
						type: 'resetEmergencyBuses',
						emergencyBuses: a,
					})
				}
			})
			.catch(err => console.log('getEmergencyBuses error'))
		}
	}
}