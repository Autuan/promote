<template>
	<view class="zaiui-login-content">
		<!-- <view class="logo-view">
			<image class="logo" src="/static/logo.jpg" mode="widthFix"></image>
		</view> -->
		<view class="content">
			<!-- <view class="title-h">业务员注册</view> -->
			<!-- <view class="introduce">欢迎使用</view> -->
            
			<!-- <input class="phone-input" placeholder="请输入姓名" v-model="submitData.name"/> -->
			<!-- <input class="phone-input" placeholder="请输入手机号码" v-model="submitData.mobile"/> -->
			<!-- <input class="phone-input" placeholder="请输入身份证号" v-model="submitData.identifyNumber"/> -->
			<!-- <input class="phone-input" placeholder="请输入佣金结算卡卡号" v-model="submitData.brokerageBankNo"/> -->
			<!-- <input class="phone-input" placeholder="请输入佣金结算开户行信息" v-model="submitData.brokerageBankName"/> -->
			<!-- <input class="phone-input" placeholder="请输入佣金结算卡所在地区" v-model="submitData.brokerageBankAddress"/> -->
			<!-- <input class="phone-input" placeholder="请输入性别" v-model="submitData.gender"/> -->
            <view class="cu-form-group">
            	<view class="title">姓名</view>
            	<input placeholder="请输入姓名" name="input" v-model="submitData.name"></input>
            </view>
            <view class="cu-form-group">
            	<view class="title">手机号码</view>
            	<input placeholder="请输入手机号码" name="input" v-model="submitData.mobile"></input>
            </view>
            <view class="cu-form-group">
            	<view class="title">身份证号</view>
            	<input placeholder="请输入身份证号" name="input" v-model="submitData.identifyNumber"></input>
            </view>
            <view class="cu-form-group">
            	<view class="title">佣金结算卡卡号</view>
            	<input placeholder="请输入佣金结算卡卡号" name="input" v-model="submitData.brokerageBankNo"></input>
            </view>
            <view class="cu-form-group">
            	<view class="title">佣金结算开户行信息</view>
            	<input placeholder="请输入佣金结算开户行信息" name="input" v-model="submitData.brokerageBankName"></input>
            </view>
            <view class="cu-form-group">
            	<view class="title">佣金结算卡所在地区</view>
            	<input placeholder="请输入佣金结算卡所在地区" name="input" v-model="submitData.brokerageBankAddress"></input>
            </view>
           <view class="cu-form-group">
            	<view class="title">学历</view>
            	<input placeholder="请输入学历" name="input" v-model="submitData.education"></input>
            </view>
           
                <radio-group class="block" @change="genderChange">
            <view class="cu-form-group ">
            	<view class="title">性别</view>
            	<radio :class="submitData.gender==0 ?'checked':''" :checked="submitData.gender==0?true:false" value="0"></radio>男
            	<radio :class="submitData.gender==1 ?'checked':''" :checked="submitData.gender==1?true:false" value="1"></radio>女
            </view>
                </radio-group>
            <view class="cu-form-group">
             	<view class="title">密码</view>
             	<input placeholder="请输入密码" name="input" v-model="submitData.password" password="true" ></input>
             </view>
            <view class="cu-form-group">
            	<view class="title">确认密码</view>
            	<input placeholder="请再次输入密码" name="input" v-model="submitData.repeatPwd" password="true"></input>
            </view>
			<!-- <input class="phone-input" placeholder="请输入学历" v-model="submitData.education"/> -->
			<!-- <input class="phone-input" password placeholder="请输入密码" v-model="submitData.password"/> -->
			<!-- <input class="phone-input" password placeholder="请再次输入密码" v-model="submitData.repeatPwd"/> -->
		</view>
		<view class="">
			<view class="zaiui-btn-view" style="position: fixed;bottom: 0;width: 100%;">
				<button class="zaiui-btn" @tap="register">确认注册</button>
			</view>
			<view class="font-tag-view">
				<!-- <text class="font-tag" @tap="tapLogin">免密码登录</text> -->
				<!-- <text class="font-tag">微信登录</text> -->
			</view>
		</view>
	</view>
</template>

<script>
    import md5 from '@/components/ccdzhang-dokey/md5.js';
	export default {
		data() {
			return {
				submitData: {
				    name: '',
				    mobile: '',
				    identifyNumber: '',
				    brokerageBankNo: '',
				    brokerageBankName: '',
				    brokerageBankAddress: '',
				    password: '',
				    gender: null,
				    education: '',
				    repeatPwd: '',
				}
			}
		},
		onLoad() {

		},
		methods: {
            genderChange(e){
                // console.info(e)
                this.submitData.gender = e.detail.value * 1
            },
            checkParam() {
                let tipObj = {
                    mobile: {
                        name: '手机号码',
                        type: 'phone',
                    },
                    name: {
                        name: '姓名',
                    },
                    identifyNumber: {
                        name: '身份证号码',
						type:'idCard',
                    },
                    brokerageBankNo: {
                        name: '佣金结算卡卡号',
                    },
                    brokerageBankName: {
                        name: '佣金结算开户行信息',
                    },
                    brokerageBankAddress: {
                        name: '佣金结算卡所在地区',
                    },
                    password: {
                        name: '密码',
						minLen:6,
                    },
                    gender: {
                        name: '性别',
                        type:'number',
                    },
                    education: {
                        name: '学历',
                    },
                    repeatPwd: {
                        name: '确认密码',
                    },
                };
                return getApp().checkParamNotNull(this.submitData, tipObj);
            },
            register(){
                let page = this;
                
                let checkPass = page.checkParam();
                if (!checkPass) {
                    return;
                }
                if(page.submitData.password !== page.submitData.repeatPwd ) {
                    getApp().tip('两次密码不一致!')
                    return
                }
                if(page.submitData.password === '123456') {
                    getApp().tip('密码过于简单!')
                    return;
                }
                let encode = md5(page.submitData.password);
                 page.submitData.password = encode;
                 page.submitData.repeatPwd = encode;
               getApp().request({
                   url: page.baseUrl() +'/salesman/register',
                   data: page.submitData,
                   successParse: function(data) {
                       uni.setStorageSync('member', data)
					   
					   getApp().tip('注册成功,请稍后')
					   setTimeout(function(){
						   
					   uni.reLaunch({
					   	url:'/pages/index/index'
					   })
					   },1500)
                   }
               })
            },
			tapLogin() {
				uni.navigateTo({
					url: '/pages/login/index'
				});
			}
		}
	}
</script>

<style lang="less">
 @import "@/static/css/login/app.less";
</style>
