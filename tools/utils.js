function request(url, method, data, showLoading = true) {
	return new Promise((resolve, reject) => {
		if (showLoading) {
			uni.showLoading({
				title: '加载中...'
			});
		}

		data = data || {};

		// data = toQueryString(data)
		uni.request({
			url: reBuildUrl(url),
			header: {
				'Content-Type': 'application/json'
			},
			data: data || {},
			method: method || 'GET',
			success(res) {
				if (showLoading) {
					uni.hideLoading();
				}
				if (res.statusCode == 200) {
					resolve(res.data);
				} else {
					var title = res.errMsg;
					showToast(title); //提示信息
					reject();
				}
			},
			fail(e) {
				if (showLoading) {
					uni.hideLoading();
				}
			}
		});
	})
}
function cleanArray(actual) {
	const newArray = [];
	for (let i = 0; i < actual.length; i++) {
		if (actual[i]) {
			newArray.push(actual[i]);
		}
	}
	return newArray;
}
export function reBuildUrl(url) {
	let baseUrl = 'https://www.maixiaoquan.com/';
	let arr = url.split('/');
  if(arr.length==1){
    baseUrl += arr[0] ;
  }else{
    baseUrl += arr[0] + '-';
  }

	if (arr[1]) {
		baseUrl += arr[1] + '.htm';
	}
	// let userInfo = uni.getStorageSync('userInfo');
	// let token = userInfo == null ? '' : userInfo.token;
	
	// baseUrl += '?token=';
	// baseUrl += token;
	

	return baseUrl;
}
function toQueryString(obj) {
	if (!obj) return "";
	return cleanArray(
		Object.keys(obj).map(key => {
			if (obj[key] === undefined) return "";
			return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
		})
	).join("&");
}
export function get(url, data, showLoading = true) {
	return request(url, 'GET', data, showLoading);
}

export function post(url, data, showLoading = true) {
	return request(url, 'POST', data, showLoading);
}


