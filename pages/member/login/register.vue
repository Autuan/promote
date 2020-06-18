<template>
	<view class="zaiui-login-content">
		<!-- <view class="logo-view">
			<image class="logo" src="/static/logo.jpg" mode="widthFix"></image>
		</view> -->
		<view class="content">
			<!-- <view class="title-h">业务员注册</view> -->
			<!-- <view class="introduce">欢迎使用</view> -->
			<input class="phone-input" placeholder="请输入姓名"/>
			<input class="phone-input" placeholder="请输入手机号码"/>
			<input class="phone-input" placeholder="请输入身份证号"/>
			<input class="phone-input" placeholder="请输入佣金结算卡卡号"/>
			<input class="phone-input" placeholder="请输入佣金结算开户行信息"/>
			<input class="phone-input" placeholder="请输入所在地区"/>
			<input class="phone-input" placeholder="请输入性别"/>
			<input class="phone-input" placeholder="请输入学历"/>
			<input class="phone-input" password placeholder="请输入登录密码"/>
			<input class="phone-input" password placeholder="请再次输入登录密码"/>
		</view>
		<view class="foot-view">
			<view class="zaiui-btn-view">
				<button class="zaiui-btn">确认注册</button>
			</view>
			<view class="font-tag-view">
				<!-- <text class="font-tag" @tap="tapLogin">免密码登录</text> -->
				<!-- <text class="font-tag">微信登录</text> -->
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
