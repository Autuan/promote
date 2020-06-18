<template>
	<view class="zaiui-login-content">
		<!-- <view class="logo-view">
			<image class="logo" src="/static/logo.jpg" mode="widthFix"></image>
		</view> -->
		<view class="content">
			<view class="title-h">您好,欢迎使用,请登录</view>
			<!-- <view class="introduce">欢迎使用</view> -->
			<input class="phone-input" placeholder="请输入手机号码"/>
			<input class="phone-input" password placeholder="请输入登录密码"/>
		</view>
		<view class="foot-view">
			<view class="zaiui-btn-view">
				<button class="zaiui-btn">进入APP</button>
			</view>
			<view class="font-tag-view">
				<text class="font-tag">忘记密码?</text>
				<text class="font-tag">用户注册</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
            getApp().request({
                url:'/front/salesman/024a4dcf71a046f694e2e05f28562560',
                successParse:function(data){
                    console.info(data)
                }
            })
		},
		methods: {
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
