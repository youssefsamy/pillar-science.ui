export default class Dict {
  data

  constructor (data) {
    this.data = data
  }

  all () {
    return Object.values(this.data)
  }

  get (key, defaultValue = null) {
    return this.data[key] || defaultValue
  }

  getKeys () {
    return Object.keys(this.data)
  }

  getAsEnum () {
    const e = {}

    Object.keys(this.data).forEach(key => {
      e[key] = key
    })

    return e
  }
}
