<template>
    <view class="zaiui-login-content">
        <!-- <view class="logo-view">
			<image class="logo" src="/static/logo.jpg" mode="widthFix"></image>
		</view> -->
        <view class="content">
            <view class="title-h">您好,{{member.name}}</view>
            <view class="introduce">请修改您的登录密码</view>
            <!-- <view class="cu-form-group"> -->
            <!-- <view class="title">您好</view> -->
            <!-- <view class="title">您好，{{member.name}} </view> -->
            <!-- <input placeholder="请输入密码" name="input" v-model="submitData.password" password="true" ></input> -->
            <!-- </view> -->
            <!-- <view class=""> -->
            <!-- <view class="title">您好</view> -->
            <!-- <view class="title">请修改您的登录密码</view> -->
            <!-- <input placeholder="请输入密码" name="input" v-model="submitData.password" password="true" ></input> -->
            <!-- </view> -->
            <view class="cu-form-group">
                <view class="title">密码</view>
                <input placeholder="请输入密码" name="input" v-model="submitData.password" password="true"></input>
            </view>
            <view class="cu-form-group">
                <view class="title">确认密码</view>
                <input placeholder="请再次输入密码" name="input" v-model="submitData.repeatPwd" password="true"></input>
            </view>
        </view>
        <view class="foot-view">
            <view class="zaiui-btn-view">
                <button class="zaiui-btn" @tap="updatePwd">确认修改</button>
            </view>
            <view class="font-tag-view">
                <!-- <text class="font-tag">忘记密码?</text> -->
                <!-- <text class="font-tag" @tap="toRegister">用户注册	</text> -->
            </view>
        </view>
    </view>
</template>

<script>
    import md5 from '@/components/ccdzhang-dokey/md5.js';
    export default {
        data() {
            return {
                member: {},
                submitData: {
                    repeatPwd: '',
                    password: '',
                }
            }
        },
        onLoad() {
            this.member = uni.getStorageSync('member');

        },
        methods: {
            checkParam() {
                let tipObj = {
                    repeatPwd: {
                        name: '确认密码',
                    },
                    password: {
                        name: '密码',
                    },
                };
                return getApp().checkParamNotNull(this.submitData, tipObj);
            },
            updatePwd() {
                let page = this;

                let checkPass = page.checkParam();
                if (!checkPass) {
                    return;
                }
                if (page.submitData.password !== page.submitData.repeatPwd) {
                    getApp().tip('两次密码不一致!')
                    return;
                }
                if (page.submitData.password === '123456') {
                    getApp().tip('密码过于简单!')
                    return;
                }
                let encode = md5(page.submitData.password);
                page.submitData.password = encode;
                page.submitData.repeatPwd = encode;
                
                page.submitData.id = page.member.id;
                getApp().request({
                    url: page.baseUrl() + '/salesman/updatePwd',
                    data: page.submitData,
                    successParse: function(data) {
                        console.info('update Pwd success !')
                        uni.switchTab({
                            url:'/pages/index/index'
                        })
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
