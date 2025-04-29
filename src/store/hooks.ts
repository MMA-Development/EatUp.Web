import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux'
import { AppDispatch, AppStore, RootState } from '@store/types.ts'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppStore = useStore.withTypes<AppStore>()
