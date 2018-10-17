import moment from 'moment'

export default {
  get: (target, name) => {
    if (typeof name === 'symbol') {
      return target[name]
    }

    if (name in target) {
      return target[name]
    }

    const matches = /(.*)_((lts)|(lt)|(l{1,4}))/.exec(name)

    if (matches && matches[1] in target) {
      const [, match, format] = matches

      return moment(target[match]).format(format)
    }

    return target[name]
  }
}
