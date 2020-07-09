<template>
    <view>

        <uni-card title="联合拉新">
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
                <view class="fL text-xl" style="width: 50%;">拉新人数: {{promoteUserNum}} 人</view>
                <view class="fL text-xl" style="width: 50%;">推广费用: {{promoteReward}}元</view>
            </view>

            <view class="cu-list grid no-border col-3" style="width: 100%; " v-show="list.length > 0">
                <view class="cu-item">
                    <text>交易时间</text>
                </view>
                <view class="cu-item">
                    <text>客户账号</text>
                </view>
                <view class="cu-item">
                    <text>佣金明细</text>
                </view>
                
            </view>
            <view class="cu-list grid no-border col-3" style="width: 100%;word-break: break-all;margin-top: 0upx;padding: 0upx; " 
            v-show="list.length > 0" v-for="(item,index) in list" :key="index">
                <view class="cu-item">
                    <text>{{item.verifyDate}}</text>
                </view>
                <view class="cu-item" style="">
                    <!-- <text style="">{{item.orderNo}}</text> -->
                    <text style="">{{encodeMember(item.orderNo)}}</text>
                </view>
                <view class="cu-item">
                    <text>{{item.type}}{{item.reward}}</text>
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
                member: {},
                date: currentDate,
                list:[],
            }
        },
        computed: {
            startDate() {
                return this.getDate('start');
            },
            endDate() {
                return this.getDate('end');
            },
            promoteReward(){
                let reward = 0;
                for(let data of this.list) {
                    reward += data.reward*1;
                }
                return reward;
            },
            promoteUserNum(){
                return this.list.length;
            }
        },
        onLoad() {
            let page = this;
            getApp().afterLogin(getCurrentPages(), function() {
                page.member = uni.getStorageSync('member');
                page.jdList();
            });
        },
        methods: {
            jdList() {
                let page = this;
                getApp().request({
                    url: page.baseUrl() + '/data/jd/jdList',
                    data: {
                        salesmanId: page.member.id,
                        queryDateStr: page.date,
                    },
                    successParse: function(data) {
						console.info(data)
                        page.list = data;
                    }
                })
            },
			encodeMember(str){
				if(str.length > 3) {
					return str.substring(0,2)+'****'+str.substring(str.length -2 ,str.length)
				} else {
					return str.substring(0,1) + '****'
				}
			},
            bindDateChange: function(e) {
                this.date = e.target.value;
                this.jdList();
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
                // return `${year}-${month}-${day}`;
                return `${year}-${month}`;
            }
        }
    }
</script>

<style>

</style>
