<template>
    <view>

        <!-- 发卡订单 -->
        <uni-card title="发卡订单" @tap="bankCardDetail">
            <view style="width: 100%; ">
                <view class="fL text-xl" style="width: 50%;">本月 5 已通过</view>
                <view class="fL text-xl" style="width: 50%;">本月 5 已拒绝</view>
            </view>
        </uni-card>

        <!-- 联合拉新 -->
        <uni-card title="联合拉新" @tap="promoteUserDetail">
            内容主体，可自定义内容及样式
           <view class="cu-list grid no-border col-4" style="width: 100%; " v-if="showB">
               <view class="cu-item" >
                   <text>产品名称</text>
               </view>
               <view class="cu-item" >
                   <text>状态</text>
               </view>
               <view class="cu-item" >
                   <text>申请时间</text>
               </view>
               <view class="cu-item" >
                   <text>审核时间</text>
               </view>
           </view>
           <view class="cu-list grid no-border col-4" style="width: 100%; " v-if="showB" v-for="i in 4" :kye="i">
               <view class="cu-item" >
                   <text>产品{{i}}</text>
               </view>
               <view class="cu-item" >
                   <text>{{i/2==0?'通过':'拒绝'}}</text>
               </view>
               <view class="cu-item" >
                   <text>2020-06-08</text>
               </view>
               <view class="cu-item" >
                   <text>2020-06-08</text>
               </view>
           </view>
        </uni-card>

        <!-- 团队业绩 -->
        <uni-card title="团队业绩" @tap="groupDataDetail">
            内容主体，可自定义内容及样式
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
            return {
                showA:true,
                showB:false,
                gridCol: 3,
            }
        },
        methods:{
            bankCardDetail(){
              uni.navigateTo({
                  url:'/pages/member/data/bank-card'
              })  
            },
            promoteUserDetail(){
              uni.navigateTo({
                  url:'/pages/member/data/promote-user'
              })  
            },
            groupDataDetail(){
              uni.navigateTo({
                  url:'/pages/member/data/group-data'
              })  
            },
           
        }
    }
</script>

<style>
</style>
