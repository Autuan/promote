<template>
    <view>
        <image :src="src" style="width: 100%;height: 100vh;" />
    </view>
</template>

<script>
    export default {
        data() {
            return {
                src: '',
            }
        },
        onLoad(option) {
            let page = this;
            getApp().afterLogin(getCurrentPages(), function() {
                let member = uni.getStorageSync('member')
                let taskId = option.taskId;
                let memberId = member.id;
                page.src = page.baseUrl() + `/task/qrcode/${taskId}/${memberId}`
            });
        },
        methods: {

        }
    }
</script>

<style>

</style>
