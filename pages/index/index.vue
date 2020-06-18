<template>
    <view class="content2">

        <swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
            duration="500">
            <swiper-item v-for="(item,index) in swiperList" :key="index" @tap="clickSwiper(item.id)">
                <image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
                <video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover"
                    v-if="item.type=='video'"></video>
            </swiper-item>
        </swiper>



        <view class="cu-bar bg-white margin-top">
            <view class="action">
                <text class="cuIcon-title text-pink"></text> 倾力推荐
            </view>
        </view>

        <swiper class="card-swiper round-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
            duration="500" @change="cardSwiper" indicator-color="#8799a3" indicator-active-color="#0081ff">
            <swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''"
            @tap="previewImg(item.url)">
                <view class="swiper-item">
                    <image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
                    <video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover"
                        v-if="item.type=='video'"></video>
                </view>
            </swiper-item>
        </swiper>



        <view class="cu-card article no-card">
            <view class="cu-item shadow" v-for="i in 8" :key="i">
                <view class="title">
                    <view class="text-cut">标题标题标题标题标题标题标题标题标题标题</view>
                </view>
                <view class="content">
                    <image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" mode="aspectFill"></image>
                    
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
                 
                cardCur: 0,
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
                    id: 3,
                    type: 'image',
                    url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
                }, {
                    id: 4,
                    type: 'image',
                    url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
                }, {
                    id: 5,
                    type: 'image',
                    url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
                }, {
                    id: 6,
                    type: 'image',
                    url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
                }],
            }
        },
        onLoad() {
            // console.info(this.swiperList.map(item=>item.url))
            this.previewImgList = this.swiperList.map(item=>item.url)
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
            clickSwiper(id){
                uni.navigateTo({
                    url:'/pages/article/article?articleId='+id
                })
            }
        }
    }
</script>

<style>
</style>
