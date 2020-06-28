<template>
	<view>
        <!-- <view>二维码</view> -->
		<image :src="src"  style="width: 100%;height: 100vh;"/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src:'',
			}
		},
        onLoad(option) {
			let page = this;
getApp().afterLogin(getCurrentPages(), function() {
	
			let member = uni.getStorageSync('member')
			console.info(member)
			// let taskId = '17b9955cc8334594b3e286ca0abee9c5'
			let taskId = option.taskId;
			// let memberId = "024a4dcf71a046f694e2e05f28562560"
			let memberId = member.id;
			page.src= page.baseUrl() + `/task/qrcode/${taskId}/${memberId}`
	});
        },
		methods: {
			
		}
	}
</script>

<style>

</style>
