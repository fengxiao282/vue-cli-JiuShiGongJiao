import {httpbase} from './ajax'

const no3BaseUrl = 'http://203.156.246.55:2205/ScreenCenter/getScreenData'

// 云全景-首页-三级管理概要
const getSummaryInfo = httpbase(no3BaseUrl, 'POST', {
    'collectionName': '1_2',
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')
// 云全景-人员
const getPersons = httpbase(no3BaseUrl, 'POST', {
    'collectionName': '2_2',
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')
// 云全景-人员-调度员
const getDispatcher = httpbase(no3BaseUrl, 'POST', {
    'collectionName': '3_2_6',
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')

// 云监控 - 营运全过程
// 云监控-营运全过程-7:30汇报 3.3.1
// 3.3.1.1公司内容
const get730companys = httpbase(no3BaseUrl, 'POST', {
    'collectionName': '3_3_1_1',
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')
// 3.3.1.2车队内容
const get730fleets = (companyCode) => httpbase(no3BaseUrl, 'POST', {
    'collectionName': '3_3_1_2',
    companyCode,
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')
// 3.3.1.3线路内容
const get730lines = (companyCode, branchCode) => httpbase(no3BaseUrl, 'POST', {
    'collectionName': '3_3_1_3',
    companyCode,
    branchCode,
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')

// 云监控-营运全过程-9:30和19:30汇报 3.3.2
// 3.3.2.1 公司内容
const get919companys = (clock) => httpbase(no3BaseUrl, 'POST', {
    'collectionName': '3_3_2_1_' + clock,
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')
// 3.3.2.2 车队内容
const get919fleets = (clock, companyCode) => httpbase(no3BaseUrl, 'POST', {
    'collectionName': '3_3_2_2_' + clock,
    companyCode,
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')
// 3.3.2.3 线路内容
const get919lines = (clock, companyCode, branchCode) => httpbase(no3BaseUrl, 'POST', {
    'collectionName': '3_3_2_3_' + clock,
    companyCode,
    branchCode,
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')

// 云监控-营运全过程-11:30、21:30 3.3.3
// 3.3.3.1公司内容
const get112122companys = (clock) => httpbase(no3BaseUrl, 'POST', {
    'collectionName': '3_3_3_1_' + clock,
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')
// 3.3.3.2车队内容
const get112122fleets = (clock, companyCode) => httpbase(no3BaseUrl, 'POST', {
    'collectionName': '3_3_3_2_' + clock,
    companyCode,
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')
// 3.3.3.3线路内容
const get112122lines = (clock, companyCode, branchCode) => httpbase(no3BaseUrl, 'POST', {
    'collectionName': '3_3_3_3_'+ clock,
    companyCode,
    branchCode,
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')

// 云监控-营运全过程-13:30汇报 3.3.4
// 3.3.4.1公司内容
const get1330companys = httpbase(no3BaseUrl, 'POST', {
    'collectionName': '3_3_4_1',
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')
// 3.3.4.2车队内容
const get1330fleets = (companyCode) => httpbase(no3BaseUrl, 'POST', {
    'collectionName': '3_3_4_2',
    companyCode,
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')
// 3.3.4.3线路内容
const get1330lines = (companyCode, branchCode) => httpbase(no3BaseUrl, 'POST', {
    'collectionName': '3_3_4_3',
    companyCode,
    branchCode,
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')

// 云监控-营运全过程-15:30汇报 3.3.5
// 3.3.5.1公司内容
const get1530companys = httpbase(no3BaseUrl, 'POST', {
    'collectionName': '3_3_5_1',
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')
// 3.3.5.2车队内容
const get1530fleets = (companyCode) => httpbase(no3BaseUrl, 'POST', {
    'collectionName': '3_3_5_2',
    companyCode,
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')
// 3.3.5.3线路内容
const get1530lines = (companyCode, branchCode) => httpbase(no3BaseUrl, 'POST', {
    'collectionName': '3_3_5_3',
    companyCode,
    branchCode,
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')

// 云监控-营运全过程-17:30汇报 3.3.6
// 3.3.6.1公司内容
const get1730companys = httpbase(no3BaseUrl, 'POST', {
    'collectionName': '3_3_6_1',
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')
// 3.3.6.2车队内容
const get1730fleets = (companyCode) => httpbase(no3BaseUrl, 'POST', {
    'collectionName': '3_3_6_2',
    companyCode,
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')
// 3.3.6.3线路内容
const get1730lines = (companyCode, branchCode) => httpbase(no3BaseUrl, 'POST', {
    'collectionName': '3_3_6_3',
    companyCode,
    branchCode,
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')

// 云监控-营运全过程-22:30汇报 3.3.7
// 3.3.7.1公司内容
const get2230companys = httpbase(no3BaseUrl, 'POST', {
    'collectionName': '3_3_7_1',
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')
// 3.3.7.2车队内容
const get2230fleets = (companyCode) => httpbase(no3BaseUrl, 'POST', {
    'collectionName': '3_3_7_2',
    companyCode,
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')
// 3.3.7.3线路内容
const get2230lines = (companyCode, branchCode) => httpbase(no3BaseUrl, 'POST', {
    'collectionName': '3_3_7_3',
    companyCode,
    branchCode,
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')

// 云监控 - 安全管控 3.5
// 3.5.1客伤警报
const get_customer_alerts = httpbase(no3BaseUrl, 'POST', {
    'collectionName': '3_5_1',
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')
// 3.5.2 DVR监控违规违操情况
const get_report_table = httpbase(no3BaseUrl, 'POST', {
    'collectionName': '3_5_2',
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')

// 云智库 - 数据中心
// 云智库 - 数据中心 - 拓扑图
// 云智库-数据中心-拓扑图-节点机负载 5.2.1
const getNodes = (ecb) => httpbase(no3BaseUrl, 'POST', {
    'collectionName': '5_2_1',
}, ecb, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')

// 云智库-数据中心-拓扑图-云服务器集群虚拟机情况 5.2.2
const getColony = httpbase(no3BaseUrl, 'POST', {
    'collectionName': '5_2_2',
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')

// 云智库-数据中心-拓扑图-运维记录 5.2.3
const getRecords = httpbase(no3BaseUrl, 'POST', {
    'collectionName': '5_2_3',
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')

// 云智库-数据中心-拓扑图-存储开支情况统计 5.2.4
const getStorage = httpbase(no3BaseUrl, 'POST', {
    'collectionName': '5_2_4',
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')

// 云智库-数据中心-拓扑图-机房人员进入记录 5.2.5
const getmonitorEvents = httpbase(no3BaseUrl, 'POST', {
    'collectionName': '5_2_5',
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')

// 云智库 - 数据中心 - 数据交互图
// 云智库-数据中心-数据交互图-接入及共享业务系统 5.2.6
const getSystems = httpbase(no3BaseUrl, 'POST', {
    'collectionName': '5_2_6',
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')

// 云智库-数据中心-数据交互图-数据流量统计 5.2.7
const getSystemRank = httpbase(no3BaseUrl, 'POST', {
    'collectionName': '5_2_7',
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')

// 云智库 - 数据中心 - 蜂窝图
// 云智库-数据中心-蜂窝图-库资源结构图示 5.2.8.1
const getDataBases = httpbase(no3BaseUrl, 'POST', {
    'collectionName': '5_2_8_1',
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')
// 云智库-数据中心-蜂窝图-数据资产统计项目 5.2.8.2
const getDataList = httpbase(no3BaseUrl, 'POST', {
    'collectionName': '5_2_8_2',
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')

// 云智库-乘客密度分析-5.3.3.1 站点客流实时数据
const getRealtimeflow = httpbase(no3BaseUrl, 'POST', {
    'collectionName': '5_3_3_1',
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')

// 云智库-乘客密度分析-5.3.3.2 站点客流分时段数据
const getSegmentflow = httpbase(no3BaseUrl, 'POST', {
    'collectionName': '5_3_3_2',
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')

// 云智库-乘客密度分析-5.3.3.3 上月运送客流
const getpremonthflow = httpbase(no3BaseUrl, 'POST', {
    'collectionName': '5_3_3_3',
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')

// 云智库-乘客密度分析-5.3.3.5 车辆舒适度分时段数据
const getComfortInfo = httpbase(no3BaseUrl, 'POST', {
    'collectionName': '5_3_3_5',
}, null, 10000, {
    'Content-Type': 'application/json;charset=UTF-8',
}, 'raw')

export {
    getSummaryInfo,
    getPersons,
    getDispatcher,
    get2230companys,
    get2230fleets,
    get2230lines,
    get730companys,
    get730fleets,
    get730lines,
    get919companys,
    get919fleets,
    get919lines,
    get1330companys,
    get1330fleets,
    get1330lines,
    get1530companys,
    get1530fleets,
    get1530lines,
    get1730companys,
    get1730fleets,
    get1730lines,
    get112122companys,
    get112122fleets,
    get112122lines,
    get_customer_alerts,
    get_report_table,
    getNodes,
    getColony,
    getRecords,
    getStorage,
    getmonitorEvents,
    getSystems,
    getSystemRank,
    getDataBases,
    getDataList,
    getRealtimeflow,
    getSegmentflow,
    getpremonthflow,
    getComfortInfo,
}