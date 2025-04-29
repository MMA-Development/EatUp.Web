import { ZodErrorMap, ZodIssueCode } from 'zod'
import i18n from '@lib/i18n'

export const i18nErrorMap: ZodErrorMap = (issue, ctx) => {

  switch (issue.code) {
    case ZodIssueCode.too_small:
      if (issue.type === 'string') {
        return {
          message: i18n.t('validation.rules.atLeastChars', {
            attribute: i18n.t(String(issue.path), { ns: 'auth' }),
            min: issue.minimum
          })
        }
      }
      break
    case ZodIssueCode.too_big:
      if (issue.type === 'string') {
        return {
          message: i18n.t('validation.rules.atMostChars', {
            attribute: issue.path,
            max: issue.maximum
          })
        }
      }
      break
    case ZodIssueCode.invalid_type:
      return {
        message: i18n.t('validation.rules.required', {
          attribute: issue.path
        })
      }
  }

  return { message: ctx.defaultError }
}
