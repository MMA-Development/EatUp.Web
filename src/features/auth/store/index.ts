import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@store/types.ts'

export interface Auth {
  isAuthenticated: boolean
  user: string | null
  token: string | null
}

export const initialAuthState: Auth = {
  isAuthenticated: false,
  user: null,
  token: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload
      state.isAuthenticated = action.payload !== null
    },
    setUser(state, action: PayloadAction<string | null>) {
      state.user = action.payload
    }
  }
})

export const { setToken, setUser } = authSlice.actions

export const selectToken = (state: RootState) => state.auth.token
export const selectUser = (state: RootState) => state.auth.user
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated

export default authSlice.reducer
