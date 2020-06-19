<template>
    <view>
<swiper class="card-swiper"  :indicator-dots="false" :circular="true"
		 :autoplay="false" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
		 indicator-active-color="#0081ff">
			<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
				<!-- <view class="swiper-item">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
				</view> -->
				<view class="swiper-item bg-red text-center " style="margin:0 auto;">
					<view class="margin-top-xl">758.00</view>
					<view>待发放</view>
					<view>2020.02</view>
				</view>
			</swiper-item>
		</swiper>
        <uni-card title="">
            <!-- <view style="width: 100%;float:right; ">
                <view class="fR margin-right-xl">
                    <picker mode="date" :value="date" :start="startDate" :end="endDate" 
                    @change="bindDateChange" fields="month">
                        <view class="text-xl">
                            <text>{{date}}</text>
                        <text class="margin-left cuIcon-unfold" />
                        </view>
                    </picker>
                </view>
            </view> -->

           <!-- <view style="width: 100%; float:left">
                <view class="fL text-xl" style="width: 50%;">发卡总量: 16</view>
                <view class="fL text-xl" style="width: 50%;">推广费用: 400元</view>
            </view> -->


            <view class="cu-list grid no-border col-3" style="width: 100%; " v-if="showA">
				<view class="cu-item">
				    <text>时间</text>
				</view>
                <view class="cu-item">
                    <text>详情</text>
                </view>
                <view class="cu-item">
                    <text>费用</text>
                </view>
                
            </view>
            <view class="cu-list grid no-border col-3" style="width: 100%;word-break: break-all;margin-top: 0upx;padding: 0upx; " 
            v-if="showA" v-for="i in 4" :kye="i">
                <view class="cu-item">
                    <text>2020-06-08</text>
                </view>
                <view class="cu-item">
                    <text>详情{{i}}</text>
                    <text>详情{{i}}</text>
                </view>
                <view class="cu-item">
                    <text>+26.00</text>
                    <text>待发放</text>
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
