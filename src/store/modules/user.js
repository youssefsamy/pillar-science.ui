import * as types from '../mutation-types'
import User, {PERMISSION_USER_TEAM_MANAGEMENT, PERMISSION_DESKTOP_CLIENT_MANAGEMENT} from '@/entities/user'

const state = {
  user: null
}

const getters = {
  isAuthenticated: state => state.user && state.user.id !== null,
  hasAdminDashboardAccess: state => {
    if (!state.user || !state.user.permissions) {
      return false
    }

    return state.user.permissions.includes(PERMISSION_USER_TEAM_MANAGEMENT) || state.user.permissions.includes(PERMISSION_DESKTOP_CLIENT_MANAGEMENT)
  },
  hasDesktopClientManagementPermission: state => state.user && state.user.permissions.includes(PERMISSION_DESKTOP_CLIENT_MANAGEMENT),
  hasUserTeamManagementPermission: state => state.user && state.user.permissions.includes(PERMISSION_USER_TEAM_MANAGEMENT),
  user: state => state.user
}

const actions = {
  setUser ({commit, state}, user) {
    commit(types.SET_USER, user)
  },
  clear ({commit, state}) {
    commit(types.CLEAR_USER)
  }
}

const mutations = {
  [types.SET_USER] (state, user) {
    state.user = User.single(user)
  },
  [types.CLEAR_USER] (state) {
    state.user = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
