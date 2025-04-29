import { rootReducer } from '@store/root-reducer.ts'
import { store } from '@store/index.ts'

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
