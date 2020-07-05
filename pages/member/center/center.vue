<template>
	<view class="page_content">
		<view class="header">
		</view>

		<view class="cu-card fL " style="width: 100%;height: 200upx;">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" :style="'background-image:url('+member.headImg+');'" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
						<view class="content flex-sub">
							<view class="text-grey">
								<text>{{member.name}}</text>
								<view class="margin-left padding-xs">
									<view class='cu-tag line-orange'>{{member.level}}</view>
								</view>
							</view>

							<view class="text-gray text-sm flex justify-between">
								<text>{{member.mobile}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		

		<view class="bg-red radius" style="height: 300upx;width: 92%;float: left;margin-top: 20px;" @tap="toThisMoonData">
			<view class="fL text-xxl response margin-top margin-left">本月已发放推广费</view>
			<i-price class="margin-top margin-left" countSize="48" symbolSize="0" decimal="2" :value="rewardCount.thisMoonReward"
			 priceColor="white" />
		</view>

<view>
	<view @tap="toHistoryData" class="bg-white radius shadow" style="float: left;height: 160upx;width: 44%;margin-top: 20px;margin-left: 4%;">
		<view class="fL text-xxl response margin-top margin-left text-gray">
			<view class="bg-red fL " style="width: 6px;height: 35upx;">
			</view>
			<view class="fL margin-left" style="line-height: 40upx;height: 40upx;">
				历史推广费
			</view>
		</view>
		<view class="text-sm fL text-gray margin-left margin-top">点击查看</view>
	</view>
	<view class="bg-white radius shadow" style="height: 160upx;width: 44%;float: left;margin-top: 20px;margin-left: 4%;">
		<view class="fL text-xxl response margin-top margin-left text-gray">
			<view class="bg-red fL " style="width: 6px;height: 35upx;">
			</view>
			<view class="fL margin-left" style="line-height: 40upx;height: 40upx;">
				累计推广费
			</view>
		</view>
		<i-price class="margin-top margin-left" countSize="25" symbolSize="0" decimal="2" :value="rewardCount.historyReward"
		 priceColor="black" />
	</view>
</view>
		
		<view class="title_line" v-if="false">
			<text class="title">我的任务</text>
			<text class="more">查看更多</text>
		</view>

		<scroll-view class="slider" scroll-x="true" v-if="false">
			<template v-for="(task,i) in tasks">
				<view :key="'task_'+i" class="s_item">
					<view class="content">
						<image :src="task.icon" class="img"></image>
						<text class="name">{{task.name}}</text>
						<text class="desc">{{task.desc}}</text>
						<text class="btn">去完成</text>
					</view>
				</view>
			</template>
		</scroll-view>

		<view class="margin-top margin-bottom"></view>

		<view class="cu-list menu  " style="width: 100%;">
			<view class="cu-item arrow" @tap="dataDetail">
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">业绩数据</text>
				</view>
				<view class="action">
					<view class="cu-tag round bg-blue light">去看看</view>
				</view>
			</view>
			<view class="cu-item arrow" @tap="rankingDetail">
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">业绩排行榜</text>
				</view>
			</view>
		</view>

		<view class="cu-list menu  " style="width: 100%;">
            <view class="cu-item " @tap="rankingDetail">
            	<view class="content">
            		<text class="cuIcon-phone text-grey"></text>
            		<text class="text-grey">联系客服：139********</text>
            	</view>
            </view>
			<view class="cu-item " @tap="logOut">
				<view class="content">
					<text class="cuIcon-footprint text-grey"></text>
					<text class="text-grey">退出登录</text>
				</view>
			</view>
		</view>

        <view style="width: 100%;height: 150upx;"></view>
	</view>
</template>

<script>
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
				member: {},
				rewardCount: {},
				title: 'Hello',
				bigIdx: 1,
				vips: [{
					bg: 'linear-gradient(94deg,rgba(150,147,168,1),rgba(150,147,164,1))',
					shadow: '0px 3px 12px 0px rgba(195,164,110,0.23)',
					title: 'VIP会员',
					subTitle: '距离下一等级还差888积分'
				}, {
					old_bg: 'linear-gradient(94deg,rgba(150,147,168,1),rgba(150,147,164,1))',
					bg: 'linear-gradient(94deg,rgba(192,160,105,1),rgba(233,213,172,1))',
					shadow: '0px 3px 12px 0px rgba(195,164,110,0.23)',
					title: 'VIP会员',
					subTitle: '距离下一等级还差888积分'
				}, {
					bg: 'linear-gradient(94deg,rgba(150,147,168,1),rgba(150,147,164,1))',
					shadow: '0px 3px 12px 0px rgba(195,164,110,0.23)',
					title: 'VIP会员',
					subTitle: '距离下一等级还差888积分'
				}],
				tasks: [{
						icon: '/static/icon_signin.png',
						name: '连续7天签到',
						desc: '连续签到获得7积分奖励'
					},
					{
						icon: '/static/icon_profile.png',
						name: '完善个人信息',
						desc: '完善信息获得7积分奖励'
					},
					{
						icon: '/static/icon_friend.png',
						name: '邀请好友参加',
						desc: '邀请好友获得7积分奖励'
					}
				],

			}
		},
		onLoad() {
			let page = this;
			getApp().afterLogin(getCurrentPages(), function() {
				let member = uni.getStorageSync('member')
				page.member = member;


				getApp().request({
					url: page.baseUrl() + '/salesman/calcuReward',
					data: {
						salesmanId: member.id
					},
					successParse: function(data) {
						console.info('calcuReward success !')
						console.info(data)
						page.rewardCount = data;
					}
				})

			});
		},
		methods: {
			swiperChange(e) {
				this.bigIdx = e.detail.current
			},
			dataDetail() {
				uni.navigateTo({
					url: '/pages/member/data/data'
				})
			},
			rankingDetail() {
				uni.navigateTo({
					url: '/pages/member/ranking/ranking'
				})
			},
			toHistoryData() {
				uni.navigateTo({
					url: '/pages/member/data/history-data'
				})
			},
			toThisMoonData() {
				uni.navigateTo({
					url: '/pages/member/data/this-moon'
				})
			},
			logOut() {
				uni.clearStorage();
				uni.clearStorageSync();
				uni.reLaunch({
					url: '/pages/member/login/login'
				})
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		background-color: white;
	}
</style>
<style lang="scss" scoped>
	@function realSize($args) {
		@return $args / 1.5;
	}

	.page_content {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.header {
		padding-top: var(--status-bar-height);
		width: 95%;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 10px;
		margin-right: 10px;

		.btn {
			width: 27px;
			height: 27px;
		}

		.title {
			font-size: 18px;
			font-weight: 500;
			color: rgba(43, 43, 43, 1);
			line-height: 41px;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.logo {
		margin-top: 10px;
		width: 100px;
		height: 100px;
	}

	.swiper {
		width: 100%;
		margin-top: 10px;

		.swiper-item {
			border-radius: 16px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-left: 10px;
			margin-right: 10px;
		}

		.big {
			margin-top: 0;

			.img {
				margin-top: 15px;
				width: 40px;
				height: 40px;
			}

			.title {
				font-size: 25px;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				line-height: 41px;
			}

			.sub_title {
				font-size: 11px;
				font-weight: 300;
				color: rgba(255, 255, 255, 1);
				line-height: 41px;
			}
		}

		.small {
			margin-top: 14px;
			height: 75%;

			// transition: all 0.3s;
			.img {
				margin-top: 5px;
				width: 25px;
				height: 25px;
			}

			.title {
				font-size: 15px;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				line-height: 31px;
			}

			.sub_title {
				font-size: 7px;
				font-weight: 300;
				color: rgba(255, 255, 255, 1);
			}
		}
	}

	.title_line {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		.title {
			margin-left: 20px;
			font-size: 18px;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			line-height: 41px;
		}

		.more {
			margin-right: 20px;
			font-size: 10px;
			font-weight: 300;
			color: rgba(153, 153, 153, 1);
			line-height: 41px;
		}
	}

	.slider {
		white-space: nowrap;
		width: 100%;

		.s_item {
			display: inline-block;
			width: 35%;
			margin-left: 20px;
			margin-bottom: 10px;

			.content {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-radius: 8px;
				background: white;
				margin-top: 5px;
				box-shadow: 0px 2px 6px 0px rgba(103, 103, 103, 0.2);

				.img {
					width: 103px;
					height: 105px;
				}

				.name {
					margin-top: -10px;
					font-size: 12px;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					line-height: 21px;
				}

				.desc {
					font-size: 10px;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
					line-height: 21px;
				}

				.btn {
					width: 80px;
					height: 30px;
					margin-bottom: 10px;
					background: linear-gradient(94deg, rgba(192, 160, 105, 1), rgba(233, 213, 172, 1));
					box-shadow: 0px 9px 28px 0px rgba(195, 164, 110, 0.23);
					border-radius: 29px;
					font-size: 12px;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					line-height: 21px;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}
</style>
