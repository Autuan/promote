<script>
    export default {
        onLaunch: function() {
            console.log('App Launch')
        },
        onShow: function() {
            console.log('App Show')
        },
        onHide: function() {
            console.log('App Hide')
        },
        methods:{
            request(option){
                let opt = option || {};
                let currentPathArray = getCurrentPages();
                let currentPath = currentPathArray[currentPathArray.length -1].route;
                opt.url = option.url;
                if (opt.url == undefined || opt.url == '') {
                    console.error('request: [url]不能为空!');
                    return;
                }
                if (process.env.NODE_ENV === 'development') {
                    opt.url = 'http://127.0.0.1:80'+opt.url
                    }
                let contentTypeEncoded = 'application/x-www-form-urlencoded';
                opt.type = option.type || 'POST';
                opt.contentType = option.contentType || this.contentTypeJSON;
                opt.data = option.data || {};
                opt.success = option.success || function(respond) {};
                opt.fail = option.fail || function() {};
                opt.complete = option.complete || function() {};
                if(option.successParse != undefined) {
                    let successParseFunction = function(respond){
                        let res = respond.data;
                        if (res.code == '000000') {
                            option.successParse(res.data)
                        } else {
                            if(option.failParse != undefined) {
                                option.failParse(res)
                            } else {
                                getApp().tip(res.msg);
                                console.error( opt.url + ' error --->' + res.msg);
                            }
                        }
                    }
                    opt.success = successParseFunction;
                }
                uni.request({
                    url: opt.url,
                    data: opt.data,
                    method: opt.type,
                    fail: opt.fail,
                    success: opt.success,
                    complete: opt.complete,
                    dataType: 'json',
                });
            }
        }
    }
</script>

<style>
    @import "static/css/uni.css";
    @import "static/css/global.css";

    @import "colorui/main.css";
    @import "colorui/icon.css";
</style>
