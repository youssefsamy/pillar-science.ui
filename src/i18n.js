import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Locales from '@/services/locales'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: Locales.resolveToAvailableLocale(navigator.language) || 'en',
  fallbackLocale: 'en',
  messages: Locales.get()
})

export default i18n
