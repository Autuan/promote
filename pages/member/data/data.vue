<template>
	<view>
		<!-- 发卡订单 -->
		<uni-card title="发卡订单" @tap="bankCardDetail">
			<view style="width: 100%; ">
				<view class="fL text-xl" style="width: 50%;">本月 {{passNum}} 已通过</view>
				<view class="fL text-xl" style="width: 50%;">本月 {{failNum}} 已拒绝</view>
			</view>
		</uni-card>

		<!-- 联合拉新 -->
		<uni-card title="" @tap="promoteUserDetail">
			联合拉新
			<view class="cu-list grid no-border col-4" style="width: 100%; " v-if="showB">
				<view class="cu-item">
					<text>产品名称</text>
				</view>
				<view class="cu-item">
					<text>状态</text>
				</view>
				<view class="cu-item">
					<text>申请时间</text>
				</view>
				<view class="cu-item">
					<text>审核时间</text>
				</view>
			</view>
			<view class="cu-list grid no-border col-4" style="width: 100%; " v-if="showB" v-for="i in 4" :key="i">
				<view class="cu-item">
					<text>产品{{i}}</text>
				</view>
				<view class="cu-item">
					<text>{{i/2==0?'通过':'拒绝'}}</text>
				</view>
				<view class="cu-item">
					<text>2020-06-08</text>
				</view>
				<view class="cu-item">
					<text>2020-06-08</text>
				</view>
			</view>
		</uni-card>

		<!-- 团队业绩 -->
		<uni-card title="" @tap="groupDataDetail">
			团队业绩
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
				showA: true,
				showB: false,
				gridCol: 3,

				member: {},
				failNum: 0,
				passNum: 0,
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
			bankList() {
				let page = this;
				getApp().request({
					url: page.baseUrl() + '/data/bank/bankList',
					data: {
						salesmanId: page.member.id,
						queryDateStr: page.date,
					},
					successParse: function(data) {
						page.failNum = data.filter(item => item.approveStatus === '审核拒绝').length;
						page.passNum = data.filter(item => item.approveStatus === '审核通过').length;
					}
				})
			},
			bankCardDetail() {
				uni.navigateTo({
					url: '/pages/member/data/bank-card'
				})
			},
			promoteUserDetail() {
				uni.navigateTo({
					url: '/pages/member/data/promote-user'
				})
			},
			groupDataDetail() {
				let groupId = this.member.groupId
				let page = this;

				if (groupId) {

					getApp().request({
						url: page.baseUrl() + '/group/groupDataPower',
						data: {
							groupId: page.member.groupId,
							querySalesmanId: page.member.id,
						},
						successParse: function(data) {
							if (data) {
								uni.navigateTo({
									url: '/pages/member/data/group-data'
								})
							} else {
								getApp().tip('您无权限访问目标页面')
								return;
							}
						}
					})

				} else {
					getApp().tip('当前业务员未加入小组')
					return;
				}
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
