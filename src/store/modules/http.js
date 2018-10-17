import * as types from '../mutation-types'

const state = {
  statusCode: 200
}

const getters = {
  isOk: state => state.statusCode >= 200 && state.statusCode <= 299,
  isClientError: state => state.statusCode >= 400 && state.statusCode <= 499,
  isServerError: state => state.statusCode >= 500 && state.statusCode <= 599,
  isNotFound: state => state.statusCode === 404,
  isForbidden: state => state.statusCode === 403
}

const actions = {
  setStatusCode ({commit, state}, statusCode) {
    commit(types.SET_STATUS_CODE, statusCode)
  },
  setStatusNotFound ({commit, state}) {
    commit(types.SET_STATUS_CODE, 404)
  },
  setStatusOk ({commit, state}) {
    commit(types.SET_STATUS_CODE, 200)
  }
}

const mutations = {
  [types.SET_STATUS_CODE] (state, statusCode) {
    state.statusCode = statusCode
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
