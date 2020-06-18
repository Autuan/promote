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
                <view class="fL text-xl" style="width: 50%;">推广费用: 400元</view>
            </view>

            <view class="cu-list grid no-border col-4" style="width: 100%; " v-if="showA">
                <view class="cu-item">
                    <text>产品名称</text>
                </view>
                <view class="cu-item">
                    <text>订单号</text>
                </view>
                <view class="cu-item">
                    <text>状态</text>
                </view>
                <view class="cu-item">
                    <text>申请时间</text>
                </view>
               <!-- <view class="cu-item">
                    <text>审核时间</text>
                </view> -->
            </view>
            <view class="cu-list grid no-border col-4" style="width: 100%;word-break: break-all;margin-top: 0upx;padding: 0upx; " 
            v-if="showA" v-for="i in 4" :kye="i">
                <view class="cu-item">
                    <text>产品{{i}}</text>
                </view>
                <view class="cu-item" style="">
                    <text style="">1173442867927126016</text>
                </view>
                <view class="cu-item">
                    <text>{{i/2==0?'通过':'拒绝'}}</text>
                </view>
                <view class="cu-item">
                    <text>2020-06-08</text>
                </view>
              <!--  <view class="cu-item">
                    <text>2020-06-08</text>
                </view> -->
            </view>
        </uni-card>
    </view>
</template>

<script>
    import uniCard from '@/components/uni-card/uni-card.vue';
    export default {
        components: {
            // listCell,
            // uniGrid,
            uniCard,
            // iPrice
        },
        data() {
            const currentDate = this.getDate({
                format: true
            })
            return {
                showA: true,
                date: currentDate,
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
        methods: {
            bindDateChange: function(e) {
                console.log(e)
                this.date = e.target.value
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
