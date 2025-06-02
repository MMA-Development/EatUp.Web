import { combineReducers } from '@reduxjs/toolkit'
import { eatupApi } from '@lib/api-slice.ts'
import auth from '@features/auth/store/index.ts'
import ui from '@features/ui/store/index.ts'

export const rootReducer = combineReducers({
  auth: auth,
  ui: ui,
  [eatupApi.reducerPath]: eatupApi.reducer
})
