import Vue from 'vue'
import App from './App'
import store from './store'
Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'
import uView from "uview-ui";
Vue.use(uView);
const app = new Vue({
    ...App,
	store,
})
app.$mount()


