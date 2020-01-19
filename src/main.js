import Vue from 'vue'
import App from './App.vue'

import {store} from './store.js'
import VModal from 'vue-js-modal'

Vue.use(VModal, { dialog: true })

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  VModal
}).$mount('#app')
