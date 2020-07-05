<template>
	<view>
		<uni-card title="">
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

			<view v-show="list.length < 1">
				没有数据
			</view>
			<view class="cu-list  bottom-border fL response border-bottom-gray padding-bottom" style="word-break: break-all;"
			 v-if="showA" v-for="(item,index) in list" :key="index">
				<view class="cu-item fL response ">
                    <text class="fL">推广费</text>
                    <text class="fR">{{item.reward}}</text>
                </view>
				<view class="cu-item fL response ">
					<text class="fL">收款银行卡</text>
					<text class="fR">{{member.brokerageBankNo}}</text>
				</view>
				<view class="cu-item fL response">
					<text class="fL">{{item.verifyDate}}</text>
					<text class="fR">{{item.approveStatus}}</text>
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
				member: {},
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
		onLoad() {
			let page = this;
			getApp().afterLogin(getCurrentPages(), function() {
				page.member = uni.getStorageSync('member');
				page.queryHistoryData();
			});

		},
		methods: {
			queryHistoryData() {
				let page = this;

				getApp().request({
					url: page.baseUrl() + '/salesman/historyReward',
					data: {
						salesmanId: page.member.id,
						queryDateStr: page.date,
					},
					successParse: function(data) {
						console.info('historyReward success !')
						console.info(data)
						page.list = data;
					}
				})
			},
			bindDateChange: function(e) {
				this.date = e.target.value
				this.queryHistoryData();
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
