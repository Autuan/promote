<!-- 文章详情页 -->
<template>
    <view>
        <view class="mui-bar mui-bar-nav"></view>
        <view class="mui-bar mui-content">
            <view v-html="content"></view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                title: '',
                content: '',
            }
        },
        methods: {

        },
        onLoad(option) {
            let page = this;
               page.content = 'aricle' + option.articleId;
        }
    }
</script>

<style>
    /* @import "../../common/css/proxy/recharge.css"; */
    /* @import "../../common/css/proxy/style.css"; */

    .top_n {
        z-index: 99999;
    }
</style>
