import axios from 'axios'
let AUTH_TOKEN = 'd7d8831f0d51883cd72cb0181e66ddcb'

const SERVER_URL = 'http://zh.84000.com.cn:27888/bimp-base-bigData/'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const ajax = function (SERVICEID) {
    return axios({
        method: 'get',
        url: SERVER_URL,
        params: {
            APPID: 1,
            APPKEY: 1,
            SERVICEID,
            TOKEN: AUTH_TOKEN
        },
        timeout: 10000,
    })
}

function ajaxbase(SERVICEID, AUTH_TOKEN, url = '', method = 'GET') {
    return async function () {
        try {
            let data = await axios({
                method,
                url: SERVER_URL,
                params: {
                    APPID: 1,
                    APPKEY: 1,
                    SERVICEID,
                    TOKEN: AUTH_TOKEN
                },
                timeout: 10000,
            })
            return data
        } catch (error) {
            console.error(error)
        }
    }
}

function httpbase(url, method = 'POST', pdata, ecb = null, timeout = 10000, headers={}, param='encode') {
    let params
    if (method == 'POST') {
        if (param == 'encode') {
            params = new URLSearchParams()
            for (let obj in pdata) {
                params.append(obj, pdata[obj])
            }
        } else {
            params = pdata
        }
    } else {
        params = pdata
    }
    return async function () {
        if (method == 'POST') {
            try {
                let data = await axios({
                    method: 'POST',
                    url,
                    data: params,
                    timeout,
                    headers
                })
                return data
            } catch (error) {
                if (ecb) {
                    console.log(ecb)

                    ecb()
                }
                console.error(error)
            }
        } else {
            try {
                let data = await axios({
                    method: 'GET',
                    url,
                    params,
                    timeout,
                    headers
                })
                return data
            } catch (error) {
                if (ecb) {
                    ecb()
                }
                console.error(error)
            }
        }
    }
}

const ajaximg = async function (imgid) {
    imgid = 'image' + imgid
    try {
        let data = await axios({
            method: 'GET',
            url: SERVER_URL,
            params: {
                APPID: 1,
                APPKEY: 1,
                SERVICEID: imgid,
                TOKEN: AUTH_TOKEN
            },
            timeout: 10000,
        })
        return data
    } catch (error) {
        console.error(error)
    }
}

const getLine = httpbase(SERVER_URL + 'requestData.do', 'POST', {
    keyName: 'getLineNetwork',
    modularName: 'BigScreen'
})

const getBus = httpbase(SERVER_URL + 'requestData.do', 'POST', {
    keyName: 'transportIntensitylRModular',
    modularName: 'BigScreen'
})

const getStations = httpbase(SERVER_URL + 'requestData.do', 'POST', {
    keyName: 'siteInstallationSurvey',
    modularName: 'BigScreen'
})

const getLineInfo = (extra) => httpbase(SERVER_URL + 'realTimeData.do', 'GET', {
    rule: 'LineNetworkClickRule',
    param: {
        "lineName": extra
    }
})

const getManagerinfo = (type, ecb, timeout) => httpbase(SERVER_URL + 'requestData.do', 'POST', {
    keyName: type,
    modularName: "BigScreen"
}, ecb, timeout)

const getPerson = httpbase(SERVER_URL + 'requestData.do', 'POST', {
    keyName: 'fieldManagelRModular',
    modularName: 'BigScreen'
})

const getFeedbackImage = (targetId) => httpbase(SERVER_URL + 'anomalyFeedbackImage.do', 'GET', {
    targetId,
})

const getStation = httpbase(SERVER_URL + 'requestData.do', 'POST', {
    keyName: 'stopInfoData',
    modularName: 'BigScreen'
})

// 站点通数据
const getStopVideo = httpbase(SERVER_URL + 'requestData.do', 'GET', {
    keyName: 'StopVideo',
    modularName: 'BigScreen'
})

// 停车场站点（移动视频）
const getParkStopVideo = httpbase(
    // 'http://106.14.18.70:8007/RealVedio/mobilevlist', 
    'http://106.14.18.70:8001/RealVedio/mobilevlist', 
    'GET',
    null,
    null,
    10000, 
    {
    Authorization: "Basic YnNqdGF1dGg6M2VkY1ZGUiQ=",
    cacheControl: "no-cache",
    }
    /* {
    'Authorization': "Basic YnNqdGF1dGg6M2VkY1ZGUiQ=",
    'cache-control': "no-cache",
    } */
)

const getStationPredict = (stationcode) => httpbase(SERVER_URL + 'realTimeData.do', 'GET', {
    rule: 'GetStationPredictionRule',
    param: {
        stationcode
    }
})

// 进博会 营运异常
const getExceptions = httpbase(SERVER_URL + 'requestData.do', 'POST', {
    keyName: 'getImportExpoVehStop',
    modularName: 'BigScreen'
})

