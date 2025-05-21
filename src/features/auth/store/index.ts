import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@store/types.ts'
import { Vendor } from '@features/auth/types'

interface Token {
  accessToken: string
  refreshToken: string
}

export interface Auth {
  isAuthenticated: boolean
  user: string | null
  vendor: Vendor | null
  token: Token | null
}

export const initialAuthState: Auth = {
  isAuthenticated: false,
  user: null,
  vendor: null,
  token: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setToken(state, action: PayloadAction<Token | null>) {
      state.token = action.payload
      state.isAuthenticated = action.payload !== null
    },
    setUser(state, action: PayloadAction<string | null>) {
      state.user = action.payload
    },
    setVendor(state, action: PayloadAction<Vendor | null>) {
      state.vendor = action.payload
    },
    logout(state) {
      state.token = null
      state.user = null
      state.vendor = null
      state.isAuthenticated = false
    }
  },
  selectors: {
    selectToken: (state) => state.token,
    selectUser: (state) => state.user,
    selectVendor: (state) => state.vendor,
    selectIsAuthenticated: (state) => state.isAuthenticated
  }
})

export const { setToken, setUser, logout, setVendor } = authSlice.actions
export const { selectToken, selectUser, selectVendor, selectIsAuthenticated } = authSlice.selectors

export default authSlice.reducer
