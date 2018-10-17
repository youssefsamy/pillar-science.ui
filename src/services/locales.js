import dotize from 'dotize'
import _ from 'lodash'
import * as locales from '@/locales'

export default class Locales {
  /**
   * @param module Module supports dot notation
   * @param prefix Boolean when true will add prefix
   */
  static get (module = null, prefix = true) {
    const keys = {}

    for (const locale in locales) {
      keys[locale] = locales[locale]

      if (module !== null) {
        if (!_.has(locales[locale], module)) {
          console.warn(`Locale ${locale} does not contain the path ${module}`)
        }

        keys[locale] = _.get(keys[locale], module, {})
      }

      keys[locale] = dotize.convert(keys[locale], (prefix) ? module : null)
    }

    return keys
  }

  static availableLocales () {
    return Object.keys(locales)
  }

  static hasLocale (locale) {
    return this.resolveToAvailableLocale(locale) !== null
  }

  static resolveToAvailableLocale (locale) {
    const available = this.availableLocales()

    if (available.includes(locale)) {
      return locale
    }

    const generic = /([a-z]{2})-[A-Z]{2}/.exec(locale)

    if (generic && available.includes(generic[1])) {
      return generic[1]
    }

    return null
  }
}