// 进博会 大间隔
const getJams = httpbase(SERVER_URL + 'requestData.do', 'POST', {
    keyName: 'getImportExpoLargeInterval',
    modularName: 'BigScreen'
})

// 进博会 常规线路
const getNormalLines = httpbase(SERVER_URL + 'requestData.do', 'POST', {
    keyName: 'getImportExpoAreaLines',
    modularName: 'BigScreen'
})

// 进博会 会展接驳线
const getLinkways = httpbase(SERVER_URL + 'requestData.do', 'POST', {
    keyName: 'getImportExpoTransLines',
    modularName: 'BigScreen'
})

// 进博会 轨交应急线
const getEmergency = httpbase(SERVER_URL + 'requestData.do', 'POST', {
    keyName: 'getImportExpoEmergencyLines',
    modularName: 'BigScreen'
})

// 进博会 储备接驳线
const getStoreline = httpbase(SERVER_URL + 'requestData.do', 'POST', {
    keyName: 'getImportExpoReserveLines',
    modularName: 'BigScreen'
})

// 进博会 停车场接驳线
const getParkline = httpbase(SERVER_URL + 'requestData.do', 'POST', {
    keyName: 'getImportExpoStopLines',
    modularName: 'BigScreen'
})

// 线路运力信息
const getLineTransport = (extra) => httpbase(SERVER_URL + 'realTimeData.do', 'GET', {
    rule: 'LineTransportData',
    param: {
        "linename": extra
    }
})

// 进博会 人员
const getPersonsdata = httpbase(SERVER_URL + 'requestData.do', 'GET', {
    keyName: 'getExpoFieldManageInfo',
    modularName: 'BigScreen'
})

// 进博会 应急车
const getEmercyBus = httpbase(SERVER_URL + 'requestData.do', 'GET', {
    keyName: 'getImportExpoReserveVeh',
    modularName: 'BigScreen'
})

// 进博会 路救车
const getRescueBus = httpbase(SERVER_URL + 'requestData.do', 'GET', {
    keyName: 'getExpoRescueBillInfo',
    modularName: 'BigScreen'
})

// 进博会 站点
const getExpositionStations = httpbase(SERVER_URL + 'requestData.do', 'GET', {
    keyName: 'getImportExpoAreaStations',
    modularName: 'BigScreen'
})

// 常规线路所属车辆
const getBusofLine = (line) => httpbase(SERVER_URL + 'realTimeData.do', 'GET', {
    rule: 'LineVehicleData',
    param: {
        "linename": line
    }
})

// 进博会 线路所属车辆(包含65条常规线)
const getBusfromLine = (line) => httpbase(SERVER_URL + 'realTimeData.do', 'GET', {
    rule: 'ExpoVehLocaltionData',
    param: {
        "lineName": line
    }
})

// 进博会 停车场所属车辆
const getBusfromPark = (park) => httpbase(SERVER_URL + 'realTimeData.do', 'GET', {
    rule: 'ParkingVehLocaltionData',
    param: {
        "parkingName": park
    }
})

// 进博会 客流
const getPassengers = httpbase(SERVER_URL + 'requestData.do', 'GET', {
    keyName: 'getImportExpoShiftFlow',
    modularName: 'BigScreen'
})

// 进博会 营运车数量
const getBusNums = httpbase(SERVER_URL + 'realTimeData.do', 'GET', {
    rule: 'BusRealTimeStatusSummaryRule',
})

// 进博会 停车场
const getParks = httpbase(SERVER_URL + 'realTimeData.do', 'GET', {
    rule: 'BusRealTimeStatusSummaryRule',
})

// 进博会-示意图-停车场坐标接口
const getSchematicParks = httpbase('http://101.89.138.75:8995/static/parking.json', 'GET', null)

// 各公司运力信息
const getCompanysInfo = httpbase(SERVER_URL + 'realTimeData.do', 'GET', {
    rule: 'CompanyPassengerFlowRule',
})

// 新版首页-场站
const getParkingBusInfo = httpbase(SERVER_URL + 'requestData.do', 'GET', {
    keyName: 'transportIntensitylRModular',
    modularName: 'BigScreen'
})

export {
    ajax,
    ajaxbase,
    ajaximg,
    httpbase,
    getLine,
    getBus,
    getStations,
    getLineInfo,
    getManagerinfo,
    getPerson,
    getStation,
    getStationPredict,
    getFeedbackImage,
    getStopVideo,
    getParkStopVideo,
    getExceptions,
    getJams,
    getNormalLines,
    getLinkways,
    getEmergency,
    getStoreline,
    getParkline,
    getLineTransport,
    getPersonsdata,
    getEmercyBus,
    getRescueBus,
    getExpositionStations,
    getBusofLine,
    getPassengers,
    getBusfromLine,
    getBusNums,
    getBusfromPark,
    getParks,
    getSchematicParks,
    getCompanysInfo,
    getParkingBusInfo,
}