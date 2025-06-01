import { setupOnProfileUpdated } from '@features/auth/listeners/on-profile-update.ts'
import { setupOnSignin } from '@features/auth/listeners/on-signin.ts'
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
setupOnSignin()
setupOnProfileUpdated()
