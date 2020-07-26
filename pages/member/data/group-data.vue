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
        <view style="width: 100%;float:right; ">
        	<view class="fL text-center " style="width: 40%;">
        		<picker mode="date" :value="dateStart" :start="startDate" :end="endDate" @change="bindDateChangeStart" fields="month">
        			<view class="text-xl">
        				<text>{{dateStart}}</text>
        				<text class="margin-left cuIcon-unfold" />
        			</view>
        		</picker>
        	</view>
            <view class="fL text-xl text-center" style="width: 20%;"> 至</view>
            <view class="fL text-center" style="width: 40%;">
            	<picker mode="date" :value="dateEnd" :start="startDate" :end="endDate" @change="bindDateChangeEnd" fields="month">
            		<view class="text-xl">
            			<text>{{dateEnd}}</text>
            			<text class="margin-left cuIcon-unfold" />
            		</view>
            	</picker>
            </view>
        </view>
        
        <view class="VerticalBox fL response">
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
            const currentDate = this.getDate({
            	format: true
            })
            return {
                list: [],
                dateStart: currentDate,
                dateEnd: currentDate,
                date: currentDate,
                tabCur: 0,
                mainCur: 0,
                verticalNavTop: 0,
                load: true
            };
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
            bindDateChangeStart: function(e) {
            	this.dateStart = e.target.value;
            	this.groupData();
            },
            bindDateChangeEnd: function(e) {
            	this.dateEnd = e.target.value;
            	this.groupData();
            },
			groupData() {
                uni.showLoading({
                    title: '加载中...',
                    mask: true
                });
				let page = this;
                console.info(page.dateEnd)
                if(page.dateStart > page.dateEnd) {
                    getApp().tip('开始时间不能晚于结束时间')
                    return;
                }
				getApp().request({
					url: page.baseUrl() + '/group/groupData',
					data: {
						groupId: page.member.groupId,
						querySalesmanId: page.member.id,
						dateStart: page.dateStart,
						dateEnd: page.dateEnd,
                        
					},
					successParse: function(data) {
						// 计算团队业绩
						page.list = data;
						let groupDetail = [];
						for(let item of data[0].detail) {
							let obj = {
								count:0,
								date:item.date,
								id:item.id,
							}
							groupDetail.push(obj);
						}
						
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
                        uni.hideLoading();
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
