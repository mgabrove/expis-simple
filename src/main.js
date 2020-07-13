import Vue from 'vue'
import App from './views/app/App.vue'
import store from './store'
import router from './router'

//import firebase from 'firebase'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.config.productionTip = false 

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
