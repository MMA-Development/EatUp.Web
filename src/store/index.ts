import { eatupApi } from '@lib/api-slice.ts'
import { configureStore } from '@reduxjs/toolkit'
import { listenerMiddleware } from '@store/listenerMiddleware.ts'
import { rootReducer } from '@store/root-reducer.ts'
import { persistReducer, persistStore } from 'redux-persist'
import { encryptTransform } from 'redux-persist-transform-encrypt'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  transforms: [
    encryptTransform({
      secretKey: import.meta.env.VITE_ENCRYPT_KEY,
      onError: function (error) {
        console.error('Encryption error:', error)
      }
    })
  ]
}

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
      .concat(eatupApi.middleware)
      .concat(listenerMiddleware.middleware)
})

export const persistor = persistStore(store)
