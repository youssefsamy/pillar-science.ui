import Vue from 'vue'
import App from './App'
import router from './router'
import HttpPlugin from './plugins/http'
import ApiPlugin from './plugins/api'
import MomentPlugin from './plugins/moment'
import store from '@/store'
import Buefy from 'buefy'
import Vuelidate from 'vuelidate'
import i18n from './i18n'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'
import FontAwesomePlugin from './plugins/fontawesome'

Vue.config.productionTip = false
Vue.use(HttpPlugin)
Vue.use(ApiPlugin)
Vue.use(MomentPlugin)
Vue.use(FontAwesomePlugin)
Vue.use(Buefy, {
  defaultToastDuration: 3000
})
Vue.use(Vuelidate)

if (process.env.NODE_ENV === 'production') {
  Raven.config('https://04e0584a0ee54a308820a9fe6a7e2a5c@sentry.io/1263866')
    .addPlugin(RavenVue, Vue)
    .install()
}

/* eslint-disable no-new */
new Vue({
  i18n,
  el: '#app',
  router,
  store,
  render: h => h(App)
})
