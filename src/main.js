import Vue from 'vue'
import App from './App.vue'
import AppConfig from './config'
import AppHelper from './helper'
import replaceSpecial from './specialCharacters.js'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

global.axios = require('axios')

global.axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
}

global.axios.defaults.baseURL = (document.getElementById('asset-container')) ? document.getElementById('asset-container').getAttribute('data-url') : AppConfig.url;

Vue.config.productionTip = false

Vue.use(BootstrapVue)

Vue.prototype.$helper = AppHelper
Vue.prototype.$replaceSpecial = replaceSpecial

Vue.filter('highlight', function(words, query, optional = ""){
  if(optional){
    return optional.replace(query, '<span class=\'highlight\'>' + query + '</span>')
  }

  return words.replace(query, '<span class=\'highlight\'>' + query + '</span>')
});

new Vue({
  render: h => h(App),
}).$mount('#app')
