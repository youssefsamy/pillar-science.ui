import Locales from '@/services/locales'
import i18n from '@/i18n'

export default {
  methods: {
    /**
     * Helper method to output buefy
     * @param hasError
     */
    bType (hasError) {
      return (hasError) ? 'is-danger' : ''
    },

    bMessage (fieldValidation, params) {
      const vuelidateMessages = Locales.get('vuelidate', false)[i18n.locale]
      for (const validation in fieldValidation.$params) {
        if (!fieldValidation[validation] && fieldValidation.$error) {
          return this.bReplace(vuelidateMessages[validation] || 'Undefined message', params)
        }
      }
    },

    bReplace (subject, params) {
      if (!subject) {
        return
      }

      for (const token in params) {
        subject = subject.replace(`{${token}}`, params[token])
      }

      return subject
    }
  }
}
