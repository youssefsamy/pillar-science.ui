import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import http from '@/store/modules/http'
import project from '@/store/modules/project'
import projectWizard from '@/store/modules/projectWizard'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    http,
    user,
    project,
    projectWizard
  },
  strict: debug
})
