<template>
	<view>
		<!-- <swiper class="card-swiper" :indicator-dots="false" :circular="true" :autoplay="false" interval="5000" duration="500"
		 @change="cardSwiper" indicator-color="#8799a3" indicator-active-color="#0081ff">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<view class="swiper-item bg-red text-center " style="margin:0 auto;">
					<view class="margin-top-xl">{{item.name}}</view>
					<view>{{item.approveStatus}}</view>
					<view>{{item.verifyDate}}</view>
				</view>
			</swiper-item>
		</swiper> -->
		
		<view style="float: left;width: 100%;" v-if="historyList.length > 0">
			<uni-card  v-for="(item,index) in historyList" style="float: left;height: 220upx;width: 33%;" 
			 :class="index == tapIndex ? 'bg-color-red' : ''" mode="basic" :key="index"
			 @tap="queryOtherMoonData(item.month,index)">
					<view class="text-center " :class="index == tapIndex ? 'text-white' : ''">{{item.count}}</view>
					<view class="text-center">推广服务费</view>
					<view class="text-center " :class="index == tapIndex ? 'text-white' : ''">{{item.month}}</view>
			</uni-card>
			</view>
		<uni-card title="" v-show="list.length < 1">
			没有数据
			</uni-card>
		<uni-card title="" v-show="list.length > 0">

			<view class="cu-list grid no-border col-3" style="width: 100%; ">
				<view class="cu-item">
					<text>时间</text>
				</view>
				<view class="cu-item">
					<text>详情</text>
				</view>
				<view class="cu-item">
					<text>审核状态</text>
				</view>
			</view>
			<view class="cu-list grid no-border col-3" style="width: 100%;word-break: break-all;margin-top: 0upx;padding: 0upx; "
			  v-for="(item,index) in list" :key="index" v-show="item.approveStatus == '通过'">
				<view class="cu-item margin-top">
					<text class="">{{item.verifyDate}}</text>
				</view>
				<view class="cu-item">
					<text class="">{{item.name}}</text>
					<text class="">{{item.info}}</text>
				</view>
				<view class="cu-item margin-top">
					<text :class="item.approveStatus == '通过' ? 'text-green-cus' : 'text-red-cus'">{{item.approveStatus}}</text>
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
				tapIndex: 0,
				date: currentDate,
				list: [],
				swiperList: [],
				historyList: [],
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
		onLoad() {
			let page = this;
			getApp().afterLogin(getCurrentPages(), function() {
				page.member = uni.getStorageSync('member');
				console.info(page.member)
				page.queryThisMoonData();
				page.queryHistoryData();
			});
		},
		methods: {
			queryOtherMoonData(dateStr,index){
				let page = this;
				if(index == page.tapIndex) {
					return;
				}
				page.tapIndex = index;
				page.date = dateStr;
				
				page.queryThisMoonData();
			},
			queryHistoryData() {
				let page = this;
			
				getApp().request({
					url: page.baseUrl() + '/salesman/historyReward',
					data: {
						salesmanId: page.member.id,
						queryDateStr: page.date,
					},
					successParse: function(data) {
						page.historyList = data;
					}
				})
			},
			queryThisMoonData() {
				let page = this;
				
				getApp().request({
					url: page.baseUrl() + '/salesman/thisMoonReward',
					data: {
						salesmanId: page.member.id,
						queryDateStr: page.date,
					},
					successParse: function(data) {
						// console.info(data)
						page.list = data;
					}
				})
			},
			bindDateChange: function(e) {
				this.date = e.target.value
				this.queryThisMoonData();
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
.bg-color-red {
	background-color: #e54d42;
	color: #ffffff;
}
.text-green-cus{
	color: #39b54a !important;
}
.text-red-cus{
	    color: #e54d42 !important;
}
</style>
