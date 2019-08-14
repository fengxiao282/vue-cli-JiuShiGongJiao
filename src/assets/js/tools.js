import Vue from 'vue'
import axios from 'axios';
var qs = require('qs');
//拼接网址
function $url(Incomplete) {
	// var baseUrl = 'http://192.168.1.4:4001/POMSystem/';
	var baseUrl = '/api/';
	var url = baseUrl + Incomplete;
	return url;
}

axios.defaults.timeout = 10000;//全局超时配置

//获取Token
function getToken(){
	// 如果没有过期直接返回token
	var tokenObject = JSON.parse(sessionStorage.getItem('tokenObject'));
	var expiresDate = tokenObject.expiresDate;
	if (expiresDate - 600000 >= Date.now()) { //提前10分钟刷新token
		return tokenObject.access_token;
	} else {
		//过期重新获取token
		var name = tokenObject.name;
		var pwd = tokenObject.pwd;
		loginReg('post','http://192.168.1.4:5000/Account/GetToken',{'username':name,'password':pwd}).then(function(val){
			var tokenObject = val.data;
			tokenObject.expiresDate = tokenObject.expires_in * 1000 + Date.now();
			tokenObject.name = name;
			tokenObject.pwd = pwd;
			sessionStorage.setItem('tokenObject', JSON.stringify(tokenObject));
			return tokenObject.access_token;
		}, function(err) {
			console.log(err);
		});
	}
}

//post请求数据
function post(method,url,data){
	return axios({
		headers:{
			// 'Authorization':'Bearer '+getToken(),
			'Content-Type': 'application/json;charset=UTF-8'
		},
		method: method,
		url:$url(url),
		data:data,
	}).then(function(response) {
		return response;
	}).catch(function(error) {
		console.log(error);
	});
}

//get请求数据
function get(method,url,data){
  return axios({
    // headers:{'Authorization':'Bearer '+getToken()},
    method:method,
    url:$url(url),
    // params:data
    data:data
  }).then(function (response) {
    return response;
  }).catch(function (error){
    console.log(error);
  });
}

//getById请求数据
function getById(method,url,id){
  return axios({
    // headers:{'Authorization':'Bearer '+getToken()},
    method:method,
    url:$url(url)+'/'+id,
  }).then(function (response) {
    return response;
  }).catch(function (error){
    console.log(error);
  });
}

function loginReg(method,url,data){ //请求数据方法
	return axios({
	  headers:{
		'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
	  },
	  method:method,
	  url:url,
	  data:qs.stringify(data),
	}).then(function (response) {
	  return response;
	}).catch(function (error){
	  console.log(error);
	});
}

var $ajax={
	get,
	post,
	getById,
	loginReg
};


//请求拦截器(发送请求之前)
axios.interceptors.request.use(function(config){
	// Vue.$vux.loading.show({text:'Loading'});	//开启loading图标
	return config;
},function(error){
	return Promise.reject(error);
});

//响应拦截器(响应数据)
axios.interceptors.response.use(function(response){
	// Vue.$vux.loading.hide(); 	//关闭loading图标
	return response;
},function(error){
	Vue.$vux.loading.hide();	//关闭loading图标
	return Promise.reject(error);
});


export { $ajax };