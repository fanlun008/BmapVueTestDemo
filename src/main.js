import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Element from 'element-ui'
import VueBMap from 'vue-bmap-gl'
import VueMapvgl from 'vue-mapvgl'
import 'vue-bmap-gl/dist/style.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

VueBMap.initBMapApiLoader({
  ak: '',
  v: '1.0'
})

Vue.use(Element)
Vue.use(VueBMap)
Vue.use(VueMapvgl)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
