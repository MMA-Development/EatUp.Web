import { setupAuthListeners } from '@features/auth/middleware/auth-middleware.ts'
import { addListener, createListenerMiddleware } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from './types'
import { setupMealsListener } from '@features/meals/listeners/meal-listener.ts'
import { setupProfileUpdateListener } from '@features/auth/middleware/profile-update.ts'

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
setupMealsListener()
setupProfileUpdateListener()
