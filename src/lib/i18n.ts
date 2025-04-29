import daAuth from '@features/auth/locale/da.json'
import enAuth from '@features/auth/locale/en.json'
import daCommon from '@locales/da/da.common.json'
import daZod from '@locales/da/da.zod.json'
import enCommon from '@locales/en/en.common.json'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { z } from 'zod'
import { makeZodI18nMap } from 'zod-i18n-map'
import enZod from 'zod-i18n-map/locales/en/zod.json'

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
        auth: enAuth,
        zod: enZod
      },
      da: {
        common: daCommon,
        auth: daAuth,
        zod: daZod
      }
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  })

z.setErrorMap(
  makeZodI18nMap({
    ns: ['zod', 'auth'] // look first in zod, then in auth
  })
)
export default i18next
