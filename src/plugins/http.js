import Http from '../services/http'

export default {
  install (Vue, options) {
    Vue.prototype.$http = Http
  }
}
