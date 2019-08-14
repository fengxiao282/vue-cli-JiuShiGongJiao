const tls = {
	addOrDel(arr, param) { // arr 中如果存在 param，则从 arr 中删除 param，否则将 param 添加到 arr 中
		let tempArr = [...new Set(arr)];
		if (tempArr.includes(param)) { //tempArr.includes：进行的绝对比较，注意类型
			return tempArr.filter(function(value, index) {
				return param != value;
			})
		} else {
			tempArr.push(param);
			return tempArr;
		}
	},
	deepCopy1(obj) { //深拷贝（注意不能拷贝属性值中含 function 的对象）
		return JSON.parse(JSON.stringify(obj));
	},
	deepCopy2(obj) { //深拷贝（注意不能拷贝属性值中含 function 的对象）
		let newobj = obj.constructor === Array ? [] : {};
		if (typeof obj !== 'object') {
			return;
		}
		for (let i in obj) {
			newobj[i] = (typeof obj[i] === 'object') ? this.deepCopy2(obj[i]) : obj[i];
		}
		return newobj
	},
	formatDate(type, date) { //日期格式化
		let greenwichTime = new Date() || new Date(date); //格林威治时间。 参数date：时间戳。 Date.now()：返回时间戳(毫秒数)
		let year = greenwichTime.getFullYear();
		let month = greenwichTime.getMonth() + 1;
		let dt = greenwichTime.getDate(); //一个月中的某天（1-31）
		let hours = greenwichTime.getHours();
		let minutes = greenwichTime.getMinutes();
		let seconds = greenwichTime.getSeconds();
		// let localeTime = greenwichTime.toLocaleTimeString();  	//下午8:52:39
		// let locale = greenwichTime.toLocaleString();     		//2019/4/1 下午8:53:38
		// let localeDate = greenwichTime.toLocaleDateString();    //2019/4/1
		// let day = greenwichTime.getDay();	//星期（0-6），0:星期日
		// let timeStamp = greenwichTime.getTime(); //时间戳

		let returnTime = '';
		switch (type) {
			case 'fulltime':
				returnTime = `${year}-${month}-${dt} ${hours}:${minutes}:${seconds}`;
				break;
			case 'date':
				returnTime = `${year}-${month}-${dt}`;
				break;
			case 'time':
				returnTime = `${hours}:${minutes}:${seconds}`;
				break;
			default:
				returnTime = `${year}-${month}-${dt} ${hours}:${minutes}:${seconds}`;
		}
		return returnTime;
	},
	setCookie(c_name, value, expiredays) { //设置cookie
		let exdate = new Date()
		exdate.setDate(exdate.getDate() + expiredays)
		document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
	},
	getCookie(c_name) { //获取cookie
		if (document.cookie.length > 0) {
			let c_start = document.cookie.indexOf(c_name + "=")
			if (c_start != -1) {
				c_start = c_start + c_name.length + 1
				let c_end = document.cookie.indexOf(";", c_start)
				if (c_end == -1) {
					c_end = document.cookie.length;
				}
				return unescape(document.cookie.substring(c_start, c_end))
			}
		}
		return ""
	},
	setStorage(storageName, data) { //数据持久化
		let newName = `${storageName}${this.userId}`;
		localStorage.setItem(newName, JSON.stringify({
			"data": data
		}));
	},
	getStorage(storageName) { //获取持久化数据
		let newName = `${storageName}${this.userId}`;
		let constructorData = localStorage.getItem(newName);
		if (constructorData) {
			return JSON.parse(constructorData).data;
		}
	},
	getQuery() { //获取浏览器URL中查询字符串中的参数
		let sHref = window.location.href;
		let args = sHref.split('?');
		if (args[0] == sHref) {
			return "";
		}
		let arr = args[1].split('&');
		let obj = {};
		for (let i = 0; i < arr.length; i++) {
			let arg = arr[i].split('=');
			obj[arg[0]] = arg[1];
		}
		return obj;
	},
	bubbleSort(arr) { //冒泡排序
		for (var i = 0; i < arr.length - 1; i++) {
			for (var j = 0; j < arr.length - 1 - i; j++) {
				if (arr[j] > arr[j + 1]) {
					/*  设置第三方变量来用于数据交换，且这个变量放在循环的外面性能要好
					var temp = arr[j];
					arr[j] = arr[j+1];
					arr[j+1] = temp;
					*/

					// 利用加法来实现两个数据的交换
					// arr[j] = arr[j] + arr[j+1];
					// arr[j+1] = arr[j] - arr[j+1];
					// arr[j] = arr[j] - arr[j+1];

					// 利用位运算实现两个数据的交换
					arr[j] = arr[j] ^ arr[j + 1];
					arr[j + 1] = arr[j] ^ arr[j + 1];
					arr[j] = arr[j] ^ arr[j + 1];
				}
			};
		};
		return arr;
	},
	selectionSort(arr){  //选择排序
		let len = arr.length;
		let temp = '';
		let min = '';
	    for (let i = 0; i < len - 1; i++){
	        min = i;
	        for (let j = i + 1; j < len; j++){
	            if (arr[j] < arr[min]){
	                min = j;
	            }
	        }
	        if (min != i){
			    temp = arr[min];
			    arr[min] = arr[i];
			    arr[i] = temp;
	        }
	    }
	    return arr;
	},
	quickSort(arr) { //快速排序

	　　if (arr.length <= 1) { 
			return arr; 
		}

	　　var pivotIndex = Math.floor(arr.length / 2);  //选取基准点索引
	　　var pivot = arr.splice(pivotIndex, 1)[0];

	　　var left = [];
	　　var right = [];

	　　for (var i = 0; i < arr.length; i++){
	　　　　(arr[i] < pivot) ? left.push(arr[i]) : right.push(arr[i]);
	　　}

		return this.quickSort(left).concat([pivot], this.quickSort(right));
	},
}

// export { tls };