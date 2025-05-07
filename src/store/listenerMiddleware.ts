import { setupAuthListeners } from '@features/auth/middleware/auth-middleware.ts'
import { setupMealsListeners } from '@features/auth/middleware/test.ts'
import { addListener, createListenerMiddleware } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from './types'

declare type ExtraArgument = object

export const listenerMiddleware = createListenerMiddleware()

export const startAppListening = listenerMiddleware.startListening.withTypes<
  RootState,
  AppDispatch,
  ExtraArgument
>()

export const addAppListener = addListener.withTypes<RootState, AppDispatch>()

// setup middlewares
setupAuthListeners()
setupMealsListeners()
