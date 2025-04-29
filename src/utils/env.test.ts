import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import { isProduction } from './env'

describe('isProduction', () => {
  const ENV_PROD_KEY = 'PROD'
  let originalProdValue: boolean

  beforeEach(() => {
    originalProdValue = import.meta.env[ENV_PROD_KEY]
  })

  afterEach(() => {
    import.meta.env[ENV_PROD_KEY] = originalProdValue
    vi.restoreAllMocks()
  })

  const setProductionEnvironment = (isProd: boolean): void => {
    import.meta.env[ENV_PROD_KEY] = isProd
  }

  test('returns true in production environment', () => {
    setProductionEnvironment(true)
    expect(isProduction()).toBe(true)
  })

  test('returns false in non-production environment', () => {
    setProductionEnvironment(false)
    expect(isProduction()).toBe(false)
  })
})
