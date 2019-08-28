// start_stations
let start_stations = [
  {
    "name":"上海火车站",
    "lnglat":['经度','纬度'],
    "busNum":"4"
  },
  {
    "name":"宜山路站",
    "lnglat":['经度','纬度'],
    "busNum":"3"
  },
  {
    "name":"江月路站",
    "lnglat":['经度','纬度'],
    "busNum":"2"
  }
];

// start_offices
let start_offices = [
  {
    "name":"一公司二车队",
    "lnglat":['经度','纬度'],
  },
  {
    "name":"二公司二车队",
    "lnglat":['经度','纬度'],
  },
  {
    "name":"三公司二车队",
    "lnglat":['经度','纬度'],
  }
];

// start_buses
let start_buses = [
  {
    "vno":"S1L-031G",
    "station":"上海火车站",
    "line":"01路",
    "company":"一公司"
  },
  {
    "vno":"S1L-032G",
    "station":"上海火车站",
    "line":"01路",
    "company":"一公司"
  },
  {
    "vno":"S1L-033G",
    "station":"上海火车站",
    "line":"01路",
    "company":"一公司"
  },
  {
    "vno":"S1L-034G",
    "station":"上海火车站",
    "line":"02路",
    "company":"一公司"
  },
  {
    "vno":"S2L-035G",
    "station":"宜山路站",
    "line":"03路",
    "company":"二公司"
  },
  {
    "vno":"S2L-036G",
    "station":"宜山路站",
    "line":"03路",
    "company":"二公司"
  },
  {
    "vno":"S2L-037G",
    "station":"宜山路站",
    "line":"04路",
    "company":"二公司"
  },
  {
    "vno":"S3L-038G",
    "vno":"S3L-038G",
    "station":"江月路站",
    "line":"05路",
    "company":"三公司"
  },
  {
    "vno":"S3L-039G",
    "station":"江月路站",
    "line":"06路",
    "company":"三公司"
  }
];

// ***********************************************************************

// end_stations
let end_stations = [
  {
    "name":"鲁班路站",
    "lnglat":['经度','纬度'],
    "busNum":"3"
  },
  {
    "name":"成山路站",
    "lnglat":['经度','纬度'],
    "busNum":"3"
  },
  {
    "name":"沈杜公路",
    "lnglat":['经度','纬度'],
    "busNum":"2"
  }
];

// end_offices
let end_offices = [
  {
    "name":"三公司一车队",
    "lnglat":['经度','纬度'],
  },
  {
    "name":"五公司一车队",
    "lnglat":['经度','纬度'],
  }
];

// end_buses
let end_buses = [
  {
    "vno":"L1L-100S",
    "station":"鲁班路站",
    "line":"01路",
    "company":"三公司"
  },
  {
    "vno":"L1L-101S",
    "station":"鲁班路站",
    "line":"01路",
    "company":"三公司"
  },
  {
    "vno":"L1L-102S",
    "station":"鲁班路站",
    "line":"01路",
    "company":"三公司"
  },
  {
    "vno":"L2L-103S",
    "station":"成山路站",
    "line":"03路",
    "company":"五公司"
  },
  {
    "vno":"L2L-104S",
    "station":"成山路站",
    "line":"03路",
    "company":"五公司"
  },
  {
    "vno":"L2L-105S",
    "station":"成山路站",
    "line":"04路",
    "company":"五公司"
  },
  {
    "vno":"L3L-106S",
    "station":"沈杜公路",
    "line":"06",
    "company":"三公司"
  },
  {
    "vno":"L3L-107S",
    "station":"沈杜公路",
    "line":"07",
    "company":"三公司"
  }
];

// ***********************************************************************

let analog_data = {
	"uid":"123456",
	"itemName":"轨交1号线应急支援",
	"line":"1号线人民广场",
	"createTime":"07.20 08:00",
	"beginStation":"人民广场",
	"beginPoint":"121.32321,32.325678",
	"beginRange":"3",
	"endStation":"上海过车站",
	"endPoint":"121.32301,32.325631",
  "endRange":"2",
  // "lineCode":'0802', //加线路编号
  // "endTime":"-",  //加结束时间
	//起点信息
	"begin":{
    "companyNum":"3",
    "officeNum":"2",
    "stationNum":"3",
    "lineNum":"6",
    "busNum":"15",
    "stations":start_stations,
    "offices":start_offices,
    "buses":start_buses
  },
  //终点信息
  "end":{
    "companyNum":"3",
    "officeNum":"2",
    "stationNum":"3",
    "lineNum":"6",
    "busNum":"15",
    "stations":end_stations,
    "offices":end_offices,
    "buses":end_buses
  }
}

export { analog_data };