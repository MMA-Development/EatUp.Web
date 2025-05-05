import { store as reduxStore } from '@store/index.ts'
import { beforeEach, describe, expect, it } from 'vitest'
import authReducer, {
  initialAuthState,
  selectIsAuthenticated,
  selectToken,
  selectUser,
  setToken,
  setUser
} from './index.ts'
import { LoginResponse } from '@features/auth/types'

describe('auth reducer', () => {
  let store: typeof reduxStore

  beforeEach<typeof reduxStore>(() => {
    store = reduxStore
  })

  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toStrictEqual(initialAuthState)
  })

  it('should handle setToken', () => {
    const token = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken'
    } satisfies LoginResponse

    store.dispatch(setToken(token))

    const state = store.getState()
    expect(selectToken(state)).toBe(token)
    expect(selectIsAuthenticated(state)).toBe(true)
  })

  it('should handle setToken(null)', () => {
    store.dispatch(setToken(null))

    const state = store.getState()
    expect(selectToken(state)).toBe(null)
    expect(selectIsAuthenticated(state)).toBe(false)
  })

  it('should handle setUser', () => {
    store.dispatch(setUser('test-user'))

    const state = store.getState()
    expect(selectUser(state)).toBe('test-user')
  })
})
