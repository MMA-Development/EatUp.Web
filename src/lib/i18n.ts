import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import daCommon from '@locales/da/da.common.json'
import enCommon from '@locales/en/en.common.json'
import daAuth from '@features/auth/locale/da.json'
import enAuth from '@features/auth/locale/en.json'
import LanguageDetector from 'i18next-browser-languagedetector'
import { z } from 'zod'
import { i18nErrorMap } from '@lib/zod-error-map.ts'

await i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
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
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  })

z.setErrorMap(i18nErrorMap)

export default i18next
