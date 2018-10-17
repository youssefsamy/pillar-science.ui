import * as types from '../mutation-types'
import Authorization from '@/policies'

const state = {
  project: null
}

const getters = {
  project: state => state.project,
  canViewSharing: state => state.project && Authorization.can('viewSharing', {project: state.project}, 'project'),
  canEditSharing: state => state.project && Authorization.can('editSharing', {project: state.project}, 'project'),
  canViewSettings: state => state.project && Authorization.can('viewSettings', {project: state.project}, 'project'),
  canEditOverview: state => state.project && Authorization.can('editOverview', {project: state.project}, 'project'),
  canEditData: state => state.project && Authorization.can('editData', {project: state.project}, 'project')
}

const actions = {
  async setProject ({commit, state}, project) {
    commit(types.SET_PROJECT, project)
  }
}

const mutations = {
  [types.SET_PROJECT] (state, project) {
    state.project = project
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
