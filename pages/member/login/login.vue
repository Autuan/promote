<template>
    <view class="zaiui-login-content">
        <!-- <view class="logo-view">
			<image class="logo" src="/static/logo.jpg" mode="widthFix"></image>
		</view> -->
        <view class="content">
            <view class="title-h">您好,欢迎使用,请登录</view>
            <!-- <view class="introduce">欢迎使用</view> -->
            <input class="margin-top" placeholder="请输入手机号码" v-model="submitData.mobile" />
            <input class="margin-top" password placeholder="请输入登录密码" v-model="submitData.password" />
        </view>
        <view class="foot-view">
            <view class="zaiui-btn-view">
                <button class="zaiui-btn" @tap="login">进入APP</button>
            </view>
            <view class="font-tag-view">
                <!-- <text class="font-tag">忘记密码?</text> -->
                <text class="font-tag" @tap="toRegister">用户注册</text>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                submitData: {
                    mobile: '',
                    password: '',
                }
            }
        },
        onLoad() {},
        methods: {
            checkParam() {
                let tipObj = {
                    mobile: {
                        name: '手机号码',
                        type: 'phone',
                    },
                    password: {
                        name: '密码',
                    },
                };
                return getApp().checkParamNotNull(this.submitData, tipObj);
            },
            login() {
                let page = this;

                let checkPass = page.checkParam();
                if (!checkPass) {
                    return;
                }

                getApp().request({
                    url: '/front/salesman/login',
                    data: page.submitData,
                    successParse: function(data) {
                        console.info(data)
                        uni.setStorageSync('member', data)
                    }
                })
            },
            toRegister() {
                uni.navigateTo({
                    url: '/pages/member/login/register'
                });
            }
        }
    }
</script>

<style lang="less">
    @import "@/static/css/login/app.less";
</style>
