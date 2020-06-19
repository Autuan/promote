<template>
    <view>
        <uni-card title="">
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

           <!-- <view style="width: 100%; float:left">
                <view class="fL text-xl" style="width: 50%;">发卡总量: 16</view>
                <view class="fL text-xl" style="width: 50%;">推广费用: 400元</view>
            </view> -->

<!-- 
            <view class="cu-list   " style="width: 100%; " v-if="showA">
				<view class="cu-item">
				    <text>时间</text>
				</view>
                <view class="cu-item">
                    <text>详情</text>
                </view>
                <view class="cu-item">
                    <text>费用</text>
                </view>
                
            </view> -->
            <view class="cu-list  bottom-border fL response border-bottom-gray padding-bottom" style="word-break: break-all;" 
            v-if="showA" v-for="i in 4" :kye="i">
                <view class="cu-item fL response ">
                    <text class="fL">5月推广费</text>
                    <text class="fR">+12.00</text>
                </view>
                <view class="cu-item fL response ">
                   <text class="fL">收款银行卡</text>
                   <text class="fR">12345678900000000000</text>
               </view>
                <view class="cu-item fL response">
                   <text class="fL">2020-01-01 00:00:00</text>
                   <text class="fR">发放成功</text>
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
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}],
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
