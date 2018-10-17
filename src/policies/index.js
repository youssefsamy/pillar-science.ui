import project from './project'

class Authorization {
  modules = {
    project
  }

  can (ability, models, module) {
    if (!this.modules[module]) {
      console.warn(`Policy module ${module} not found. Did you forget to register it?`)
      return false
    }

    if (typeof this.modules[module][ability] !== 'function') {
      console.warn(`Policy module ${module} does not have any ability named ${ability}`)
      return false
    }

    if (typeof this.modules[module].before === 'function') {
      const before = this.modules[module].before(models)
      if (typeof before !== 'undefined') {
        return before
      }
    }

    return this.modules[module][ability](models)
  }
}

export default new Authorization()
