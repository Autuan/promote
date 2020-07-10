<template>
	<view>

		<uni-card title="发卡订单">
			<view style="width: 100%;float:right; ">
				<view class="fR margin-right-xl">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange" fields="month">
						<view class="text-xl">
							<text>{{date}}</text>
							<text class="margin-left cuIcon-unfold" />
						</view>
					</picker>
				</view>
			</view>

			<view style="width: 100%; float:left">
				<view class="fL text-bold text-xl" style="width: 50%;">总量: {{list.length}}</view>
				<view class="fR text-bold text-xl text-right" style="width: 50%;">推广费用: {{sum}}元</view>
			</view>
			<view v-show="list.length<1">没有数据</view>
			<view v-show="list.length>0">
				<view class="cu-list grid no-border col-4" style="width: 100%; ">
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
						<text>申请/审核时间</text>
					</view>
				</view>
				<view class="cu-list grid no-border col-4" style="width: 100%;word-break: break-all;margin-top: 0upx;padding: 0upx; "
				 v-for="(item,index) in list" :key="index">
					<view class="cu-item margin-top">
						<text>{{item.name}}</text>
					</view>
					<view class="cu-item margin-top" style="">
						<text style="">{{encodeMember(item.orderNo)}}</text>
					</view>
					<view class="cu-item margin-top">
						<text :class="item.approveStatus == '审核通过' ? 'text-green-cus' : 'text-red-cus'">{{item.approveStatus}}</text>
					</view>
					<view class="cu-item">
						<text>{{item.applyTime}}</text>
						<text>{{item.verifyDate}}</text>
					</view>
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
				date: currentDate,
				list: [],
				member: {},
				sum: 0,
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
				page.bankList();
			});
		},
		methods: {
			encodeMember(str) {
				if (str.length > 3) {
					return str.substring(0, 2) + '****' + str.substring(str.length - 2, str.length)
				} else {
					return str.substring(0, 1) + '****'
				}
			},
			bankList() {
				let page = this;
				getApp().request({
					url: page.baseUrl() + '/data/bank/bankList',
					data: {
						salesmanId: page.member.id,
						queryDateStr: page.date,
					},
					successParse: function(data) {
						console.info(data)
						page.list = data;
						let sum = 0;
						for (let item of data) {
							sum += item.reward;
						}
						page.sum = sum;
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
	.text-green-cus {
		color: #39b54a !important;
	}

	.text-red-cus {
		color: #e54d42 !important;
	}
</style>
