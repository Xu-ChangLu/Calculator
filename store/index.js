import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		num:0,
	},
    mutations: {
		datastoragekey:(state,num)=>{
			state.num+=num
		}
	},
    actions: {}
})
export default store