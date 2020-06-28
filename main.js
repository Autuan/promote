import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.reg = {
    idCard:/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/,
    phone:/^([1][3,4,5,6,7,8,9])\d{9}$/,
    email:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
};
Vue.prototype.regType = [
    'idCard','phone','email'
]
Vue.prototype.baseUrl = function() {
    if (process.env.NODE_ENV === 'development') {
        return 'http://127.0.0.1:80/front';
    } else {
        return '/admin/front';
    }
};

const app = new Vue({
    ...App
})
app.$mount()
