<template>
    <view>
        <!-- 头像手机号等信息 -->
        <view class="cu-card case" >
        	<view class="cu-item shadow">
        		<view class="cu-list menu-avatar">
        			<view class="cu-item">
        				<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
        				<view class="content flex-sub">
        					<view class="text-grey">
                                <text>张三</text>
                                <view class="margin-left padding-xs" >
                                	<view class='cu-tag line-orange' >title</view>
                                </view>
                            </view>
                            
        					<view class="text-gray text-sm flex justify-between">
        						<text>16688888888</text>
        						<!-- <view class="text-gray text-sm">
        							<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
        							<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
        							<text class="cuIcon-messagefill margin-lr-xs"></text> 30
        						</view> -->
        					</view>
        				</view>
        			</view>
        		</view>
        	</view>
        </view>
        
        <!-- 本月收益 -->
        <uni-card :is-shadow="false" @click="clickCard">
            <view>本月预估推广费</view>
            <i-price countSize="24" symbolSize="16" decimal="small" :value="8888" />
        </uni-card>
        
        <uni-card class="fL" :is-shadow="false" @click="clickCard" style="width: 40%;height: 160upx;">
            <view>历史推广费</view>
        </uni-card>
        
        <uni-card class="fL" :is-shadow="false" @click="clickCard" style="width: 45%;height: 160upx;">
            <view>累计推广费</view>
            <i-price countSize="24" symbolSize="16" decimal="small" :value="8888" />
        </uni-card>
            
            <uni-card :is-shadow="false" @click="clickCard">
                <view class="fL">
                    <text class="text-xxl">业绩数据</text>
                </view>
               <view class="fL margin-left padding-xs" >
               	<view class='cu-tag line-red' >去看看</view>
               </view>
            </uni-card>
            
            <uni-card :is-shadow="false" @click="clickCard">
                <view class="fL">
                    <text class="text-xxl">业绩排行榜</text>
                </view>
            </uni-card>
    </view>
</template>
<script>
    // let startY = 0,
    //     moveY = 0,
    //     pageAtTop = true;
         import uniCard from '@/components/uni-card/uni-card.vue';
         import iPrice from '@/components/i-price/i-price.vue';
    export default {
        components: {
            // listCell,
            // uniGrid,
            uniCard,
            iPrice
        },
        data() {
            return {
                coverTransform: 'translateY(0px)',
            }
        },
		created() {
			let vue = this;
			
		},
        onLoad(option) {
            let memberNo = uni.getStorageSync('memberNo');
            // if(memberNo == undefined || memberNo == '') {
            //     option.redirectUrl = '/pages/member/center';
            //    uni.reLaunch({
            //        url: getApp().objToUrl('/pages/member/log-in',option),
            //    });
            // } else {
            // }
        },
        computed: {
            // ...mapState(['hasLogin', 'userInfo'])
        },
        methods: {
            /**
             * 签到
             */
            check() {
               uni.navigateTo({
               	url:'/pages/member/dailyAttendance'
               })
            },
            message() {
                getApp().tip('点击消息');
            },
            settings() {
                getApp().tip('点击设置');
            },
            memberInfo() {
                getApp().tip('点击会员个人信息');
            },
            closeSystemTip() {
                this.showSystemTip = false;
            },
            intoTicketService() {
                getApp().tip('进入服务端管理');
            },
            intoTicketSupply() {
                getApp().tip('进入供应端管理');
            },
            allOrder() {
                getApp().tip('查看全部订单');
            },
            payment() {
                uni.navigateTo({
                    url: getApp().objToUrl('/pages/order/order-list', {orderStatus:1})
                })
            },
            shipments() {
               uni.navigateTo({
                   url: getApp().objToUrl('/pages/order/order-list', {orderStatus:2})
               })
            },
            confirm() {
                uni.navigateTo({
                    url: getApp().objToUrl('/pages/order/order-list', {orderStatus:3})
                })
            },
            evaluation() {
               uni.navigateTo({
                   url: getApp().objToUrl('/pages/order/order-list', {orderStatus:4})
               })
            },
            refund() {
                uni.navigateTo({
                    url: getApp().objToUrl('/pages/order/order-list', {orderStatus:5})
                })
            },
            information() {
                uni.navigateTo({
                	url:'/pages/member/account'
                })
                // getApp().tip('账户信息');
            },
            address() {
				uni.navigateTo({
					url:'/pages/address/list'
				})
            },
            uab() {
                getApp().tip('权益凭证');
            },
            ticket() {
                getApp().tip('我的发票');
            },
            product() {
                getApp().tip('审核商品');
            },
            supply() {
                getApp().tip('审核供应端');
            },
            /**
             * 统一跳转接口,拦截未登录路由
             * navigator标签现在默认没有转场动画，所以用view
             */
            navTo(url) {
                if (!this.hasLogin) {
                    url = '/pages/public/login';
                }
                uni.navigateTo({
                    url
                })
            },

            /**
             *  会员卡下拉和回弹
             *  1.关闭bounce避免ios端下拉冲突
             *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
             *    transition设置0.1秒延迟，让css来过渡这段空窗期
             *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
             */
            coverTouchstart(e) {
                if (pageAtTop === false) {
                    return;
                }
                this.coverTransition = 'transform .1s linear';
                startY = e.touches[0].clientY;
            },
            coverTouchmove(e) {
                moveY = e.touches[0].clientY;
                let moveDistance = moveY - startY;
                if (moveDistance < 0) {
                    this.moving = false;
                    return;
                }
                this.moving = true;
                if (moveDistance >= 80 && moveDistance < 100) {
                    moveDistance = 80;
                }

                if (moveDistance > 0 && moveDistance <= 80) {
                    this.coverTransform = `translateY(${moveDistance}px)`;
                }
            },
            coverTouchend() {
                if (this.moving === false) {
                    return;
                }
                this.moving = false;
                this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
                this.coverTransform = 'translateY(0px)';
            },
            headImageError(){
                console.info('headImageError')
            },
        }
    }
</script>
<style lang='scss'>
</style>
