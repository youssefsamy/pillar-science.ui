/**
 * Parses a Laravel api error response
 */

import store from '@/store'

export default class ErrorHelper {
  constructor (error) {
    this.error = error
  }

  has (field) {
    if (!this.isUnprocessable()) {
      return false
    }

    return (typeof this.error.response.data.error.errors[field] !== 'undefined')
  }

  /**
   * @param fields array
   */
  any (fields) {
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i]
      if (this.has(field)) {
        return this.get(field)[0]
      }
    }
  }

  get (field) {
    if (!this.has(field)) {
      return []
    }

    return this.error.response.data.error.errors[field]
  }

  first (field) {
    const errors = this.get(field)

    return errors[0] || null
  }

  status (status) {
    return this.getStatusCode() === status
  }

  getStatusCode () {
    return this.error.response.status || null
  }

  isUnauthorized () {
    return this.status(401)
  }

  isForbidden () {
    return this.status(403)
  }

  isNotFound () {
    return this.status(404)
  }

  isUnprocessable () {
    return this.status(422)
  }

  /**
   * @returns {boolean} true if status was updated, false if not
   */
  updatePageStatusCode () {
    const statusCode = this.getStatusCode()

    if (statusCode) {
      store.dispatch('http/setStatusCode', this.getStatusCode())

      return true
    }

    return false
  }
}
