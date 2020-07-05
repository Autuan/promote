<template>
    <view>
        <view class="cu-timeline">
            <view class="cu-item text-blue" v-for="(item,i) in list"  :key="i"
                :class="i < 3 ? 'cuIcon-upstagefill':''"   :style="caluRankingStyle(i)" >
                <view class="bg-white shadow-blur content" style="padding: 0upx;">
                    <view class="cu-list menu-avatar radius">
                        <view class="margin-left" style="font-size: 40upx;" :style="caluRankingStyle(i)"> No.{{i+1}}</view>
                        <view class="cu-item" style="padding: 0upx;">
                            <view class="cu-avatar round lg" :style="'background-image:url('+item.headImg+');'">
                            </view>
                            <view class="content" style="width: 20%;">
                                <view class="text-grey">
                                    <text>{{item.name}}</text>
                                </view>
                            </view>
                            <view class="action" style="width: 60%;">
                                <i-price style="width: 60%;" class=" text-right" countSize="14" symbolSize="14" :value="item.amount" />
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import iPrice from '@/components/i-price/i-price.vue';
    export default {
        components: {
            iPrice
        },
       
        data() {
            return {
                list:[],
            };
        },
        onLoad(){
            let page = this;
          // for(let i=0;i<10;i++) {
          //     page.list.push({
          //         image:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
          //         name:'张三' + i,
          //         money:10+i,
          //     })
          // }  
		  this.ranking();
        },
        methods:{
			ranking() {
				let page = this;
				getApp().request({
					url: page.baseUrl() + '/salesman/ranking',
					data: {
						// salesmanId: page.member.id,
						// queryDateStr: page.date,
					},
					successParse: function(data) {
						console.info('bank list')
						console.info(data);
						
						// page.swiperList = data.filter(item=>item.approveStatus === '审核拒绝')
						page.list = data;
					}
				})
			},
            caluRankingStyle(i){
                // return 'aa';
                switch(i) {
                    case 0 :  return 'font-size: 60upx;color: #ffd700;';
                    case 1 :  return 'font-size: 50upx;color: #c0c0c0;';
                    case 2 :  return 'font-size: 40upx;color: #8C7853;';
                    default: return 'font-size:40upx;';
                }
            }
        }
    }
</script>

<style>
    .cu-list.menu-avatar>.cu-item:after,
    .cu-list.menu>.cu-item:after {
        border-bottom: none;
    }
</style>
