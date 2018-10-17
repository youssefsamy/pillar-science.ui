import api from '@/api'
import store from '@/store'
import router from '@/router'
import moment from 'moment'
import User from '@/entities/user'

export default class Auth {
  static async login ({email, password}) {
    try {
      const response = await api.login({email, password})

      window.localStorage.setItem('token', response.data.token)

      const expiresAt = moment().add(response.data.expires_in, 'seconds')
      window.localStorage.setItem('expires_at', expiresAt.toISOString())

      this.refreshUser()

      return true
    } catch (error) {
      return false
    }
  }

  static async register (form) {
    try {
      const response = await api.register(form)

      window.localStorage.setItem('token', response.data.token)
      const expiresAt = moment().add(response.data.expires_in, 'seconds')
      window.localStorage.setItem('expires_at', expiresAt.toISOString())

      this.refreshUser()

      return true
    } catch (error) {
      return false
    }
  }

  static async forgotPassword (form) {
    try {
      const response = await api.forgotPassword(form)

      if (response.data.status === 'ok') {
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }

  static async resetPassword (form) {
    try {
      const response = await api.resetPassword(form)

      if (response.data.status === 'ok') {
        window.localStorage.setItem('token', response.data.token)
        const expiresAt = moment().add(response.data.expires_in, 'seconds')
        window.localStorage.setItem('expires_at', expiresAt.toISOString())

        this.refreshUser()

        return true
      }
      return false
    } catch (error) {
      return false
    }
  }

  static async logout () {
    await api.logout()

    window.localStorage.removeItem('token')
    window.localStorage.removeItem('expires_at')

    this.refreshUser()

    router.push({name: 'login'})

    return true
  }

  static isAuthenticated () {
    return typeof window.localStorage.token !== 'undefined'
  }

  static async refreshToken () {
    if (!this.isAboutToExpire() || this.isSessionExpired()) {
      return false
    }

    const response = await api.authRefresh()

    window.localStorage.setItem('token', response.data.token)

    const expiresAt = moment().add(response.data.expires_in, 'seconds')
    window.localStorage.setItem('expires_at', expiresAt.toISOString())

    this.refreshUser()

    return true
  }

  static async refreshUser () {
    if (!this.getToken()) {
      store.dispatch('user/clear')
      return
    }

    if (!store.getters['user/isAuthenticated']) {
      const user = await this.getUser()

      store.dispatch('user/setUser', user)
    }
  }

  static async getUser () {
    if (!this.isAuthenticated()) {
      return null
    }

    const {data} = await api.me()

    return User.single(data)
  }

  static getToken () {
    const expiresAt = moment(window.localStorage.getItem('expires_at'))

    if (moment().isAfter(expiresAt)) {
      return null
    }

    return window.localStorage.getItem('token')
  }

  static expiresIn () {
    return moment().diff(moment(window.localStorage.getItem('expires_at')), 'seconds')
  }

  static isSessionExpired () {
    const expiresAt = window.localStorage.getItem('expires_at')

    if (!expiresAt) {
      return true
    }

    return moment().isAfter(moment(expiresAt))
  }

  static isAboutToExpire () {
    const expiresAt = window.localStorage.getItem('expires_at')

    if (!expiresAt) {
      return false
    }

    return moment().isAfter(moment(expiresAt).subtract(process.env.REFRESH_THRESHOLD, 'seconds'))
  }
}
