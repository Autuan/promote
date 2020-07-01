<template>
    <view>

        <uni-card title="发卡订单">
            <view style="width: 100%;float:right; ">
                <view class="fR margin-right-xl">
                    <picker mode="date" :value="date" :start="startDate" :end="endDate" 
                    @change="bindDateChange" fields="month">
                        <view class="text-xl">
                            <text>{{date}}</text>
                        <text class="margin-left cuIcon-unfold" />
                        </view>
                    </picker>
                </view>
            </view>

            <view style="width: 100%; float:left">
                <view class="fL text-xl" style="width: 50%;">发卡总量: 16</view>
                <!-- <view class="fL text-xl" style="width: 50%;">推广费用: 400元</view> -->
            </view>

            <view class="cu-list grid no-border col-4" style="width: 100%; " v-if="showA">
                <view class="cu-item">
                    <text>产品名称</text>
                </view>
                <view class="cu-item">
                    <text>ApplyId</text>
                </view>
                <view class="cu-item">
                    <text>状态</text>
                </view>
                <view class="cu-item">
                    <text>申请时间</text>
                </view>
            </view>
            <view class="cu-list grid no-border col-4" style="width: 100%;word-break: break-all;margin-top: 0upx;padding: 0upx; " 
            v-if="showA" v-for="(item,index) in list" :key="index">
                <view class="cu-item">
                    <text>{{item.name}}</text>
                </view>
                <view class="cu-item" style="">
                    <text style="">{{item.orderNo}}</text>
                </view>
                <view class="cu-item">
                    <text>{{item.approveStatus}}</text>
                </view>
                <view class="cu-item">
                    <text>{{item.verifyDate}}</text>
                </view>
            </view>
        </uni-card>
    </view>
</template>

<script>
    import uniCard from '@/components/uni-card/uni-card.vue';
    export default {
        components: {
            uniCard,
        },
        data() {
            const currentDate = this.getDate({
                format: true
            })
            return {
                showA: true,
                date: currentDate,
                list: [],
            }
        },
        computed: {
            startDate() {
                return this.getDate('start');
            },
            endDate() {
                return this.getDate('end');
            }
        },
		onLoad(){
			let page = this;
			getApp().afterLogin(getCurrentPages(), function() {
				page.member = uni.getStorageSync('member');
				page.bankList();
			});
		},
        methods: {
			bankList() {
				let page = this;
				getApp().request({
					url: page.baseUrl() + '/data/bank/bankList',
					data: {
						salesmanId: page.member.id,
						queryDateStr: page.date,
					},
					successParse: function(data) {
						page.swiperList = data.filter(item=>item.approveStatus === '审核拒绝')
						page.list = data;
					}
				})
			},
            bindDateChange: function(e) {
                this.date = e.target.value;
				this.bankList();
            },
            getDate(type) {
                const date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();

                if (type === 'start') {
                    year = year - 60;
                } else if (type === 'end') {
                    year = year + 2;
                }
                month = month > 9 ? month : '0' + month;;
                day = day > 9 ? day : '0' + day;
                return `${year}-${month}`;
            }
        }
    }
</script>

<style>

</style>
