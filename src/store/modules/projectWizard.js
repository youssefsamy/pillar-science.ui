// import ProjectEntity from '@/entities/project'
import { getField, updateField } from 'vuex-map-fields'

const state = {
  name: null,
  team: null
}

const getters = {
  getField
}

const actions = {}

const mutations = {
  updateField
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
