<template>
    <view class="content2">

        <swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
            duration="500">
            <swiper-item v-for="(item,index) in articles" :key="index" @tap="toArticleDetail(item.id)">
                <image :src="item.image" mode="aspectFill"></image>
            </swiper-item>
        </swiper>



        <view class="cu-bar bg-white margin-top">
            <view class="action">
                <text class="cuIcon-title text-pink"></text> 倾力推荐
            </view>
        </view>

        <swiper class="card-swiper round-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
            duration="500" @change="cardSwiper" indicator-color="#8799a3" indicator-active-color="#0081ff">
            <swiper-item v-for="(item,index) in images" :key="index" :class="cardCur==index?'cur':''" @tap="previewImg(item.image)">
                <view class="swiper-item">
                    <image :src="item.image" mode="aspectFit"></image>
                </view>
            </swiper-item>
        </swiper>


		<view class="cu-bar bg-white margin-top">
            <view class="action">
                <text class="cuIcon-title text-blue"></text> 业务专区
            </view>
        </view>
        <view class="cu-card article no-card">
            <view class="cu-item shadow" v-for="task in tasks" :key="task.id">
                <view class="title"  @tap="toArticleDetail(task.articleId)">
                    <view class="text-cut">{{task.name}}</view>
                </view>
                <view class="content">
                    <image :src="task.image" mode="aspectFill"  @tap="toArticleDetail(task.articleId)"></image>
                    <view class="desc">
                        <view  @tap="toArticleDetail(task.articleId)">
                            <view class="cu-tag bg-red light " :key="i" v-for="(tag,i) in getTagList(task.tags)">{{tag}}</view>
                        </view>
                            <view class="response" @tap="toArticleDetail(task.articleId)"><text class="text-gray">{{task.summary}}</text></view>
                        <view class="text-content ">
                            <!-- <text>&nbsp;</text> -->
                            <button class="cu-btn line-orange" @tap="qrCodeBtn(task.id)">{{calcuStatus(task.id)}}</button>
                            <button class="cu-btn bg-gray margin-left"  @tap="toArticleDetail(task.articleId)">
							{{null != task.reward ? '推广赚'+task.reward+'元':'推广赚收益'}}
							</button>
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
        },
        data() {
            return {
                currentImg: '',
                previewImgList: [],
                PINum: 0,
                articles: [],
                images: [],
                tasks: [],
                receivedList: [],
                cardCur: 0,
				member:{},
            }
        },
        onLoad() {
            let page = this;
			 getApp().afterLogin(getCurrentPages(), function() {
				 let member = uni.getStorageSync('member')
				 page.member = member;
				 getApp().request({
				     url: page.baseUrl() + '/index/info',
                     data:{
                         salesmanId:member.id,
                     },
				     successParse: function(data) {
				         // 文章轮播
				         page.articles = data.articles;
				         // 图片轮播
				         page.images = data.images;
				         page.previewImgList = page.images.map(item => item.image);
				         // 任务
				         page.tasks = data.tasks;
				         page.receivedList = data.receivedList;
				     }
				 })
			 });
        },
        methods: {
            calcuStatus(taskId){
                let page = this;
                let task = page.receivedList
                    .filter(item=>item.taskId===taskId)[0];
                if(task) {
                    switch(task.status) {
                        case 0:return '申请';
                        case 1:return '审核中';
                        case 2:return '二维码';
                        case 3:return '拒绝';
						default:return '申请';
                    }
                } else{
                    return '申请'
                }
            },
            getTagList(tags){
              return tags.split(',');
            },
            previewImg(imgSrc) {
                this.currentImg = imgSrc;
                this.PINum++;
            },
            cardSwiper(e) {
                this.cardCur = e.detail.current
            },
            toArticleDetail(id) {
                if(id) {
					uni.navigateTo({
						url: '/pages/article/article?articleId=' + id
					})
                }
            },
            applyTask(taskId,task){
                let page =this;
                // return;
                getApp().request({
                    url: page.baseUrl() +'/task/receive',
                	data:{
                		taskId:taskId,
                		// taskId:task.id,
                		salesmanId:page.member.id,
                	},
                    successParse: function(data) {
                        if(task) {
                            task.status = 1;
                        }else {
                            page.receivedList.push({
                                taskId:taskId,
                                // taskId:task.id,
                                status:1,
                            })
                        }
                    }
                })
            },
			qrCodeBtn(taskId){
                let page = this;
                let task = page.receivedList
                    .filter(item=>item.taskId===taskId)[0];
                let status = 0 ;
                if(task) {
                    status = task.status || 0;
                }
                switch(status) {
                    // 申请
                    case 0: {
                        page.applyTask(taskId,task);
                        // if(task) {
                        //     task.status = 1;
                        // }else {
                        //     page.receivedList.push({
                        //         taskId:taskId,
                        //         status:1,
                        //     })
                        // }
                        break;
                    }
                    // 已申请
                   case 1:{
                       getApp().tip('正在审核中')
                       break;
                   } 
                    // 通过,展示二维码
                    case 2:{
                      uni.navigateTo({
                          url: '/pages/qrcode/code?taskId=' + taskId
                      })
                        break;
                    } 
                    // 拒绝
                    case 3:{
                        getApp().tip('您的申请被拒绝')
                        break;
                    } 
                    
                }
                return;
				
				        
				
			}
        }
    }
</script>

<style>
</style>
