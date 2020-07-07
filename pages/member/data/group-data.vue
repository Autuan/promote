<template>
    <view>
        <!-- <view class="fixed">
			<cu-custom :isBack="true" bgColor="bg-shadeTop text-white">
				<block slot="backText">返回</block>
				<block slot="content">垂直导航</block>
			</cu-custom>
		</view> -->
        <!-- <swiper class="screen-swiper round-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
		 duration="500">
			<swiper-item v-for="(item,index) in 4" :key="index">
				<image :src="'https://ossweb-img.qq.com/images/lol/web201310/skin/big3900'+index+ '.jpg'" mode="aspectFill"></image>
			</swiper-item>
		</swiper> -->
        <view class="VerticalBox">
            <scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh - 375upx)">
                <view class="cu-item" :class="index==tabCur?'text-green cur':''" v-for="(item,index) in list" :key="index"
                    @tap="TabSelect" :data-id="index">
                    {{item.salesmanName}}
                </view>
            </scroll-view>

            <scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 375upx)"
                :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
                <view class="padding-top padding-lr" v-for="(item,index) in list" :key="index" :id="'main-'+index">
                    <view>{{item.salesmanName}}</view>
                    <view v-for="recorder in item.detail" :key='recorder.id'>
                    <view class="cu-bar solid-bottom bg-white">
                        <view class="action">
                            <text class="cuIcon-title text-green"></text> {{recorder.date}}</view>
                    </view>
                    <view class="cu-list menu-avatar">
                        <view class="cu-item" style="width: 100%;">
                            <view class="margin-left-xl text-left" style="width: 40%;">交易额</view>
                            <i-price style="width: 60%;" class="margin-right text-right" countSize="14" symbolSize="14"
                                :value="recorder.count" />
                        </view>
                        <!-- <view class="cu-item" style="width: 100%;">
                            <view class="margin-left-xl text-left" style="width: 40%;">新增激活终端</view>
                            <view class="margin-right-xl text-right" style="width: 60%;">{{recorder.newActiveTerminal}}台</view>
                        </view>
                        <view class="cu-item" style="width: 100%;">
                            <view class="margin-left-xl text-left" style="width: 40%;">新增代理</view>
                            <view class="margin-right-xl text-right" style="width: 60%;">{{recorder.newProxy}}人</view>
                        </view> -->
                    </view>
                    </view>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script>
    import iPrice from '@/components/i-price/i-price.vue';
    export default {
        components: {
            // uniCard,
            iPrice
        },
        data() {
            return {
                list2: [
                    {
                        id: '1',
                        name: '总业绩',
                        recorder: [
                            {
                            id: '11',
                            date: '2020-06',
                            totalMoney: 10000,
                            newProxy: 3,
                            newActiveTerminal: 2,
                        },{
                            id: '12',
                            date: '2020-05',
                            totalMoney: 400,
                            newProxy: 2,
                            newActiveTerminal: 23,
                        } , ]
                    },
                    {
                        id: '2',
                        name: '张三',
                        recorder: [{
                            id: '21',
                            date: '2020-06',
                            totalMoney: 5000,
                            newProxy: 8,
                            newActiveTerminal: 26,
                        }, {
                            id: '22',
                            date: '2020-05',
                            
							totalMoney: 4000,
                            newProxy: 15,
                            newActiveTerminal: 24,
                        },
                         {
                             id: '23',
                             date: '2020-04',
                             totalMoney: 32,
                             newProxy: 13,
                             newActiveTerminal: 21,
                         },
                         ]
                    },
                ],
                list: [],
                tabCur: 0,
                mainCur: 0,
                verticalNavTop: 0,
                load: true
            };
        },
        onLoad() {
			let page = this;
			getApp().afterLogin(getCurrentPages(), function() {
				page.member = uni.getStorageSync('member');
				console.info(page.member)
				// console.info(page.member.groupId)
				// return;
				page.groupData();
				
            uni.showLoading({
                title: '加载中...',
                mask: true
            });
            page.listCur = page.list[0];
			});
        },
        onReady() {
            uni.hideLoading()
        },
        methods: {
			groupData() {
				let page = this;
				getApp().request({
					url: page.baseUrl() + '/group/groupData',
					data: {
						groupId: page.member.groupId,
						// queryDateStr: page.date,
					},
					successParse: function(data) {
						// console.info('groupData list')
						// console.info(data);
						// 计算团队业绩
						page.list = data;
						// return;	
						let groupDetail = [];
						for(let item of data[0].detail) {
							let obj = {
								count:0,
								date:item.date,
								id:item.id,
							}
							groupDetail.push(obj);
						}
						// let groupDetail = data[0].detail;
						
						for(let item of groupDetail) {
							// item.id;
							item.count = 0;
							for(let each of data) {
								for(let record of each.detail) {
									
									
										if(record.id === item.id) {
											item.count += record.count;
										}
									}
								}
						}
						let groupAccount = {
							salesmanId:'-1',
							salesmanName:'总业绩',
							detail:groupDetail,
						};
						let list =[groupAccount]
						list = list.concat(data);
						console.info('groupDetail')
						console.info(groupDetail)
						console.info(list)
						page.list = list;
						// for(let each of data) {
						// 	// let sum = 0;
						// 	for(let item of each.detail) {
						// 		item[groopDetail]
						// 		sum+=
						// 	}
						// }
						// page.swiperList = data.filter(item=>item.approveStatus === '审核拒绝')
						// page.list = data;
					}
				})
			},
            TabSelect(e) {
                this.tabCur = e.currentTarget.dataset.id;
                this.mainCur = e.currentTarget.dataset.id;
                this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
            },
            VerticalMain(e) {
                // #ifdef MP-ALIPAY
                return false //支付宝小程序暂时不支持双向联动 
                // #endif
                let that = this;
                let tabHeight = 0;
                if (this.load) {
                    for (let i = 0; i < this.list.length; i++) {
                        let view = uni.createSelectorQuery().select("#main-" + this.list[i].id);
                        view.fields({
                            size: true
                        }, data => {
                            this.list[i].top = tabHeight;
                            tabHeight = tabHeight + data.height;
                            this.list[i].bottom = tabHeight;
                        }).exec();
                    }
                    this.load = false
                }
                let scrollTop = e.detail.scrollTop + 10;
                for (let i = 0; i < this.list.length; i++) {
                    if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
                        this.verticalNavTop = (this.list[i].id - 1) * 50
                        this.tabCur = this.list[i].id
                        console.log(scrollTop)
                        return false
                    }
                }
            }
        },
    }
</script>

<style>
    .fixed {
        position: fixed;
        z-index: 99;
    }

    .VerticalNav.nav {
        width: 200upx;
        white-space: initial;
    }

    .VerticalNav.nav .cu-item {
        width: 100%;
        text-align: center;
        background-color: #fff;
        margin: 0;
        border: none;
        height: 50px;
        position: relative;
    }

    .VerticalNav.nav .cu-item.cur {
        background-color: #f1f1f1;
    }

    .VerticalNav.nav .cu-item.cur::after {
        content: "";
        width: 8upx;
        height: 30upx;
        border-radius: 10upx 0 0 10upx;
        position: absolute;
        background-color: currentColor;
        top: 0;
        right: 0upx;
        bottom: 0;
        margin: auto;
    }

    .VerticalBox {
        display: flex;
    }

    .VerticalMain {
        background-color: #f1f1f1;
        flex: 1;
    }
</style>
