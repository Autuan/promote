<template>
    <view class="content2">

        <swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
            duration="500">
            <swiper-item v-for="(item,index) in articles" :key="index" @tap="toArticleDetail(item.id)">
                <image :src="item.image" mode="aspectFill"></image>
                <!-- <video :src="item.image" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover"
                    v-if="item.type=='video'"></video> -->
            </swiper-item>
        </swiper>



        <view class="cu-bar bg-white margin-top">
            <view class="action">
                <text class="cuIcon-title text-pink"></text> 倾力推荐
            </view>
        </view>

        <swiper class="card-swiper round-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
            duration="500" @change="cardSwiper" indicator-color="#8799a3" indicator-active-color="#0081ff">
            <swiper-item v-for="(item,index) in images" :key="index" :class="cardCur==index?'cur':''"
            @tap="previewImg(item.image)">
                <view class="swiper-item">
                    <image :src="item.image" mode="aspectFit"></image>
                    <!-- <video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover"
                        v-if="item.type=='video'"></video> -->
                </view>
            </swiper-item>
        </swiper>



        <view class="cu-card article no-card">
            <view class="cu-item shadow" v-for="i in 8" :key="i">
                <view class="title">
                    <view class="text-cut">标题标题标题标题标题标题标题标题标题标题</view>
                </view>
                <view class="content">
                    <image src="http://localhost/profile/upload/2020/06/22/d05a37f530c8c34b9c06ac7bcd342894.jpg" mode="aspectFill"></image>
                    
                    <view class="desc">
                        <view>
                        	<view class="cu-tag bg-red light ">正义天使</view>
                        	<view class="cu-tag bg-green light ">史诗</view>
                        	<view class="cu-tag bg-green light ">史诗</view>
                        </view>
                        <view class="text-content"> 
                        <text>内容内容内容内容内容内容内容</text>
                            <button class="cu-btn line-orange">二维码</button>
                            <button class="cu-btn bg-gray margin-left" >推广赚80元</button>
                        </view>
                        <view>
                        	
                        </view>
                    </view>
                </view>
            </view>
            
            
        </view>

    <hx-preview-img :list.sync="previewImgList" :current.sync="currentImg" :start.sync="PINum"></hx-preview-img>
    </view>
</template>

<script>
      import hxPreviewImg from "@/components/hx-preview-img/hx-preview-img.vue";
    export default {
        components: {
            hxPreviewImg,
            // iPrice
        },
        data() {
            return {
               currentImg: '',
               previewImgList: [],
               PINum: 0,
                 articles:[],
                 images:[],
                cardCur: 0,
            }
        },
        onLoad() {
            // console.info(this.swiperList.map(item=>item.url))
			let page = this;
			// 请求数据
			getApp().request({
			    url: '/front/index/info',
			    successParse: function(data) {
			        console.info(data)
			        // uni.setStorageSync('member', data)
			// 文章轮播
			page.articles = data.articles;
			// 图片轮播
			page.images = data.images;
            page.previewImgList = page.images.map(item=>item.image);
			    }
			})
        },
        methods: {
            previewImg(imgSrc) {
                this.currentImg = imgSrc;
                // this.previewImgList = this.swiperList.map(item=>item.url);
                this.PINum++;
            },
            cardSwiper(e) {
                this.cardCur = e.detail.current
            },
            toArticleDetail(id){
                uni.navigateTo({
                    url:'/pages/article/article?articleId='+id
                })
            }
        }
    }
</script>

<style>
</style>
