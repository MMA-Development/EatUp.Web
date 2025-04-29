import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import daCommon from '@locales/da/da.common.json'
import enCommon from '@locales/en/en.common.json'
import daAuth from '@features/auth/locale/da.json'
import enAuth from '@features/auth/locale/en.json'

await i18next.use(initReactI18next).init({
  debug: true,
  fallbackLng: 'da',
  defaultNS: 'common',
  fallbackNS: 'fallback',
  resources: {
    en: {
      common: enCommon,
      auth: enAuth
    },
    da: {
      common: daCommon,
      auth: daAuth
    }
  }
})

export default i18next
