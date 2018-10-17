import moment from 'moment'

export const filters = {
  humanReadable (datestring) {
    const m = moment(datestring)
    return m.format('LL') + ' ' + m.format('LT')
  },
  moment_ll (datestring) {
    if (!datestring) return 'Invalid date'

    const m = moment(datestring)

    return (m.isValid()) ? m.format('LL') : 'Invalid date'
  },
  moment_llll (datestring) {
    if (!datestring) return 'Invalid date'

    const m = moment(datestring)

    return (m.isValid()) ? m.format('LLLL') : 'Invalid date'
  },
  moment_ll_short (datestring) {
    if (!datestring) return 'Invalid date'

    const m = moment(datestring)

    return (m.isValid()) ? m.format('ll') : 'Invalid date'
  },
  moment_my (datestring) {
    if (!datestring) return 'Invalid date'

    const m = moment(datestring)

    return (m.isValid()) ? moment.months(m.month()) + ' ' + m.year() : 'Invalid date'
  },
  date_part (datestring) {
    if (!datestring) return null

    const m = moment(datestring)

    return (m.isValid()) ? m.format('YYYY-MM-DD') : null
  },
  time_part (datestring) {
    if (!datestring) return null

    const m = moment(datestring)

    return (m.isValid()) ? m.format('HH:mm') : null
  },
  moment_from (datestring) {
    if (!datestring) return null

    const m = moment(datestring)

    return (m.isValid()) ? m.fromNow() : null
  }
}

export default {
  install (Vue, options) {
    Vue.mixin({
      filters: filters
    })
  }
}
