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
            // src = 'http://localhost/front/task/get'
			let member = uni.getStorageSync('member')
			console.info(member)
			let taskId = '17b9955cc8334594b3e286ca0abee9c5'
			let memberId = "024a4dcf71a046f694e2e05f28562560"
			page.src= `http://127.0.0.1:80/front/task/qrcode/${taskId}/${memberId}`
        },
		methods: {
			
		}
	}
</script>

<style>

</style>
