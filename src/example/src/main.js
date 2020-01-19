import Vue from 'vue'
import App from './App.vue'
import VueThreeSixty from 'vue-360-viewer'

Vue.config.productionTip = false
Vue.use(VueThreeSixty)

new Vue({
  render: h => h(App),
}).$mount('#app')
