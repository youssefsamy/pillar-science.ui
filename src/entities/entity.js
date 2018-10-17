import moment from 'moment'

export default class {
  constructor (data = {}) {
    this.fillable.forEach(f => {
      if (typeof this.defaults[f] === 'undefined') {
        this[f] = null
        return
      }

      if (typeof this.defaults[f] === 'function') {
        this[f] = this.defaults[f]()
        return
      }

      this[f] = this.defaults[f]
    })

    this.staticCollections.forEach(structure => {
      Object.defineProperty(this, structure.name, {
        enumerable: false,
        get: function () {
          return (structure.Type).get(this[structure.field])
        }
      })
    })

    this.update(data)
  }

  /**
   * @this entity The other entity (context is changed)
   * @param entity
   */
  static findIndex (entity) {
    return this.id === entity.id
  }

  static collection (collection, constructor = this) {
    return collection.map(item => new constructor(item))
  }

  static single (item) {
    return new this(item)
  }

  get normalized () {
    let normalized = {}

    this.fillable.forEach(f => {
      if (this[f] === null) return

      if (this.dates.includes(f)) {
        normalized[f] = moment(this[f]).toISOString()
        return
      }

      normalized[f] = this[f]
    })

    this.normalize(normalized)

    return normalized
  }

  get dates () {
    return []
  }

  get defaults () {
    return []
  }

  get fillable () {
    return []
  }

  get relations () {
    return []
  }

  get staticCollections () {
    return []
  }

  // mutating properties that are objects will modify state of original object
  normalize (model) {
    return model
  }

  /**
   * Check if field exists and if it's an array that it is not empty
   * @param field
   */
  has (field) {
    if (typeof this[field] !== 'undefined') {
      if (Array.isArray(this[field])) {
        return this[field].length > 0
      }

      return true
    }

    return false
  }

  add (field, data) {
    if (typeof this[field] === 'undefined') {
      this[field] = []
    }

    this[field].push(data)
  }

  update (data) {
    for (const p in data) {
      if (this.fillable.indexOf(p) !== -1) {
        this[p] = data[p]
      }
    }

    this.relations.forEach(relation => {
      if (data[relation.name]) {
        if (relation.serialized) {
          data[relation.name] = JSON.parse(data[relation.name])
        }

        if (relation.is_collection) {
          this[relation.name] = data[relation.name].map(element => new relation.Type(element))
        } else {
          this[relation.name] = new relation.Type(data[relation.name])
        }
      }
    })

    return this
  }
}
