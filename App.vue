<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			/**
			 * 弹框提示信息
			 * @param {Object} msg
			 */
			tip(msg) {
				uni.showToast({
					icon: 'none',
					title: msg,
					duration: 2000
				});
			},
			objToUrl(baseUrl, obj) {
			    var parameters = "";
			    var url = "";
			    for (var key in obj) {
			        if (obj[key] != '') {
			            parameters += key + "=" + obj[key] + "&";
			        }
			    }
			    parameters = parameters.replace(/&$/, "");
			    if (/\?$/.test(baseUrl)) {
			        url = baseUrl + parameters;
			    } else {
			        url = baseUrl.replace(/\/?$/, '?') + parameters;
			    }
			    return url;
			},
			checkParamNotNull(paramObj, tipObj) {
				let flag = false;
				return Object.keys(tipObj).every(function(key, index) {
					flag = paramObj[key] == undefined;
					if (flag) {
						getApp().tip(tipObj[key].name + '不能为空');
						return false;
					}
					let type = tipObj[key].type || "string";
					let tip = tipObj[key].tip;
					let regType = "";
					if (getApp().regType.indexOf(type) > -1) {
						regType = type;
						type = "string";
					}
					switch (type) {
						case 'string':
							{
								flag = paramObj[key] == '';
								let val = paramObj[key];
								if (flag) {
									getApp().tip(tip || tipObj[key].name + '不能为空');
									return false;
								}
								if (regType !== "") {
									let reg = getApp().reg[regType];
									if (!reg.test(val)) {
										getApp().tip(tip || '请输入正确的' + tipObj[key].name);
										return false;
									}
								} else {
									let strLen = paramObj[key].length;
									let minLen = tipObj[key].minLen;
									if (undefined != minLen && !isNaN(minLen)) {
										if (minLen >= 0 && strLen < minLen) {
											getApp().tip(tip || tipObj[key].name + '最小长度为' + minLen);
											return false;
										}
									}
									let maxLen = tipObj[key].maxLen;
									if (undefined != maxLen && !isNaN(maxLen)) {
										if (maxLen >= 0 && maxLen < strLen) {
											getApp().tip(tip || tipObj[key].name + '长度必须在' + maxLen + '以内(不含)');
											return false;
										}
									}
								}
								break;
							}
						case 'number':
							{
								let val = paramObj[key];
								if (isNaN(val)) {
									getApp().tip(tip || tipObj[key].name + '必须是数字');
									return false;
								}
								let min = tipObj[key].min;
								let max = tipObj[key].max;
								if (min != undefined && val < min) {
									getApp().tip(tip || tipObj[key].name + '不能小于最低值:' + min);
									return false;
								}
								if (max != undefined && val >= max) {
									getApp().tip(tip || tipObj[key].name + '不能大于等于最大值:' + max);
									return false;
								}
								break;
							}
						case 'address':
							{
								flag = paramObj[key] == '';
								if (flag) {
									getApp().tip(tip || '请选择' + tipObj[key].name);
									return false;
								}
								break;
							}
						case 'image':
							{
								flag = paramObj[key] == '';
								if (flag) {
									getApp().tip(tip || '请上传' + tipObj[key].name);
									return false;
								}
								break;
							}
					}
					return true;
				});
			},
			/**
			 * 页面登录检查
			 * @param param 登录后目标页面带入参数
			 * @param {Object} currentPathArray
			 * @param {Object} fun
			 */
			afterLoginWithParam(currentPathArray, param, fun) {
				let storageMemberId = uni.getStorageSync('memberId');
				if (storageMemberId == undefined || storageMemberId == '') {
					let currentPath = currentPathArray[currentPathArray.length - 1].route;
					let option = {};
					option.redirectUrl = getApp().objToUrl('/' + currentPath, param),
						uni.reLaunch({
							url: getApp().objToUrl('/pages/member/login/login', option),
						});
				} else {
					fun();
				}
			},
			/**
			 * 页面登录检查
			 * 
			 * @param {Object} currentPathArray
			 * @param {Object} fun
			 */
			afterLogin(currentPathArray, fun) {
				getApp().afterLoginWithParam(currentPathArray, {}, fun);
			},
			request(option) {
				let opt = option || {};
				let currentPathArray = getCurrentPages();
				let currentPath = currentPathArray[currentPathArray.length - 1].route;
				opt.url = option.url;
				if (opt.url == undefined || opt.url == '') {
					console.error('request: [url]不能为空!');
					return;
				}
				// if (process.env.NODE_ENV === 'development') {
				//     opt.url = 'http://127.0.0.1:80'+opt.url
				//     }
				let contentTypeEncoded = 'application/x-www-form-urlencoded';
				opt.type = option.type || 'POST';
				opt.contentType = option.contentType || this.contentTypeJSON;
				opt.data = option.data || {};
				opt.success = option.success || function(respond) {};
				opt.fail = option.fail || function() {};
				opt.complete = option.complete || function() {};
				if (option.successParse != undefined) {
					let successParseFunction = function(respond) {
						let res = respond.data;
						if (res.code == '000000') {
							option.successParse(res.data)
						} else {
							if (option.failParse != undefined) {
								option.failParse(res)
							} else {
								getApp().tip(res.msg);
								console.error(opt.url + ' error --->' + res.msg);
							}
						}
					}
					opt.success = successParseFunction;
				}
				uni.request({
					url: opt.url,
					data: opt.data,
					method: opt.type,
					fail: opt.fail,
					success: opt.success,
					complete: opt.complete,
					dataType: 'json',
				});
			}
		}
	}
</script>

<style>
	@import "static/css/uni.css";
	@import "static/css/global.css";

	@import "colorui/main.css";
	@import "colorui/icon.css";
</style>
