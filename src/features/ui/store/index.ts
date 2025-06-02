// features/ui/uiSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UIState {
  sidebarCollapsed: boolean
}

const initialState: UIState = {
  sidebarCollapsed: false
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSidebarCollapsed(state, action: PayloadAction<boolean>) {
      state.sidebarCollapsed = action.payload
    }
  },
  selectors: {
    selectSidebarCollapsed: (state) => state.sidebarCollapsed
  }
})

export const { selectSidebarCollapsed } = uiSlice.selectors
export const { setSidebarCollapsed } = uiSlice.actions
export default uiSlice.reducer
