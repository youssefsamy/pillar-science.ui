export default class StepInterface {
  static collection (steps) {
    return steps.map(s => new this(s))
  }

  constructor ({name, title, icon, component, path, next = null, previous = null}) {
    this.name = name
    this.title = title
    this.icon = icon
    this.component = component
    this.path = path
    this.next = next
    this.previous = previous
  }
}
